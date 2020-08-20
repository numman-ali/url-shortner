import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Url } from './models/url.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Url]),
  ],
  providers: [UrlsService],
  controllers: [UrlsController]
})
export class UrlsModule {}
