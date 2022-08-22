import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('task')
@ApiTags('Task')
export class TasksController {
  @Get('/get-all')
  getAllUser() {
    return 'Hello';
  }
}
