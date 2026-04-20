import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('concepto')
export class Concepto {
    @PrimaryGeneratedColumn()
    id_concepto: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    concepto: string

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
