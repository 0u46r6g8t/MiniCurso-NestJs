import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { RemoveSubscriptionDto } from './dto/remove-subscription.dto';
import { StudentsService } from './students.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('students/subescriptions')
export class SubscriptionController {
  constructor(private readonly studentsService: StudentsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.studentsService.createSubscription(createSubscriptionDto);
  }

  // @UsePipes(new ValidationPipe())
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Body() removeSubscriptionDto: RemoveSubscriptionDto) {
    return this.studentsService.removeSubscription(removeSubscriptionDto);
  }
}
