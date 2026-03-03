import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Tema } from '../../temas/entities/tema.entity';

@Entity('progreso_tema')
export class ProgresoTema {
  @PrimaryGeneratedColumn()
  id_progreso: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  porcentaje_avance: number;

  @Column({ length: 50, nullable: true })
  nivel_dominio: string;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  // Relación Muchos a Uno con Usuario (Un usuario tiene progreso en varios temas)
  @ManyToOne(() => Usuario, (usuario) => usuario.progresos_tema)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación Muchos a Uno con Tema (Un tema tiene el progreso de varios usuarios)
  @ManyToOne(() => Tema, (tema) => tema.progresos_usuario)
  @JoinColumn({ name: 'id_tema' })
  tema: Tema;
}
