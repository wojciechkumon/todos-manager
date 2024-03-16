import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { AuthenticatedRequest, AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TodoItemDto } from './dto/todo-item.dto';
import { ErrorResponseDto } from '../dto/error-response.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully registered.',
    type: TodoItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
    type: ErrorResponseDto,
  })
  create(
    @Body() createTodoDto: CreateTodoItemDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<TodoItemDto> {
    const userId = req.jwt.sub;
    return this.todosService.create(createTodoDto, userId);
  }
}
