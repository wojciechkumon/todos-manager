import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { createMock } from '@golevelup/ts-jest';
import { TodoItemDto } from './dto/todo-item.dto';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { AuthenticatedRequest, AuthGuard } from '../auth/auth.guard';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;
  const createTodoItemDto: CreateTodoItemDto = { content: 'Item content' };
  const todoItemDto: TodoItemDto = {
    id: '08f33151-e5fe-415c-8b30-ecc03d0281a7',
    content: createTodoItemDto.content,
    created_at: new Date(),
  };
  const userId = 'user-id';
  const authenticatedRequest = { jwt: { sub: userId } } as AuthenticatedRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: TodosService, useValue: createMock<TodosService>() },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(createMock<AuthGuard>())
      .compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
    const authGuard = module.get<AuthGuard>(AuthGuard);
    (authGuard.canActivate as jest.Mock).mockResolvedValue(true);
  });

  describe('create()', () => {
    it('should be pass user ID to the service', async () => {
      const createTodoMock = (
        todosService.create as jest.Mock
      ).mockResolvedValue(todoItemDto);

      const result = await todosController.create(
        createTodoItemDto,
        authenticatedRequest,
      );

      expect(result).toEqual(todoItemDto);
      expect(createTodoMock).toHaveBeenCalledWith(createTodoItemDto, userId);
    });

    it('should throw on the service rejection', async () => {
      const error = new InternalServerErrorException();
      (todosService.create as jest.Mock).mockRejectedValue(error);

      await expect(() =>
        todosController.create(createTodoItemDto, authenticatedRequest),
      ).rejects.toThrow(error);
    });
  });

  describe('delete()', () => {
    const todoId = 'todo-id';

    it('should be pass user ID to the service', async () => {
      const deleteTodoMock = (
        todosService.delete as jest.Mock
      ).mockResolvedValue(undefined);

      await todosController.delete(todoId, authenticatedRequest);

      expect(deleteTodoMock).toHaveBeenCalledWith(todoId, userId);
    });

    it('should throw on the service rejection', async () => {
      const error = new NotFoundException();
      (todosService.delete as jest.Mock).mockRejectedValue(error);

      await expect(() =>
        todosController.delete(todoId, authenticatedRequest),
      ).rejects.toThrow(error);
    });
  });
});
