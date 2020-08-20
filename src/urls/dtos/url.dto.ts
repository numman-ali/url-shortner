import { Exclude, Expose, Transform } from "class-transformer";
import { Url } from '../models/url.model';
import { domain} from '../constants/short-url-domain.constant';

@Exclude()
export class UrlDto {
  constructor(partial: Partial<Url>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Transform((v) => v && v.toString())
  _id: string

  @Expose()
  longUrl: string;

  @Transform((v, obj) => `${domain}${obj.shortId}`)
  @Expose()
  shortUrl: string;
}
