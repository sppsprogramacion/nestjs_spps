import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //prefijo global que se agrega a las rutas de los endpoints
  app.setGlobalPrefix('api');

  //para validar globalmente los dtos en todos los controladores
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,  //elimina los campos que no estan en el dto
    forbidNonWhitelisted: true, //envia un bad request con los campos enviados y que no estan el el dto
  }));
  app.enableCors();

  await app.listen(3000);
  const logger = new Logger();
  logger.log(`corriendo en el servidor ${await app.getUrl()}`)
}
bootstrap();
