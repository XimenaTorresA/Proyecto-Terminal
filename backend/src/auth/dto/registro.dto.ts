import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class RegistroDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'La boleta no puede tener más de 20 caracteres' })
  boleta: string;

  @IsEmail({}, { message: 'Debe ser un correo institucional válido' })
  correo: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  contrasena: string;
}
