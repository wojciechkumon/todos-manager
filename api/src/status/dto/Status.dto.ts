import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty({ example: 'OK' })
  status: 'OK';
}
