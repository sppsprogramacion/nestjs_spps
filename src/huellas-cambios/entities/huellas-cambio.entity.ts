import { Huella } from "src/huellas/entities/huella.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('huellas_cambios')
export class HuellaCambio {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    version: string;


    @Column({
        type: 'int',
        nullable: false
    })
    huella_id: number;

    @ManyToOne(() => Huella, { eager: false })
    @JoinColumn({
        name: 'huella_id',
        referencedColumnName: 'id_huella_ciudadano'
    })
    huella: Huella;


    @Column({
        type: 'enum',
        enum: ['ALTA', 'BAJA'],
        nullable: false
    })
    accion: 'ALTA' | 'BAJA';

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha: Date;

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
