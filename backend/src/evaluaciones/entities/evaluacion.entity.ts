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

@Entity('evaluacion')
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id_evaluacion: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 }) // Permite calificaciones como 8.50 o 10.00
  calificacion: number;

  @Column({ type: 'int', nullable: true })
  errores: number;

  @Column({ type: 'text', nullable: true })
  feedback_ia: string;

  @Column({ type: 'jsonb', nullable: true })
  detalles_errores: any;

  @CreateDateColumn()
  fecha_evaluacion: Date;

  // Relación Muchos a Uno con Usuario (Un alumno tiene muchas evaluaciones)
  @ManyToOne(() => Usuario, (usuario) => usuario.evaluaciones)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación Muchos a Uno con RecursoEducativo (Un ejercicio tiene muchas evaluaciones de distintos alumnos)
  @ManyToOne(() => RecursoEducativo, (recurso) => recurso.evaluaciones)
  @JoinColumn({ name: 'id_recurso' })
  recurso: RecursoEducativo;
}
