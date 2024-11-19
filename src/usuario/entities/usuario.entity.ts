import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
//import {hash} from 'bcryptjs';
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Rol } from "src/roles/entities/rol.entity";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({
        type: 'int',
        nullable: false,
        unique: true
    })
    dni: number;

    @Column({
        type: 'int',
        nullable: false,
        unique: true
    })
    legajo: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    apellido: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    nombre: string;

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
        length: 100,
        nullable: false,
        unique: false
    })
    telefono: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        unique: false
    })
    email: string;

    //ROL
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        default: "consulta"
    })
    rol_id: string;

    @ManyToOne(type => Rol, {eager: true} )
    @JoinColumn({
        name: 'rol_id',
        referencedColumnName: 'id_rol'
    })
    rol: Rol;
    //FIN ROL

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        unique: false,
        select: false
    })
    clave: string;    

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;

}


