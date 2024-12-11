import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Parentesco } from "src/parentescos/entities/parentesco.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('visitas-internos')
export class VisitaInterno {
    
    @PrimaryGeneratedColumn()
    id_visita_interno: number;

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
    
    //INTERNO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    interno_id: number;

    @ManyToOne(type => Interno, {eager: true} )
    @JoinColumn({
        name: 'interno_id',
        referencedColumnName: 'id_interno'
    })
    interno: Interno;
    //FIN INTERNO

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
        type: "boolean",
        default: false
    })
    prohibido: boolean;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_alta: Date;

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
