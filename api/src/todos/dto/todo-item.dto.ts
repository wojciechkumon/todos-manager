import { ApiProperty } from '@nestjs/swagger';

export class TodoItemDto {
  @ApiProperty({ example: '08f33151-e5fe-415c-8b30-ecc03d0281a7' })
  id: string;

  @ApiProperty({ example: 'Item content' })
  content: string;

  @ApiProperty({ example: '2024-03-15T16:29:37.616Z' })
  createdAt: Date;
}
