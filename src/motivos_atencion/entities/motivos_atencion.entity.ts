import { OrganismoDestino } from "src/organismos_destino/entities/organismos_destino.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('motivos_atencion')
export class MotivoAtencion {

    @PrimaryGeneratedColumn()
    id_motivo_atencion: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    motivo_atencion: string

    //ORGANISMO DESTINO
    @Column({
        type: 'int',
        nullable: false
    })
    organismo_destino_id: number;

    @ManyToOne(type => OrganismoDestino, {eager: true} )
    @JoinColumn({
        name: 'organismo_destino_id',
        referencedColumnName: 'id_organismo_destino'
    })
    organismo_destino: OrganismoDestino;
    //FIN ORGANISMO DESTINO

}
