import {Module} from '@nestjs/common';
import {EducationModuleService} from './education-module.service';
import {EducationModuleController} from './education-module.controller';
import {EducationModule, Users} from '../typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthenticationService} from '../authentication/authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EducationModule]),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [EducationModuleService, AuthenticationService],
  controllers: [EducationModuleController]
})
export class EducationModuleModule {}
