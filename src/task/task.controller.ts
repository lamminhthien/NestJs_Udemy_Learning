import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('task')
@ApiTags('Task')
export class TasksController {
  @Get('/get-all')
  getAllUser() {
    return 'Hello';
  }
}
