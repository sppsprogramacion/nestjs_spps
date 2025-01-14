import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('novedades_ciudadano')
export class NovedadCiudadano {
    @PrimaryGeneratedColumn()
    id_novedad_ciudadano: number;

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
        length: 100,
        nullable: false,
    })
    novedad: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: false
    })
    novedad_detalle: string;
    

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_novedad: Date;

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
