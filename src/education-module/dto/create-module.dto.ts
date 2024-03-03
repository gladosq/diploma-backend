import { IsNotEmpty, MinLength } from "class-validator";
import {ApiProperty} from '@nestjs/swagger';
import {DifficultyModuleEnum, JobTitleEnum} from '../../../types/enum';

export class CreateModuleDto {
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
}