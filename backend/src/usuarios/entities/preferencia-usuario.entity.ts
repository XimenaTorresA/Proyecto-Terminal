import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('preferencia_usuario')
export class PreferenciaUsuario {
  @PrimaryGeneratedColumn()
  id_preferencia: number;

  @Column({ type: 'jsonb', nullable: true })
  recursos_favoritos: any;

  @Column({ length: 50, nullable: true })
  formato_preferido: string;

  @Column({ length: 20, nullable: true })
  dificultad_preferida: string;

  // Relación 1 a 1 con Usuario
  @OneToOne(() => Usuario, (usuario) => usuario.preferencia_usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
