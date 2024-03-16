import { PageOptionsDto } from './page-options.dto';

export class PageMetadataDto {
  readonly pageNumber: number;

  readonly pageSize: number;

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor(pageOptionsDto: PageOptionsDto, itemCount: number) {
    this.pageNumber = pageOptionsDto.pageNumber;
    this.pageSize = pageOptionsDto.pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage =
      this.pageNumber > 1 && this.pageNumber <= this.pageCount + 1;
    this.hasNextPage = this.pageNumber < this.pageCount;
  }
}
