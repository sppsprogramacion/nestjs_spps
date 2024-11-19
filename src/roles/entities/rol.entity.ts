import { Sistema } from "src/sistemas/entities/sistema.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('roles')
export class Rol {
    @PrimaryColumn({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    id_rol: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    rol: string

    //SISTEMA
    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        default: 'ciudadano'
    })
    sistema_id: string;

    @ManyToOne(type => Sistema, {eager: true} )
    @JoinColumn({
        name: 'sistema_id',
        referencedColumnName: 'id_sistema'
    })
    sistema: Sistema;
    //FIN SISTEMA
}