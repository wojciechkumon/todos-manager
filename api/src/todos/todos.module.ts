import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './entities/todo-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
