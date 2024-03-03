import {Module} from '@nestjs/common';
import {AuthenticationController} from './authentication.controller';
import {AuthenticationService} from './authentication.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Users} from '../typeorm';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';
import jwtConfig from '../../libs/jwt.config';
import {jwtConstants} from '../../const/const';

const ENV_USERS_FILE_PATH = '.env.development';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '7d'}
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule {
}
