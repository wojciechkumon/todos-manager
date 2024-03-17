import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string | ValidationErrorMessages[];

  @ApiProperty({ example: 'Bad Request' })
  error?: string;
}

export class ValidationErrorMessages {
  @ApiProperty({ example: 'email' })
  property: string;

  value?: string | number;

  @ApiProperty({ example: { isEmail: 'email must be an email' } })
  constraints: Record<string, string>;

  @ApiProperty({ example: { email: 'value' } })
  target: Record<string, string | number>;

  children: string[];
}
