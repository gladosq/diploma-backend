import {
  Body,
  Controller,
  Get, Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {AuthGuard} from '../../libs/auth.guard';
import {ResultService} from './result.service';
import {CreateResultDto} from './dto/create-result.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@ApiTags('Results')
@ApiBearerAuth()
@Controller('result')
export class ResultController {
  constructor(
    private readonly resultService: ResultService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  @UsePipes(ValidationPipe)
  async getResulItem(@Param('id') id: string) {
    return this.resultService.getResultItem(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  @UsePipes(ValidationPipe)
  async getResultList(@Param('id') id: string) {
    return this.resultService.getResultsList(id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  async createResult(@Body() createResultDto: CreateResultDto, @Request() req) {
    return this.resultService.createResult(createResultDto, req.profile.sub);
  }
}
