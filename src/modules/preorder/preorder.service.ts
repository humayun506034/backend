import { Injectable } from '@nestjs/common';
import { CreatePreorderDto } from './dto/create-preorder.dto';
import { UpdatePreorderDto } from './dto/update-preorder.dto';

@Injectable()
export class PreorderService {
  create(createPreorderDto: CreatePreorderDto) {
    return 'This action adds a new preorder';
  }

  findAll() {
    return `This action returns all preorder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preorder`;
  }

  update(id: number, updatePreorderDto: UpdatePreorderDto) {
    return `This action updates a #${id} preorder`;
  }

  remove(id: number) {
    return `This action removes a #${id} preorder`;
  }
}
