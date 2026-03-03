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

@Entity('recomendacion')
export class Recomendacion {
  @PrimaryGeneratedColumn()
  id_recomendacion: number;

  @Column({ type: 'decimal', precision: 5, scale: 4 })
  puntaje_similitud: number;

  @Column({ type: 'text', nullable: true })
  razon: string;

  @Column({ length: 20, default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  fecha_sugerencia: Date;

  // Relación Muchos a Uno con Usuario (A un alumno se le hacen muchas recomendaciones)
  @ManyToOne(() => Usuario, (usuario) => usuario.recomendaciones)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación Muchos a Uno con RecursoEducativo (Un recurso es recomendado a muchos alumnos)
  @ManyToOne(() => RecursoEducativo, (recurso) => recurso.recomendaciones)
  @JoinColumn({ name: 'id_recurso' })
  recurso: RecursoEducativo;
}
