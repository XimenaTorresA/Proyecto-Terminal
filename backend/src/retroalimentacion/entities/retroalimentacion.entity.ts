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

@Entity('retroalimentacion')
export class Retroalimentacion {
  @PrimaryGeneratedColumn()
  id_retroalimentacion: number;

  @Column({ type: 'text' })
  comentarios: string;

  @CreateDateColumn()
  fecha_emision: Date;

  // Relación Muchos a Uno: El estudiante que recibe la retroalimentación
  @ManyToOne(() => Usuario, (usuario) => usuario.retroalimentaciones_recibidas)
  @JoinColumn({ name: 'id_estudiante' })
  estudiante: Usuario;

  // Relación Muchos a Uno: El docente que emite la retroalimentación
  @ManyToOne(() => Usuario, (usuario) => usuario.retroalimentaciones_emitidas)
  @JoinColumn({ name: 'id_docente' })
  docente: Usuario;

  // Relación Muchos a Uno: El recurso sobre el cual se hace el comentario
  @ManyToOne(() => RecursoEducativo, (recurso) => recurso.retroalimentaciones, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_recurso' })
  recurso: RecursoEducativo;
}
