import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {AuthGuard} from '../../libs/auth.guard';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('user')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    await this.authenticationService.checkUserModerate({id: req.profile.sub});
    return this.authenticationService.createNewUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return this.authenticationService.findUserById({id: req.profile.sub});
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const verifiedUser = await this.authenticationService.verifyUser(loginUserDto);
    const loggedUser = await this.authenticationService.createUserToken(verifiedUser);
    const {password, ...newResponse} = verifiedUser;
    return {...newResponse, ...loggedUser};
  }
}
