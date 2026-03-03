import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { RecursoEducativo } from '../../recursos/entities/recurso-educativo.entity';

@Entity('registro_actividad')
export class RegistroActividad {
  @PrimaryGeneratedColumn()
  id_registro: number;

  @Column({ length: 100 })
  accion_realizada: string;

  @Column({ type: 'jsonb', nullable: true })
  detalles_actividad: any;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  // Relación Muchos a Uno con Usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.registros_actividad)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación Muchos a Uno con RecursoEducativo
  @ManyToOne(() => RecursoEducativo, (recurso) => recurso.registros_actividad)
  @JoinColumn({ name: 'id_recurso' })
  recurso: RecursoEducativo;
}
