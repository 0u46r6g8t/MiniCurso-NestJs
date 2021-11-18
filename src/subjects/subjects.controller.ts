import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IParamsIdDTO } from './dto/paramsId.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param() params: IParamsIdDTO) {
    return this.subjectsService.findOne(params.id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param() params: IParamsIdDTO,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(params.id, updateSubjectDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: IParamsIdDTO) {
    return this.subjectsService.remove(params.id);
  }
}
