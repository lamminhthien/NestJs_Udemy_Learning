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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/get-all')
  getAllUser(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/create')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.user_name);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/find-by-id/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('/find-by-user-name')
  findAllUser(@Query('user_name') user_name: string) {
    return this.usersService.find(user_name);
  }

  @Delete('/delete')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('/update')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body.user_name);
  }
}
