import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

//todo lo que retorna este decorador se refleja al utilizar este decorador en el controlador
//en este caso obtiene el usuario de la ruta en donde esta autenticado
export const GetUser = createParamDecorator(
    ( data: string, ctx: ExecutionContext) => {
        //data son los argumentos (del usuario) solicitados en el controlador a traves del decorador personalizado... @GetUser(['email','apellido']) user: Usuario
        //ExecutionContext el contexto donde se realiza la peticion... de ahi puedo obtener la request
        
        //obtengo la request del contexto
        const req = ctx.switchToHttp().getRequest();
        //obtengo el usuario de la request
        const user = req.user;

        if( !user ){
            throw new InternalServerErrorException("User not found (request)");
        }
        
        //devuelve el usuario sino se manda argumentos desde el controlador en la data... 
        //sino se muestra la informacion segun lo enviedo en la data
        return ( !data )? user : user[data];
    }
);