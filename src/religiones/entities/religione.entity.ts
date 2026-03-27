import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('religiones')
export class Religion {
    @PrimaryGeneratedColumn()
    id_religion: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    religion: string
}
