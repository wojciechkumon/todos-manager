import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { createAuthorizationHeader, initTestAppFromModule } from './e2e-utils';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import * as request from 'supertest';
import { CreateTodoItemDto } from '../src/todos/dto/create-todo-item.dto';
import { Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItem } from '../src/todos/entities/todo-item.entity';
import { TodosModule } from '../src/todos/todos.module';
import { createMock } from '@golevelup/ts-jest';
import { TodoItemDto } from '../src/todos/dto/todo-item.dto';
import { AuthModule } from '../src/auth/auth.module';
import { ErrorResponseDto } from '../src/dto/error-response.dto';

describe('TodosController (e2e)', () => {
  const createTodoEndpoint = '/todos';
  let app: INestApplication;
  let todosRepository: Repository<TodoItem>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodosModule, AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(createMock<Repository<User>>())
      .overrideProvider(getRepositoryToken(TodoItem))
      .useValue(createMock<Repository<TodoItem>>())
      .compile();

    app = await initTestAppFromModule(module, TodosModule);
    todosRepository = module.get<Repository<TodoItem>>(
      getRepositoryToken(TodoItem),
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  afterAll(() => app.close());

  describe(`POST ${createTodoEndpoint}`, () => {
    const createTodoItemDto: CreateTodoItemDto = {
      content: 'content',
    };

    test('successful todo item creation', async () => {
      const id = '91a21263-cb04-4f1a-b45f-a0ad29a04edc';
      const createdAtString = '2024-03-15T23:14:16.018Z';
      const createdAt = new Date(createdAtString);
      (todosRepository.insert as jest.Mock).mockResolvedValue({
        identifiers: [{ id }],
        generatedMaps: [{ id, createdAt }],
        raw: [{ id, created_at: createdAt }],
      } satisfies InsertResult);

      return request(app.getHttpServer())
        .post(createTodoEndpoint)
        .set('Authorization', await createAuthorizationHeader(jwtService))
        .send(createTodoItemDto)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          const body: TodoItemDto = response.body;
          expect(body.content).toEqual(createTodoItemDto.content);
          expect(body.id).toEqual(id);
          expect(body.created_at).toEqual(createdAtString);
        });
    });

    it('should return 400 bad request on empty content', async () => {
      return request(app.getHttpServer())
        .post(createTodoEndpoint)
        .set('Authorization', await createAuthorizationHeader(jwtService))
        .send({ content: '' } satisfies CreateTodoItemDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: ['content should not be empty'],
        } satisfies ErrorResponseDto);
    });

    it('should return 401 unauthorized on wrong token', () => {
      return request(app.getHttpServer())
        .post(createTodoEndpoint)
        .set('Authorization', 'Bearer wrongToken')
        .send(createTodoItemDto)
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        } satisfies ErrorResponseDto);
    });

    it('should return 500 internal server error on database error', async () => {
      (todosRepository.insert as jest.Mock).mockRejectedValue(
        new Error('unexpected'),
      );

      return request(app.getHttpServer())
        .post(createTodoEndpoint)
        .set('Authorization', await createAuthorizationHeader(jwtService))
        .send(createTodoItemDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .expect({
          statusCode: 500,
          message: 'Internal server error',
        } satisfies ErrorResponseDto);
    });
  });
});
