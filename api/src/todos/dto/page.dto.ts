import { PageMetadataDto } from './page-metadata.dto';
import { IsArray } from 'class-validator';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly metadata: PageMetadataDto;

  constructor(data: T[], metadata: PageMetadataDto) {
    this.data = data;
    this.metadata = metadata;
  }
}
