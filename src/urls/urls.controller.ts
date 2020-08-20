import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { Url } from './models/url.model';
import { UrlsService } from './urls.service';
import { UrlDto } from './dtos/url.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async shortenUrl(@Request() req, @Body('url') url: string): Promise<UrlDto> {
    return new UrlDto(await this.urlsService.create(url, req.user._id));
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getShortenedUrls(@Request() req): Promise<UrlDto[]> {
    const urls: Url[] = await this.urlsService.getAllByUserId(req.user._id);
    return urls.map(url => new UrlDto(url));
  }

  @Delete('/:id')
  async deleteUrl(@Request() req, @Param('id') id): Promise<void> {
    return this.urlsService.delete(id);
  }
}
