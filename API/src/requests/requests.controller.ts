import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import {
  CreateRequestDto,
  CreateGroupRequestDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Post('/groups')
  createGroup(@Body() createRequestDto: CreateGroupRequestDto) {
    return this.requestsService.createGroup(createRequestDto);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }
  @Put()
  update_state(@Body() updateRequestDto: UpdateRequestDto) {
    console.log('updateRequestDto AAAAAAA', updateRequestDto);
    return this.requestsService.update_state(updateRequestDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}