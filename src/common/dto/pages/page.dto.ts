import { PageMetaDto } from './page-meta.dto';


export class PageDto<T> {
  data: T[];

  meta: PageMetaDto;
}
