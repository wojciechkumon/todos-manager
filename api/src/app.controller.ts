import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatusDto } from './dto/Status.dto';

@Controller()
@ApiTags('Status')
export class AppController {
  @Get('status')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The server is running',
    type: StatusDto,
  })
  getStatus(): StatusDto {
    return { status: 'OK' };
  }
}
