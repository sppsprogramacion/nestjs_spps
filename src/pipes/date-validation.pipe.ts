import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: any) {

    //expresion regular para fecha yyyy-mm-dd
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(value)) {
      throw new BadRequestException(`La fecha proporcionada (${value}) no tiene el formato correcto. Debe ser YYYY-MM-DD.`);
    }

    const [year, month, day] = value.split('-').map(Number);

    // Crear la fecha usando los valores ingresados
    const date = new Date(year, month - 1, day); // Mes en JS empieza desde 0 (enero = 0, febrero = 1, etc.)

    // Validar que la fecha sea la misma que la ingresada (para evitar conversiones automáticas como 2024-02-30 a 2024-03-01)
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month || // getMonth() devuelve meses de 0 a 11, por lo que sumamos 1
      date.getDate() !== day
    ) {
      throw new BadRequestException(`La fecha proporcionada (${value}) no es válida en el calendario.`);
    }

    // const date = new Date(value);

    // // Verificar si es una fecha válida
    // if (isNaN(date.getTime())) {
    //   throw new BadRequestException(`La fecha proporcionada (${value}) no es válida.`);
    // }

    return value;  // Retorna el valor si es válido
  }
}