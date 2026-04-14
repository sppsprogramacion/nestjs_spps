import { Organismo } from "src/organismos/entities/organismo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pabellones')
export class Pabellon {

    @PrimaryGeneratedColumn()
    id_pabellon: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    pabellon: string

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
    
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
}
