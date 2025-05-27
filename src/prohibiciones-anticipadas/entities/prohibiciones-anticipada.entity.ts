import { Organismo } from "src/organismos/entities/organismo.entity";
import { Parentesco } from "src/parentescos/entities/parentesco.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('prohibiciones_anticipadas')
export class ProhibicionAnticipada {
    @PrimaryGeneratedColumn()
    id_prohibicion_anticipada: number;

    @Column({
        type: 'int',
        nullable: false
    })
    dni_visita: number;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    apellido_visita: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    nombre_visita: string;

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

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: false
    })
    detalle: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    apellido_interno: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    nombre_interno: string;

    //PARENTESCO
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    parentesco_id: string;

    @ManyToOne(type => Parentesco, {eager: true} )
    @JoinColumn({
        name: 'parentesco_id',
        referencedColumnName: 'id_parentesco'
    })
    parentesco: Parentesco;
    //FIN PARENTESCO    
    
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_inicio: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_fin: Date;

    @Column({
        type: "boolean",
        default: false
    })
    is_exinterno: boolean;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    tipo_levantamiento: string;

    @Column({
        type: 'date',
        nullable: false
        
    })
    fecha_prohibicion: Date;
        
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
        default: 2
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
