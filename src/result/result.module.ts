import {ResultService} from './result.service';
import {ResultController} from './result.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EducationModule, Results} from '../typeorm';
import {Module} from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Results]),
    TypeOrmModule.forFeature([EducationModule]),
  ],
  providers: [ResultService],
  controllers: [ResultController]
})
export class ResultModule {
}
