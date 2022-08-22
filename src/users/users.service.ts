import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async create(user_name: string): Promise<User> {
    // Check if this username existing or not
    const user = this.repo.create({ user_name });

    return this.repo.save(user);
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  find(user_name: string) {
    return this.repo.find({ user_name });
  }

  async update(id: string, user_name: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.user_name = user_name;
    // Object.assign(user, attrs);
    // return this.repo.save(user);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
