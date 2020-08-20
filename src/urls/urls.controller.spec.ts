import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import * as mongoose from 'mongoose';
import { UrlDto } from './dtos/url.dto';
const { Types: { ObjectId } } = mongoose;

describe('Urls Controller', () => {
  let mockUrlData = {
    shortId: 'abcd1234',
    longUrl: 'https://long.com/abc',
    userId: new ObjectId()
  };
  let urlsController: UrlsController;
  let urlsServiceMock = {
    create: jest.fn(() => (mockUrlData)),
    getAllByUserId: jest.fn(() => ([mockUrlData, mockUrlData])),
    delete: jest.fn()
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [UrlsService]
    }).overrideProvider(UrlsService).useValue(urlsServiceMock)
      .compile();

    urlsController = moduleRef.get<UrlsController>(UrlsController);
  });

  it('should be defined', () => {
    expect(urlsController).toBeDefined();
  });

  describe('shortenUrl', () => {
    it('should return a UrlDto', async () => {
      const req = { user: { _id: new ObjectId() } };
      const url = 'https://google.com';
      expect(await urlsController.shortenUrl(req, url)).toStrictEqual(new UrlDto(mockUrlData));
      expect(urlsServiceMock.create).toHaveBeenCalledWith(url, req.user._id);
    });
  });

  describe('getShortenedUrls', () => {
    it('should return an array of UrlDtos', async () => {
      const req = { user: { _id: new ObjectId() } };
      const result = [new UrlDto(mockUrlData), new UrlDto(mockUrlData)];
      expect(await urlsController.getShortenedUrls(req)).toStrictEqual(result);
      expect(urlsServiceMock.getAllByUserId).toHaveBeenCalledWith(req.user._id);
    });
  });

  describe('deleteUrl', () => {
    it('should call delete on urlsService', async () => {
      const req = { user: { _id: new ObjectId() } };
      const id = new ObjectId();
      await urlsController.deleteUrl(req, id);
      expect(urlsServiceMock.delete).toHaveBeenCalledWith(id);
    });
  });

});
