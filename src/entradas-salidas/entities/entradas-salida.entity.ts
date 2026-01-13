import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
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
    parentesco: Parentesco;
    //FIN PARENTESCO

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    categoria: string

    //CIUDADANO TUTOR
    @Column({
        type: 'int',
        nullable: true
    })
    ciudadano_tutor_id?: number;
    
    @ManyToOne(() => Ciudadano, {
      eager: true,
      nullable: true,
      onDelete: 'SET NULL',
    })
    @JoinColumn({
      name: 'ciudadano_tutor_id',
      referencedColumnName: 'id_ciudadano',
    })
    ciudadano_tutor?: Ciudadano;
    //FIN CIUDADANO TUTOR
  
    //ingreso principal
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_ingreso_principal: Date;

    @Column({
        type: 'time',
        nullable: false,
    })
    hora_ingreso_principal: string;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_egreso_principal: string;
    //fin ingreso principal

    //control interno
    @Column({
        type: 'date',
        nullable: true
    })
    fecha_ingreso_control_interno: Date;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_ingreso_control_interno: string;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_egreso_control_interno: string;
    //fin control interno

    //mesa de control
    @Column({
        type: 'date',
        nullable: true
    })
    fecha_ingreso_mesa_control: Date;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_ingreso_mesa_control: string;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_egreso_mesa_control: string;
    //fin mesa de control

    //acceso 4
    @Column({
        type: 'date',
        nullable: true
    })
    fecha_ingreso_acceso_4: Date;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_ingreso_acceso_4: string;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_egreso_acceso_4: string;
    //fin acceso 4

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true
    })
    menores: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    pabellon: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    casillero: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true
    })
    observaciones_usuarios: string;
    
    @Column({
        type: "boolean",
        default: false
    })
    cancelado: boolean;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true
    })
    detalle_cancelado: string;

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
