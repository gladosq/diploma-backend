import {
  Body,
  Controller, Delete,
  Get, Param, Patch,
  Post, Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {AuthGuard} from '../../libs/auth.guard';
import {AuthenticationService} from '../authentication/authentication.service';
import {EducationModuleService} from './education-module.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreateModuleDto} from './dto/create-module.dto';
import {UpdateModuleTestingDto} from './dto/update-module.dto';

@ApiTags('Education-modules')
@ApiBearerAuth()
@Controller('education-modules')
export class EducationModuleController {
  constructor(
    private readonly educationModuleService: EducationModuleService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getModulesList(@Request() req) {
    await this.authenticationService.findUserById({id: req.profile.sub});
    return this.educationModuleService.getModulesList();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findModuleById(@Param('id') id: string) {
    return this.educationModuleService.findModuleById(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id/delete')
  async deleteModuleById(@Param('id') id: string) {
    return this.educationModuleService.deleteModuleById(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/update')
  @UsePipes(ValidationPipe)
  async updateModuleById(@Param('id') id: string, @Request() req, @Body() updateModuleTestingDto: UpdateModuleTestingDto) {
    await this.authenticationService.checkUserModerate({id: req.profile.sub});
    return this.educationModuleService.updateModule(updateModuleTestingDto, id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  async createModule(@Body() createModuleDto: CreateModuleDto, @Request() req) {
    await this.authenticationService.checkUserModerate({id: req.profile.sub});
    const module = {...createModuleDto};
    return this.educationModuleService.createModule(module);
  }
}