import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { TodolistService } from 'src/todolist/todolist.service';
import { UsersService } from 'src/users/users.service';
import { Task } from './entities/task.entity';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Todolist, User])],
  controllers: [TasksController],
  providers: [TaskService, TodolistService, UsersService],
})
export class TasksModule {}
