import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EducationModule, Results} from '../typeorm';
import {Repository} from 'typeorm';
import {CreateResultDto} from './dto/create-result.dto';

type QuestionType = {
  question: string;
  variant1: string;
  variant2: string;
  variant3: string;
  variant4: string;
  correctAnswer: string;
}

type ModuleType = {
  module: {
    isPublished: boolean;
  };
}

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Results)
    private readonly resultsRepository: Repository<Results>,
    @InjectRepository(EducationModule)
    private readonly educationModuleRepository: Repository<EducationModule>,
  ) {
  }

  async getResultsList(id: string) {
    return await this.resultsRepository.createQueryBuilder('results')
      .leftJoinAndSelect('results.module', 'module')
      .leftJoinAndSelect('results.user', 'user')
      .where('user.id =:id', {id: id})
      .addSelect('user.password', 'password')
      .addSelect('module.isPublished', 'isPublished')
      .getMany();
  }

  async getResultItem(id: string) {
    return await this.resultsRepository.createQueryBuilder('result')
      .where('result.id =:id', {id: id})
      .leftJoinAndSelect('result.module', 'module')
      .leftJoinAndSelect('result.user', 'user')
      .addSelect('user.password', 'password')
      .getMany();
  }

  async createResult(createResultDto: CreateResultDto, userId: string) {
    const existingModule = await this.educationModuleRepository.findOneBy({id: createResultDto.moduleId});
    if (!existingModule) {
      throw new NotFoundException('Модуль не существует или был удален');
    }

    const correctResults = createResultDto.result.reduce((acc, current, index) => {
      const testing = existingModule.testing[index] as QuestionType;
      const result = {userAnswer: current, correctAnswer: Number(testing.correctAnswer)}
      acc.push(result);
      return acc;
    }, []);

    const result = new Results();
    result.user = userId;
    result.module = createResultDto.moduleId;
    result.result = correctResults;

    const createdResult = await this.resultsRepository.save(result);
    if (!createdResult) throw new NotFoundException('Результат не найден');
    return {id: createdResult.id};
  }
}