import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('excepciones_ingreso_visita')
export class ExcepcionIngresoVisita {

    @PrimaryGeneratedColumn()
    id_excepcion_ingreso_visita: number;
    
    //CIUDADANO
    @Column({
        type: 'int',
        nullable: false
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

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
    })
    motivo: string;

    @Column({
        type: 'varchar',
        length: 3000,
        nullable: false
    })
    detalle_excepcion: string;
    

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_excepcion: Date;    

    @Column({
        type: "boolean",
        default: false
    })
    cumplimentado: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    anulado: boolean;

    @Column({
        type: 'date',
        nullable: false
        
    })
    fecha_carga: Date;

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
        default: 2
    })
    usuario_carga_id: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_carga_id',
        referencedColumnName: 'id_usuario'
    })
    usuario_carga: Usuario;
    //FIN USUARIO
    
}
