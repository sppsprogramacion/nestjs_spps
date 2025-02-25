import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Parentesco } from "src/parentescos/entities/parentesco.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('menores_a_cargo')
export class MenorACargo {
    @PrimaryGeneratedColumn()
    id_menor_a_cargo: number;

    //CIUDADANO TUTOR
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    ciudadano_tutor_id: number;

    @ManyToOne(type => Ciudadano, {eager: true} )
    @JoinColumn({
        name: 'ciudadano_tutor_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadanoTutor: Ciudadano;
    //FIN CIUDADANO TUTOR

    //CIUDADANO MENOR
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    ciudadano_menor_id: number;

    @ManyToOne(type => Ciudadano, {eager: true} )
    @JoinColumn({
        name: 'ciudadano_menor_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadanoMenor: Ciudadano;
    //FIN CIUDADANO MENOR
   

    //PARENTESCO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    parentesco_id: number;

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
    fecha_carga: Date;

    @Column({
        type: "boolean",
        default: true
    })
    anulado: boolean;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true
    })
    detalle_anular: string;

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
