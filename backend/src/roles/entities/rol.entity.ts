import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ length: 20 })
  nombre_rol: string;

  // Relación: Un rol puede pertenecer a muchos usuarios
  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
