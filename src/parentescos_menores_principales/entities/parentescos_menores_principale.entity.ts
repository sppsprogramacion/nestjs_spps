import { Organismo } from "src/organismos/entities/organismo.entity";
import { Parentesco } from "src/parentescos/entities/parentesco.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('parentescos_menores_principales')
export class ParentescoMenorPrincipal {

    @PrimaryGeneratedColumn()
    id_parentesco_menor_principal: number;

    //PARENTESCO
    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    parentesco_id: string;

    @ManyToOne(type => Parentesco, {eager: true} )
    @JoinColumn({
        name: 'parentesco_id',
        referencedColumnName: 'id_parentesco'
    })
    parentesco: Parentesco;
    //FIN PARENTESCO    
    
    //ORGANISMO
    @Column({
        type: 'int',
        nullable: false,
        unique: true,
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
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_alta: Date;

    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_baja: Date;
   
    @Column({
        type: 'varchar',
        length: 300,
        nullable: true
    })
    detalles: string;
    
}
