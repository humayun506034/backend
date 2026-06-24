import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePreorderDto } from './dto/create-preorder.dto';

@Injectable()
export class PreorderService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPreorderDto: CreatePreorderDto) {
    return this.prisma.preorder.create({
      data: {
        name: createPreorderDto.name,
        products: createPreorderDto.products,
        preorderWhen: createPreorderDto.preorderWhen,
        startsAt: new Date(createPreorderDto.startsAt),
        endsAt: createPreorderDto.endsAt
          ? new Date(createPreorderDto.endsAt)
          : null,
        isActive: createPreorderDto.isActive ?? true,
      },
    });
  }
}
