import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Tema } from '../../temas/entities/tema.entity';
import { RegistroActividad } from '../../registros/entities/registro-actividad.entity';
import { Evaluacion } from '../../evaluaciones/entities/evaluacion.entity';
import { Recomendacion } from '../../recomendaciones/entities/recomendacion.entity';
import { Retroalimentacion } from '../../retroalimentacion/entities/retroalimentacion.entity';

@Entity('recurso_educativo')
export class RecursoEducativo {
  @PrimaryGeneratedColumn()
  id_recurso: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ length: 50 })
  tipo: string;

  @Column({ length: 50 })
  nivel: string;

  @Column({ length: 30 })
  formato: string;

  @Column({ type: 'int' })
  duracion: number;

  @Column({ length: 20 })
  estado: string;

  @Column({ type: 'jsonb', nullable: true })
  vector_caracteristicas: any;

  @Column({ type: 'text', nullable: true })
  solucion_correcta: string;

  // Relación: Muchos recursos son creados por un docente (Usuario)
  @ManyToOne(() => Usuario, (usuario) => usuario.recursos_creados)
  @JoinColumn({ name: 'id_docente' })
  docente: Usuario;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_modificacion: Date;
  @ManyToMany(() => Tema, (tema) => tema.recursos)
  @JoinTable({
    name: 'RecursoTema',
    joinColumn: {
      name: 'id_recurso',
      referencedColumnName: 'id_recurso',
    },
    inverseJoinColumn: {
      name: 'id_tema',
      referencedColumnName: 'id_tema',
    },
  })
  temas: Tema[];
  // Relación 1 a muchos con RegistroActividad (un recurso puede tener muchos registros de actividad)
  @OneToMany(() => RegistroActividad, (registro) => registro.recurso)
  registros_actividad: RegistroActividad[];
  // Relación 1 a muchos con Evaluacion (un recurso puede tener muchas evaluaciones)
  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.recurso)
  evaluaciones: Evaluacion[];
  // Relación 1 a muchos con Recomendacion (un recurso puede ser recomendado a muchos alumnos)
  @OneToMany(() => Recomendacion, (recomendacion) => recomendacion.recurso)
  recomendaciones: Recomendacion[];
  // Relación 1 a muchos con Retroalimentacion (un recurso puede tener muchos comentarios de retroalimentación)
  @OneToMany(
    () => Retroalimentacion,
    (retroalimentacion) => retroalimentacion.recurso,
  )
  retroalimentaciones: Retroalimentacion[];
}
