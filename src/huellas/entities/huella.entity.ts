import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { DedoHuella } from "src/dedos_huella/entities/dedos_huella.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('huellas')
export class Huella {

    @PrimaryGeneratedColumn()
    id_huella_ciudadano: number;

    //CIUDADANO
    @Column({
        type: 'int',
        nullable: false
    })
    ciudadano_id: number;

    @ManyToOne(type => Ciudadano, {eager: false} )
    @JoinColumn({
        name: 'ciudadano_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadano: Ciudadano;
    //FIN CIUDADANO
    
    //DEDO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    dedo_id: number;

    @ManyToOne(type => DedoHuella, {eager: false} )
    @JoinColumn({
        name: 'dedo_id',
        referencedColumnName: 'id_dedo_huella'
    })
    dedo_huella: DedoHuella;
    //FIN DEDO

   @Column({
        type:'mediumblob',
        nullable: false,
    })
    huella: Buffer;

    @Column({
        type: "boolean",
        default: true,
        
    })
    activo: boolean;   
    
    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP' 
    })
    fecha_registro: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP', 
        onUpdate: 'CURRENT_TIMESTAMP' 
    })
    fecha_modificacion: Date;
    
    @Column({
        type: 'varchar',
        length: 500,
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

    @ManyToOne(type => Organismo, {eager: false} )
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

    @ManyToOne(type => Usuario, {eager: false} )
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO
}
