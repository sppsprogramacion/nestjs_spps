import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaCiudadano } from '../../categorias-ciudadano/entities/categorias-ciudadano.entity';

@Entity('ciudadanos_categorias')
export class CiudadanoCategoria {

    @PrimaryGeneratedColumn()
    id_ciudadano_categoria: number;

    //CIUDADANO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    ciudadano_id: number;

    @ManyToOne(type => Ciudadano, {eager: true} )
    @JoinColumn({
        name: 'ciudadano_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadano: Ciudadano;
    //FIN CIUDADANO    

    //CATEGORIA
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    categoria_ciudadano_id: number;

    @ManyToOne(type => CategoriaCiudadano, {eager: true} )
    @JoinColumn({
        name: 'categoria_ciudadano_id',
        referencedColumnName: 'id_categoria_ciudadano'
    })
    categoria_ciudadano: CategoriaCiudadano;
    //FIN CATEGORIA
    
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_carga: Date;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true
    })
    detalle_quitar_categoria: string;

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
