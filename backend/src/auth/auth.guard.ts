import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// 1. Qué datos vienen dentro del token
interface DatosUsuario {
  sub: number;
  boleta: string;
  rol: string;
}

// 2. Extendemos la petición de Express para incluir el usuario
interface PeticionConUsuario extends Request {
  user?: DatosUsuario;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 3. Casteamos explícitamente el request
    const request = context.switchToHttp().getRequest<PeticionConUsuario>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No se proporcionó un token de acceso.');
    }

    try {
      const payload: DatosUsuario = await this.jwtService.verifyAsync(token, {
        secret: 'MI_CLAVE_SECRETA_SUPER_SEGURA',
      });

      request.user = payload;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
