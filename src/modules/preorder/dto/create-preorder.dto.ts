import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePreorderDto {
  @ApiProperty({
    example: 'Multi variant 3',
    description: 'Preorder display name.',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Number of products covered by this preorder.',
  })
  @IsInt()
  @Min(1)
  products!: number;

  @ApiProperty({
    example: 'regardless-of-stock',
    description: 'When customers are allowed to preorder.',
  })
  @IsString()
  @IsNotEmpty()
  preorderWhen!: string;

  @ApiProperty({
    example: '2025-12-15T20:24:00.000Z',
    description: 'Preorder start date and time.',
  })
  @IsDateString()
  startsAt!: string;

  @ApiPropertyOptional({
    example: '2025-12-15T20:27:00.000Z',
    description: 'Preorder end date and time. Leave empty for no end date.',
  })
  @IsOptional()
  @IsDateString()
  endsAt?: string;

  @ApiPropertyOptional({
    example: true,
    default: true,
    description: 'Whether the preorder is active.',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
