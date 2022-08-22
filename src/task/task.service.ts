import {
  NotAcceptableException,
  Injectable,
  NotFoundException,
  HttpCode,
  Body,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.repo.find();
  }

  async create(taskDto: CreateTaskDto, todolist: Todolist, user: User) {
    const task = this.repo.create(taskDto);
    task.user = user;
    task.todolist = todolist;
    return this.repo.save(task);
  }

  async findTaskFromLitByID(listId: number) {
    const TaskList = await this.repo
      .createQueryBuilder('task')
      .where('task.todolistId = :listId', { listId: listId })
      .getMany();
    return TaskList;
  }

  async remove(id: string) {
    const task = await this.repo.findOne(id);
    if (!task) {
      throw new NotFoundException('Cannot remove task because task not found');
    }
    return this.repo.remove(task);
  }
}
