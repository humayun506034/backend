import { PreorderService } from './preorder.service';
import { CreatePreorderDto } from './dto/create-preorder.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Preorders')
@Controller('preorder')
export class PreorderController {
  constructor(private readonly preorderService: PreorderService) {}

  @Post()
  @ApiBody({ type: CreatePreorderDto })
  @ApiCreatedResponse({
    description: 'Preorder created successfully.',
  })
  create(@Body() createPreorderDto: CreatePreorderDto) {
    return this.preorderService.create(createPreorderDto);
  }
}
