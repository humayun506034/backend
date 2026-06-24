import { PreorderService } from './preorder.service';
import { CreatePreorderDto } from './dto/create-preorder.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { sendResponse } from '../../common/utils/send-response';
import { FindPreordersQueryDto } from './dto/find-preorders-query.dto';
import type {
  FindPreordersResponse,
  PreorderResponse,
} from './preorder.service';

@ApiTags('Preorders')
@Controller('preorder')
export class PreorderController {
  constructor(private readonly preorderService: PreorderService) {}

  @Post()
  @ApiBody({ type: CreatePreorderDto })
  @ApiCreatedResponse({
    description: 'Preorder created successfully.',
  })
  async create(@Body() createPreorderDto: CreatePreorderDto) {
    const result = await this.preorderService.create(createPreorderDto);

    return sendResponse<PreorderResponse>({
      statusCode: HttpStatus.CREATED,
      message: 'Preorder created successfully.',
      data: result,
    });
  }

  @Get()
  @ApiOkResponse({
    description: 'Preorder list fetched successfully.',
  })
  async findAll(@Query() query: FindPreordersQueryDto) {
    const result: FindPreordersResponse =
      await this.preorderService.findAll(query);

    return sendResponse<
      FindPreordersResponse['data'],
      FindPreordersResponse['meta']
    >({
      statusCode: HttpStatus.OK,
      message: 'Preorder list fetched successfully.',
      data: result.data,
      meta: result.meta,
    });
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'clxpreorder123' })
  @ApiOkResponse({
    description: 'Preorder fetched successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Preorder not found.',
  })
  async findOne(@Param('id') id: string) {
    const result = await this.preorderService.findOne(id);

    return sendResponse<PreorderResponse>({
      statusCode: HttpStatus.OK,
      message: 'Preorder fetched successfully.',
      data: result,
    });
  }
}
