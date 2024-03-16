import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { StatusDto } from './dto/Status.dto';

@Controller()
export class AppController {
  @Get('status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The server is running',
    type: StatusDto,
  })
  getStatus(): StatusDto {
    return { status: 'OK' };
  }
}
