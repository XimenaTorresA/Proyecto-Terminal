import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { RecursoEducativo } from '../../recursos/entities/recurso-educativo.entity';
import { ProgresoTema } from '../../progreso/entities/progreso-tema.entity';
@Entity('tema')
export class Tema {
  @PrimaryGeneratedColumn()
  id_tema: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  // Relación Muchos a Muchos con RecursoEducativo
  @ManyToMany(() => RecursoEducativo, (recurso) => recurso.temas)
  recursos: RecursoEducativo[];
  // Relación Uno a Muchos con ProgresoTema (Un tema tiene el progreso de varios usuarios)
  @OneToMany(() => ProgresoTema, (progreso) => progreso.tema)
  progresos_usuario: ProgresoTema[];
}
