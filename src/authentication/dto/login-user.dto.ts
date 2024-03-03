import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: 'Некорректная почта' })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345'
  })
  @IsString()
  public password: string;
}
