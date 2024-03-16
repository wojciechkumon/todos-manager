import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatusDto } from './dto/Status.dto';
import { StatusService } from './status.service';

@Controller('status')
@ApiTags('Status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The server is running',
    type: StatusDto,
  })
  getStatus(): Promise<StatusDto> {
    return this.statusService.getStatus();
  }
}
