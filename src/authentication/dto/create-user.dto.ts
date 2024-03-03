import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {JobTitleEnum, UserRoleEnum} from '../../../types/enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Уникальный email пользователя',
    example: 'user@mail.ru',
  })
  @IsEmail({}, {message: 'Не корректный e-mail'})
  public email: string;

  @ApiProperty({type: 'string', format: 'string', required: true})
  @IsNotEmpty()
  name: string;

  @ApiProperty({type: 'string', format: 'string', required: true})
  @IsNotEmpty()
  password: string;

  @ApiProperty({enum: JobTitleEnum, format: 'enum', required: false})
  @IsNotEmpty()
  jobTitle: JobTitleEnum;

  @ApiProperty({enum: UserRoleEnum, format: 'enum', required: false})
  @IsNotEmpty()
  role: UserRoleEnum;
}
