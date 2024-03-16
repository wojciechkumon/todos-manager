import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDto } from '../../todos/dto/page.dto';

export const ApiPaginatedOkResponse = <TModel extends Type>(model: TModel) =>
  applyDecorators(
    ApiExtraModels(PageDto),
    ApiOkResponse({
      description: 'Paginated list retrieved successfully',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
