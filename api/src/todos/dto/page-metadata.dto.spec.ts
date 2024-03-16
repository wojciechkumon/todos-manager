import { PageOptionsDto } from './page-options.dto';
import { PageMetadataDto } from './page-metadata.dto';

describe('PageMetadataDto', () => {
  it.each([
    [
      { pageSize: 10, pageNumber: 1, skip: 0 },
      0,
      {
        pageSize: 10,
        pageNumber: 1,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      } satisfies PageMetadataDto,
    ],
    [
      { pageSize: 10, pageNumber: 1, skip: 0 },
      15,
      {
        pageSize: 10,
        pageNumber: 1,
        itemCount: 15,
        pageCount: 2,
        hasPreviousPage: false,
        hasNextPage: true,
      } satisfies PageMetadataDto,
    ],
    [
      { pageSize: 10, pageNumber: 2, skip: 10 },
      15,
      {
        pageSize: 10,
        pageNumber: 2,
        itemCount: 15,
        pageCount: 2,
        hasPreviousPage: true,
        hasNextPage: false,
      } satisfies PageMetadataDto,
    ],
    [
      { pageSize: 10, pageNumber: 3, skip: 10 },
      15,
      {
        pageSize: 10,
        pageNumber: 3,
        itemCount: 15,
        pageCount: 2,
        hasPreviousPage: true,
        hasNextPage: false,
      } satisfies PageMetadataDto,
    ],
    [
      { pageSize: 10, pageNumber: 4, skip: 10 },
      15,
      {
        pageSize: 10,
        pageNumber: 4,
        itemCount: 15,
        pageCount: 2,
        hasPreviousPage: false,
        hasNextPage: false,
      } satisfies PageMetadataDto,
    ],
  ])(
    'should compute values based on input',
    (
      pageOptionsDto: PageOptionsDto,
      itemCount: number,
      expectedOutput: PageMetadataDto,
    ) => {
      expect(new PageMetadataDto(pageOptionsDto, itemCount)).toEqual(
        expectedOutput,
      );
    },
  );
});
