import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TimeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('El valor de la hora debe ser un string.');
    }

    // Expresión regular para validar el formato HH:mm:ss (24h)
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

    if (!timeRegex.test(value)) {
      throw new BadRequestException('El formato de la hora debe ser HH:mm (24h).');
    }

    return value;
  }
}