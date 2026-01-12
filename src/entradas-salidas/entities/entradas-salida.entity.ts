import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { OrganismoDestino } from "src/organismos_destino/entities/organismos_destino.entity";
import { Parentesco } from "src/parentescos/entities/parentesco.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('entradas_salida')
export class EntradasSalida {

    @PrimaryGeneratedColumn()
    id_entrada_salida: number; 
    
    //INTERNO
    @Column({
        type: 'int',
        nullable: false
    })
    interno_id: number;
    
    @ManyToOne(type => Interno, {eager: true} )
    @JoinColumn({
        name: 'interno_id',
        referencedColumnName: 'id_interno'
    })
    interno: Interno;
    //FIN INTERNO

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    nombre_interno: string
    
    //CIUDADANO
    @Column({
        type: 'int',
        nullable: false
    })
    ciudadano_id: number;
    
    @ManyToOne(type => Ciudadano, {eager: true} )
    @JoinColumn({
        name: 'ciudadano_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadano: Ciudadano;
    //FIN CIUDADANO

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    nombre_visita: string

    @Column({
        type: 'int',
        nullable: false
    })
    edad: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    categoria: string

    //SEXO
    @Column({
        type: 'int',
        nullable: false
    })
    sexo_id: number;
    
    @ManyToOne(type => Sexo, {eager: true} )
    @JoinColumn({
        name: 'sexo_id',
        referencedColumnName: 'id_sexo'
    })
    sexo: Sexo;
    //FIN SEXO

    //PARENTESCO
    @Column({
        type: 'int',
        nullable: false
    })
    parentesco_id: number;
    
    @ManyToOne(type => Parentesco, {eager: true} )
    @JoinColumn({
        name: 'parentesco_id',
        referencedColumnName: 'id_parentesco'
    })
    tipo_acceso: Parentesco;
    //FIN PARENTESCO
  
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_ingreso: Date;

    @Column({
        type: 'time',
        nullable: false,
    })
    hora_ingreso: string;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_egreso: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true
    })
    observaciones: string;

    @Column({
        type: "boolean",
        default: false
    })
    anulado: boolean;

    @Column({
        type: 'varchar',
        length: 1600,
        nullable: true
    })
    detalle_anulado: string;

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
