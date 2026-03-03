import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('perfil_aprendizaje')
export class PerfilAprendizaje {
  @PrimaryColumn()
  id_usuario: number;

  @Column({ length: 20 })
  estilo_aprendizaje: string;

  // Relación 1 a 1 con la entidad Usuario
  @OneToOne(() => Usuario, (usuario) => usuario.perfil_aprendizaje)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
