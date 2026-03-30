import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Pais } from "src/paises/entities/pais.entity";
import { Provincia } from "src/provincias/entities/provincia.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('domicilios_interno')
export class DomicilioInterno {

    @PrimaryGeneratedColumn()
    id_domicilio_interno: number;

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
    inetrno: Interno;
    //FIN INTERNO
    
    //PAIS
    @Column({
        type: 'varchar',
        length: 10,
        default: 'AR'
    })
    pais_id: string;

    @ManyToOne(type => Pais, {eager: true} )
    @JoinColumn({
        name: 'pais_id',
        referencedColumnName: 'id_pais'
    })
    pais: Pais;
    //FIN PAIS

    //PROVINCIA
    @Column({
        type: 'varchar',
        length: 10,
        default: 'SINESP'
    })
    provincia_id: string;

    @ManyToOne(type => Provincia, {eager: true} )
    @JoinColumn({
        name: 'provincia_id',
        referencedColumnName: 'id_provincia'
    })
    provincia: Provincia;
    //FIN PROVINCIA

    //DEPARTAMENTO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    departamento_id: number;

    @ManyToOne(type => Departamento, {eager: true} )
    @JoinColumn({
        name: 'departamento_id',
        referencedColumnName: 'id_departamento'
    })
    departamento: Departamento;
    //FIN DEPARTAMENTO

    //MUNICIPIO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    municipio_id: number;

    @ManyToOne(type => Municipio, {eager: true} )
    @JoinColumn({
        name: 'municipio_id',
        referencedColumnName: 'id_municipio'
    })
    municipio: Municipio;
    //FIN MUNICIPIO

    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        default: 'Sin especificar'
    })
    ciudad: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        default: 'Sin especificar'
    })
    barrio: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        default: 'Sin especificar'
    })
    direccion: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    numero_dom: number;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

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
        nullable: false,
        default:2
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
