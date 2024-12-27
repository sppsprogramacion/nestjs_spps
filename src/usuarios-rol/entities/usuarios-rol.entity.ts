import { Rol } from "src/roles/entities/rol.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios_rol')
export class UsuarioRol {

    @PrimaryGeneratedColumn()
    id_usuario_rol: number;

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
        length: 1000,
        nullable: false
    })
    observaciones: string;
    
    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_alta: Date;

    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_baja: Date;

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;    

}
