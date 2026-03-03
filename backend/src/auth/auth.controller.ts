import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

interface DatosUsuario {
  sub: number;
  boleta: string;
  rol: string;
}

interface PeticionConUsuario extends Request {
  user: DatosUsuario;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  registrar(@Body() datosRegistro: RegistroDto) {
    return this.authService.registrarEstudiante(datosRegistro);
  }

  @Post('login')
  iniciarSesion(@Body() datosLogin: LoginDto) {
    return this.authService.login(datosLogin);
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  obtenerPerfil(@Req() req: PeticionConUsuario) {
    return {
      mensaje: 'Acceso autorizado a ruta protegida',
      datos_usuario: req.user,
    };
  }
}
