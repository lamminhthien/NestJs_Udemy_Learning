import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User Name length must be from 10 to 50 character',
    minLength: 10,
    maxLength: 50,
  })
  @MinLength(10, {
    message: 'Uername must at least 10 character',
  })
  @MaxLength(50, {
    message: 'Username cannot be exceed 50 character',
  })
  @IsString()
  user_name: string;
}
