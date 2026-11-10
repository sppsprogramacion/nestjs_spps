import { PartialType } from '@nestjs/mapped-types';
import { CreateParentescosMenoresPrincipaleDto } from './create-parentescos_menores_principale.dto';

export class UpdateParentescosMenoresPrincipaleDto extends PartialType(CreateParentescosMenoresPrincipaleDto) {}
