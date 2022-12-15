import { PageDto, PageMetaDto, PaginatePageRequestDto } from '$/common/dto/pages';


export class PageMapper {
  public static toPageDto<T> (data: T[], paginatePageDto: PaginatePageRequestDto, itemCount: number): PageDto<T> {
    const dto = new PageDto<T>();

    dto.data = data;
    dto.meta = PageMapper.toPageMeta(paginatePageDto, itemCount);

    return dto;
  }

  private static toPageMeta (paginatePageDto: PaginatePageRequestDto, itemCount: number): PageMetaDto {
    const dto = new PageMetaDto();

    dto.page = paginatePageDto.page;
    dto.take = paginatePageDto.take;
    dto.skip = paginatePageDto.skip;
    dto.itemCount = itemCount;
    dto.pageCount = Math.ceil(dto.itemCount / dto.take);
    dto.hasPreviousPage = dto.page > 1;
    dto.hasNextPage = dto.page < dto.pageCount;

    return dto;
  }
}
