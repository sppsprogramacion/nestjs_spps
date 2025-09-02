import { Organismo } from "src/organismos/entities/organismo.entity";
import { ProhibicionVisita } from "src/prohibiciones-visita/entities/prohibiciones-visita.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bitacora_prohibiciones_visitas')
export class BitacoraProhibicionVisita {

    @PrimaryGeneratedColumn()
    id_bitacora_prohibicion_visita: number;

    //PROHIBICION
    @Column({
        type: 'int',
        nullable: false
    })
    prohibicion_visita_id: number;

    @ManyToOne(type => ProhibicionVisita, {eager: true} )
    @JoinColumn({
        name: 'prohibicion_visita_id',
        referencedColumnName: 'id_prohibicion_visita'
    })
    prohibicion: ProhibicionVisita;
    //FIN PROHIBICION
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    disposicion: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: false
    })
    detalle: string;
    

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_inicio: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_fin: Date;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    anulado: boolean;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    motivo: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: false
    })
    detalle_motivo: string;

    //ORGANISMO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_id',
        referencedColumnName: 'id_organismo'
    })
    organismo: Organismo;
    //FIN ORGANISMO

    //USUARIO
    @Column({
        type: 'int',
        nullable: false
    })
    usuario_id: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_cambio: Date;



}
