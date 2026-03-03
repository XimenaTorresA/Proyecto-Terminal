import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('chat_log')
export class ChatLog {
  @PrimaryGeneratedColumn()
  id_chatlog: number;

  @Column({ type: 'text' })
  mensaje_entrada: string;

  @Column({ type: 'jsonb', nullable: true })
  recurso_respuesta: any;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @Column({ length: 100, nullable: true })
  entidad_detectada: string;

  // Relación Muchos a Uno con Usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.chatlogs)
  @JoinColumn({ name: 'id_usuario' }) // FK exacta del diagrama
  usuario: Usuario;
}
