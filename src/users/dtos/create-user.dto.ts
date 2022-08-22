import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User Name length must be from 20 to 50 character',
    minLength: 20,
    maxLength: 50,
  })

  @MinLength(20, {
    message: 'Uername must at least 20 character',
  })
  @MaxLength(50, {
    message: 'Username cannot be exceed 50 character',
  })
  @IsString()
  user_name: string;
}
