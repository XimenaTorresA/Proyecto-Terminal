import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Rol } from '../../roles/entities/rol.entity';
import { PerfilAprendizaje } from './perfil-aprendizaje.entity';
import { PreferenciaUsuario } from './preferencia-usuario.entity';
import { RecursoEducativo } from '../../recursos/entities/recurso-educativo.entity';
import { RegistroActividad } from '../../registros/entities/registro-actividad.entity';
import { ProgresoTema } from '../../progreso/entities/progreso-tema.entity';
import { Evaluacion } from '../../evaluaciones/entities/evaluacion.entity';
import { Recomendacion } from '../../recomendaciones/entities/recomendacion.entity';
import { Retroalimentacion } from '../../retroalimentacion/entities/retroalimentacion.entity';
import { ChatLog } from '../../chat/entities/chat-log.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 20 })
  boleta: string;

  @Column({ unique: true, length: 100 })
  correo: string;

  @Column({ length: 100 })
  contrasena: string;
  // Relación: Muchos usuarios tienen un solo rol
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @Column({ default: true })
  esta_activo: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  // Relación 1 a 1 con PerfilAprendizaje
  @OneToOne(() => PerfilAprendizaje, (perfil) => perfil.usuario)
  perfil_aprendizaje: PerfilAprendizaje;
  // Relación 1 a 1 con PreferenciaUsuario
  @OneToOne(() => PreferenciaUsuario, (preferencia) => preferencia.usuario)
  preferencia_usuario: PreferenciaUsuario;
  // Relación 1 a muchos con RecursoEducativo (un usuario puede crear muchos recursos)
  @OneToMany(() => RecursoEducativo, (recurso) => recurso.docente)
  recursos_creados: RecursoEducativo[];
  // Relación 1 a muchos con RegistroActividad (un usuario puede tener muchos registros de actividad)
  @OneToMany(() => RegistroActividad, (registro) => registro.usuario)
  registros_actividad: RegistroActividad[];
  // Relación 1 a muchos con ProgresoTema (un usuario tiene progreso en varios temas)
  @OneToMany(() => ProgresoTema, (progreso) => progreso.usuario)
  progresos_tema: ProgresoTema[];
  // Relación 1 a muchos con Evaluacion (un usuario tiene muchas evaluaciones)
  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.usuario)
  evaluaciones: Evaluacion[];
  // Relación 1 a muchos con Recomendacion (un usuario recibe muchas recomendaciones)
  @OneToMany(() => Recomendacion, (recomendacion) => recomendacion.usuario)
  recomendaciones: Recomendacion[];
  // Relación 1 a muchos con Retroalimentacion (un usuario puede recibir muchas retroalimentaciones)
  @OneToMany(
    () => Retroalimentacion,
    (retroalimentacion) => retroalimentacion.estudiante,
  )
  retroalimentaciones_recibidas: Retroalimentacion[];
  // Relación 1 a muchos con Retroalimentacion (un usuario puede emitir muchas retroalimentaciones)
  @OneToMany(
    () => Retroalimentacion,
    (retroalimentacion) => retroalimentacion.docente,
  )
  retroalimentaciones_emitidas: Retroalimentacion[];
  // Relación 1 a muchos con ChatLog (un usuario puede tener muchos registros de chat)
  @OneToMany(() => ChatLog, (chatLog) => chatLog.usuario)
  chatlogs: ChatLog[];
}
