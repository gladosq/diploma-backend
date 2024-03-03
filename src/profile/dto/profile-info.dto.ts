import {IsUUID} from 'class-validator';

export class ProfileInfoDto {
  @IsUUID(undefined, {each:true})
  id!: string;
}
