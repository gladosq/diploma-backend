import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, MinLength} from 'class-validator';
import {DifficultyModuleEnum} from '../../../types/enum';

export class UpdateModuleArticleDto {
  @ApiProperty({type: 'string', required: false})
  article: [];
}

export class UpdateModuleTestingDto {
  @ApiProperty({type: 'string', format: 'string', required: true})
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @ApiProperty({type: 'string', format: 'string', required: true})
  @IsNotEmpty()
  theme: string;

  @ApiProperty({type: 'string', format: 'string', required: false})
  @IsNotEmpty()
  description: string;

  @ApiProperty({enum: DifficultyModuleEnum, format: 'enum', required: true})
  @IsNotEmpty()
  difficulty?: DifficultyModuleEnum;

  @ApiProperty({type: 'string', required: false})
  testing: [];

  @ApiProperty({type: 'string', required: false})
  article: [];
}