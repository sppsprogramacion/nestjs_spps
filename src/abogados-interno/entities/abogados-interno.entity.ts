import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { TipoDefensor } from "src/tipos-defensor/entities/tipos-defensor.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('abogados_interno')
export class AbogadoInterno {

    @PrimaryGeneratedColumn()
    id_abogado_interno: number;

    //CIUDADANO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    ciudadano_id: number;

    @ManyToOne(type => Ciudadano, {eager: true} )
    @JoinColumn({
        name: 'ciudadano_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadano: Ciudadano;
    //FIN CIUDADANO    

    //INTERNO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    interno_id: number;

    @ManyToOne(type => Interno, {eager: true} )
    @JoinColumn({
        name: 'interno_id',
        referencedColumnName: 'id_interno'
    })
    interno: Interno;
    //FIN INTERNO

    //TIPO DEFENSOR
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    tipo_defensor_id: number;

    @ManyToOne(type => TipoDefensor, {eager: true} )
    @JoinColumn({
        name: 'tipo_defensor_id',
        referencedColumnName: 'id_tipo_defensor'
    })
    tipo_defensor: TipoDefensor;
    //FIN TIPO DEFENSOR
    
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_carga: Date;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true
    })
    detalle_quitar_vigente: string;

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
        nullable: false,
        default:2
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
