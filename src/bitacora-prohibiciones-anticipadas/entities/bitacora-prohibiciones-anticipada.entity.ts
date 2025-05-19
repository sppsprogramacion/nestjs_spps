import { Organismo } from "src/organismos/entities/organismo.entity";
import { ProhibicionAnticipada } from "src/prohibiciones-anticipadas/entities/prohibiciones-anticipada.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("bitacora_prohibiciones_anticipadas")
export class BitacoraProhibicionAnticipada {

    @PrimaryGeneratedColumn()
    id_bitacora_prohibicion_anticipada: number;

    //PROHIBICION ANTICIPADA
    @Column({
        type: 'int',
        nullable: false
    })
    prohibicion_anticipada_id: number;

    @ManyToOne(type => ProhibicionAnticipada, {eager: true} )
    @JoinColumn({
        name: 'prohibicion_anticipada_id',
        referencedColumnName: 'id_prohibicion_anticipada'
    })
    prohibicion: ProhibicionAnticipada;
    //FIN PROHIBICION ANTICIPADA
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    motivo: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: false
    })
    detalle_motivo: string;

    @Column({
        type: 'varchar',
        length: 3000,
        nullable: false
    })
    datos_modificados: string;
    
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_cambio: Date;

    //ORGANISMO
    @Column({
        type: 'int',
        nullable: false
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
    
}
