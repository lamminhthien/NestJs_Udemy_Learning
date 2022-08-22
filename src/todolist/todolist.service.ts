import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todolist } from './entities/todolist.entity';

@Injectable()
export class TodolistService {
  constructor(@InjectRepository(Todolist) private repo: Repository<Todolist>) {}
  async findAll(): Promise<Todolist[]> {
    return this.repo.find();
  }

  create(list_name: string) {
    // Check if this list name existing or not
    const todoListExistent = this.repo.find({ list_name });
    if (todoListExistent)
      throw new BadRequestException('This Todo List already existence');
    const todoList = this.repo.create({ list_name });
    return this.repo.save(todoList);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  find(list_name: string) {
    return this.repo.find({ list_name });
  }

  async update(id: number, attrs: Partial<Todolist>) {
    const todoList = await this.findOne(id);
    if (!todoList) {
      throw new NotFoundException('todoList not found');
    }
    Object.assign(todoList, attrs);
    return this.repo.save(todoList);
  }

  async remove(id: number) {
    const todoList = await this.findOne(id);
    if (!todoList) {
      throw new NotFoundException('todoList not found');
    }
    return this.repo.remove(todoList);
  }
}
