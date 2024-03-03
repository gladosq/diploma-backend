import {Controller, Get, Param, ParseUUIDPipe, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {ProfileService} from './profile.service';
import {AuthGuard} from '../../libs/auth.guard';
import {AuthenticationService} from "../authentication/authentication.service";

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly authenticationService: AuthenticationService,
  ) {
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findUserById(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.profileService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('/all-users')
  async getAllUsers(@Request() req) {
    await this.authenticationService.checkUserModerate({id: req.profile.sub});
    return this.profileService.getUsersList();
  }
}
