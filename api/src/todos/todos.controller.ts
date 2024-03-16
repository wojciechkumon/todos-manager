import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { AuthenticatedRequest, AuthGuard } from '../auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TodoItemDto } from './dto/todo-item.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { ApiPaginatedOkResponse } from '../common/openapi/ApiPaginatedOkResponse';

@Controller('todos')
@ApiTags('Todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
    type: TodoItemDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed.',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiPaginatedOkResponse(TodoItemDto)
  @ApiBadRequestResponse({
    description: 'Validation failed.',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    type: ErrorResponseDto,
  })
  getTodosPage(
    @Query() pageOptionsDto: PageOptionsDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<PageDto<TodoItemDto>> {
    const userId = req.jwt.sub;
    return this.todosService.getTodosPage(pageOptionsDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been successfully registered.',
    type: null,
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found.',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
    type: ErrorResponseDto,
  })
  delete(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    const userId = req.jwt.sub;
    return this.todosService.delete(id, userId);
  }
}
