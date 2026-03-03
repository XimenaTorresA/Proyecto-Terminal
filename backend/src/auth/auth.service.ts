import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    private jwtService: JwtService,
  ) {}

  async registrarEstudiante(datosRegistro: RegistroDto) {
    const { nombre, boleta, correo, contrasena } = datosRegistro;

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: [{ boleta }, { correo }],
    });

    if (usuarioExistente) {
      throw new HttpException(
        'La cuenta ya está registrada.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let rolEstudiante = await this.rolRepository.findOne({
      where: { id_rol: 1 },
    });
    if (!rolEstudiante) {
      rolEstudiante = this.rolRepository.create({ nombre_rol: 'estudiante' });
      await this.rolRepository.save(rolEstudiante);
    }

    const saltos = 10;
    const contrasenaCifrada = await bcrypt.hash(contrasena, saltos);

    const nuevoUsuario = this.usuarioRepository.create({
      nombre,
      boleta,
      correo,
      contrasena: contrasenaCifrada,
      rol: rolEstudiante,
    });

    await this.usuarioRepository.save(nuevoUsuario);
    return { mensaje: 'Cuenta creada exitosamente.' };
  }

  async login(datosLogin: LoginDto) {
    const { boleta, contrasena } = datosLogin;

    // 1. Buscar al usuario por boleta e incluir su rol en la consulta
    const usuario = await this.usuarioRepository.findOne({
      where: { boleta },
      relations: ['rol'],
    });

    // 2. Si no existe, marca error
    if (!usuario) {
      throw new HttpException(
        'Credenciales incorrectas. Intente de nuevo.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 3. Comparar la contraseña con el hash de la base de datos
    const contrasenaCorrecta = await bcrypt.compare(
      contrasena,
      usuario.contrasena,
    );

    if (!contrasenaCorrecta) {
      throw new HttpException(
        'Credenciales incorrectas. Intente de nuevo.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 4. Generar el Payload para el JWT
    const payload = {
      sub: usuario.id_usuario,
      boleta: usuario.boleta,
      rol: usuario.rol.nombre_rol,
    };

    // 5. Firmar y devolver el JWT
    const token = await this.jwtService.signAsync(payload);

    return {
      mensaje: 'Inicio de sesión exitoso',
      token: token,
      rol: usuario.rol.nombre_rol,
    };
  }
}
