import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {Users} from '../typeorm';
import {compare, genSalt, hash} from 'bcryptjs';
import {LoginUserDto} from './dto/login-user.dto';
import {User} from '../../types/user';
import {TokenPayload} from '../../types/token-payload';
import {JwtService} from '@nestjs/jwt';
import {SALT_ROUNDS} from '../../const/const';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  passwordHash: string;

  public async createNewUser(createUserDto: CreateUserDto) {
    const {name, email, role, jobTitle, password} = createUserDto;

    const existUser = await this.userRepository.find({
      where: {email: email},
    });

    if (existUser.length) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }

    const hashPassword = await this.setPassword(password);
    const userData = {name, email, role, jobTitle, password: hashPassword};

    const newUser = this.userRepository.create(userData);

    await this.userRepository.save(newUser);
    return {name: newUser.name};
  }

  public async verifyUser(loginUserDto: LoginUserDto): Promise<any> {
    const {email, password} = loginUserDto;

    const existUser = await this.userRepository.find({
      where: {email: email},
    });

    if (!existUser.length) {
      throw new NotFoundException(
        `Пользователя с почтой ${email} не существует.`,
      );
    }

    this.passwordHash = existUser[0].password;

    if (!(await this.comparePassword(password))) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return {...existUser[0]};
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    return (this.passwordHash = await hash(password, salt));
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  public async findUserById({
    id,
  }: {
    id: string;
  }): Promise<Omit<Users, 'createdAt' | 'password'>> {
    const currentUser = await this.userRepository.findOneBy({id: id});
    const {password, createdAt, ...userResponse} = currentUser;

    if (!currentUser) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return userResponse;
  }

  public async checkUserModerate({id}: {id: string}) {
    const currentUser = await this.userRepository.findOneBy({id: id});
    if (currentUser.role !== 'moderator') {
      throw new HttpException('Не доступно', HttpStatus.METHOD_NOT_ALLOWED);
    }

    return currentUser;
  }
}
