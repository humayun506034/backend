import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreorderService } from './preorder.service';
import { CreatePreorderDto } from './dto/create-preorder.dto';
import { UpdatePreorderDto } from './dto/update-preorder.dto';

@Controller('preorder')
export class PreorderController {
  constructor(private readonly preorderService: PreorderService) {}

  @Post()
  create(@Body() createPreorderDto: CreatePreorderDto) {
    return this.preorderService.create(createPreorderDto);
  }

  @Get()
  findAll() {
    return this.preorderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preorderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreorderDto: UpdatePreorderDto) {
    return this.preorderService.update(+id, updatePreorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preorderService.remove(+id);
  }
}
