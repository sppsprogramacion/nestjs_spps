import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('pelo_tipo')
export class PeloTipo {
    
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_pelo_tipo: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    pelo_tipo: string
}
