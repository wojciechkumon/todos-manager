import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({ example: 'your_jwt' })
  access_token: string;

  @ApiProperty({ example: 'Bearer' })
  token_type: string;

  @ApiProperty({
    example: 1711191641,
    description: 'Unix timestamp when the token expires in seconds',
  })
  expires: number;
}
