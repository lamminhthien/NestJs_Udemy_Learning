import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsEmail()
  @IsOptional()
  task_name: string;
}
