import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from '../typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {
  }

  public async getUser(id: string) {
    const currentUser = await this.userRepository.findOneBy({id});

    if (!currentUser) {
      return 'Profile didnt exist';
    }

    return {
      name: currentUser.name,
      email: currentUser.email,
      grade: currentUser.grade,
      jobTitle: currentUser.jobTitle
    };
  }

  public async getUsersList() {
    return this.userRepository.find();
  }
}