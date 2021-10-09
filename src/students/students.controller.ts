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
import { IParamsIdDTO } from './dto/paramsId.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param() params: IParamsIdDTO,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(params.id, updateStudentDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: IParamsIdDTO) {
    return this.studentsService.remove(params.id);
  }
}
