import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organismo } from '../../organismos/entities/organismo.entity';
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity('prohibiciones_visita')
export class ProhibicionVisita {
    
    @PrimaryGeneratedColumn()
    id_prohibicion_visita: number;

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

    @Column({
        type: 'date',
        nullable: false
        
    })
    fecha_prohibicion: Date;

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
        length: 30,
        nullable: true
    })
    tipo_levantamiento: string;

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

