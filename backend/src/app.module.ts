import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //Configuración para conectar con PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'sistema_recomendador_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sincroniza automáticamente los modelos con la BD
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
