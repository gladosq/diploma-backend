import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CreateResultDto {
  @ApiProperty({type: 'string', format: 'string', required: false})
  @IsNotEmpty()
  moduleId: string;

  @ApiProperty({type: [String], required: true})
  @IsNotEmpty()
  result: [];
}