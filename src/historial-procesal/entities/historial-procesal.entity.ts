import { IngresoInterno } from "src/ingresos-interno/entities/ingresos-interno.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { TipoHistorialPocesal } from "src/tipos-historial-pocesal/entities/tipos-historial-pocesal.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('historial_procesal')
export class HistorialProcesal {
    @PrimaryGeneratedColumn()
    id_historial_procesal: number;

    //INGRESO
    @Column({
        type: 'int',
        nullable: false
    })
    ingreso_interno_id: number;

    @ManyToOne(type => IngresoInterno, {eager: true} )
    @JoinColumn({
        name: 'ingreso_interno_id',
        referencedColumnName: 'id_ingreso_interno'
    })
    ingreso_interno: IngresoInterno;
    //FIN INGRESO

    //TIPO HISTORIAL
    @Column({
        type: 'int',
        default: 1,
        nullable: false
    })
    tipo_historial_procesal_id: number;

    @ManyToOne(type => TipoHistorialPocesal, {eager: true} )
    @JoinColumn({
        name: 'tipo_historial_procesal_id',
        referencedColumnName: 'id_tipo_historial_procesal'
    })
    tipo_historial_procesal: TipoHistorialPocesal;
    //FIN TIPO HISTORIAL

    @Column({
        type: 'date',
        nullable: false
    })
    fecha: Date;
        
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    motivo: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: false
    })
    detalle: string;
    
    @Column({
        type: "boolean",
        default: false
    })
    is_eliminado: boolean;

    @Column({
        type: 'varchar',
        length: 400,
        nullable: true
    })
    detalle_eliminado: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_carga: Date;

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

    //USUARIO
    @Column({
        type: 'int',
        nullable: false
    })
    usuario_id: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO
}
