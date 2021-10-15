import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { ParamsIdDto } from './dto/params-id.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param() params: ParamsIdDto) {
    return this.studentsService.findOne(params.id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param() params: ParamsIdDto,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(params.id, updateStudentDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: string) {
    return this.studentsService.remove(params);
  }
}
