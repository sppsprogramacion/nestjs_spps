import { IngresoInterno } from "src/ingresos-interno/entities/ingresos-interno.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('traslados_interno')
export class TrasladoInterno {

    @PrimaryGeneratedColumn()
    id_traslado_interno: number;

    //INGRESO
    @Column({
        type: 'int',
        nullable: false
    })
    ingreso_interno_id: number;

    @ManyToOne(type => IngresoInterno, {eager: true} )
    @JoinColumn({
        name: 'ingreso_interno_id',
        referencedColumnName: 'id_ingreso_interno'
    })
    ingreso_interno: IngresoInterno;
    //FIN INGRESO
    
    //ORGANISMO ORIGEN
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_origen_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_origen_id',
        referencedColumnName: 'id_organismo'
    })
    organismo_origen: Organismo;
    //FIN ORGANISMO ORIGEN

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_egreso_origen: Date;

    @Column({
        type: 'varchar',
        length: 1600,
        nullable: false
    })
    detalle_traslado: string;

    //ORGANISMO DESTINO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_destino_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_destino_id',
        referencedColumnName: 'id_organismo'
    })
    organismo_destino: Organismo;
    //FIN ORGANISMO DESTINO

    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_ingreso_destino: Date;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false
    })
    estado_traslado: string;
    
    @Column({
        type: 'varchar',
        length: 1600,
        nullable: true
    })
    obs_traslado: string;

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_carga: Date;

    @Column({
        type: 'time',
        nullable: false,
    })
    hora_carga: string;

    //USUARIO
    @Column({
        type: 'int',
        nullable: false,
        default: 2
    })
    usuario_id: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO    
}
