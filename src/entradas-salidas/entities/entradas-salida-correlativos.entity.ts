import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";



@Entity('entradas_salida_correlativos')
@Index(
    'UQ_correlativo_organismo',
    ['organismo_id'],
    { unique: true }
)
export class EntradaSalidaCorrelativo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false
    })
    organismo_id: number;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha: Date;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    ultimo_numero: number;
    
}