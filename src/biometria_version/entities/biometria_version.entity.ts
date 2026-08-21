import { Column, PrimaryColumn } from "typeorm";


export class BiometriaVersion {

    @PrimaryColumn({
        type: 'tinyint',
        unsigned: true
    })
    id: number;


    @Column({
        type: 'bigint',
        unsigned: true,
        nullable: false,
        default: 0
    })
    version: string;
    
}
