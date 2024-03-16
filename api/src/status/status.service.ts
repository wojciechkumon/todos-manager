import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StatusDto } from './dto/Status.dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class StatusService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getStatus(): Promise<StatusDto> {
    try {
      await this.dataSource.query<{ status: number }[]>('SELECT 1 as status');
    } catch (error) {
      throw new InternalServerErrorException('No connection with the database');
    }

    return { status: 'OK' };
  }
}
