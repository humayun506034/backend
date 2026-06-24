import { PartialType } from '@nestjs/swagger';
import { CreatePreorderDto } from './create-preorder.dto';

export class UpdatePreorderDto extends PartialType(CreatePreorderDto) {}
