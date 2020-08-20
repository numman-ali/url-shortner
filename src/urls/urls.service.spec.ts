import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { getModelToken } from 'nestjs-typegoose';
import { Url } from './models/url.model';
import * as mongoose from 'mongoose';
const { Types: { ObjectId } } = mongoose;

const MockUrlData = {
  _id: new ObjectId(),
  shortId: 'abcd1234',
  longUrl: 'https://long.com/abc',
  userId: new ObjectId()
};

const MockUrlDataToObject = {
  toObject() {
    return MockUrlData
  },
};

class UrlModel {
  constructor() {}
  static create = jest.fn(() => MockUrlDataToObject);
  static find = jest.fn(() => {
    return { lean() { return [MockUrlData,MockUrlData] } };
  })
  static deleteOne = jest.fn();
}

describe('UrlsService', () => {
  let mockUrlData = MockUrlData;
  let urlsService: UrlsService;
  let urlModel = UrlModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: getModelToken('Url'),
          useValue: UrlModel
        }
      ],
    }).compile();

    urlsService = module.get<UrlsService>(UrlsService);
  });

  it('should be defined', () => {
    expect(urlsService).toBeDefined();
  });

  describe('create', () => {
    it('should return a lean url object', async () => {
      const userId = (new ObjectId()).toString();
      const url = 'https://google.com';
      expect(await urlsService.create(url, userId)).toStrictEqual(mockUrlData);
      expect(urlModel.create).toHaveBeenCalledWith({ longUrl: url, userId });
    });
  });

  describe('getAllByUserId', () => {
    it('should return an array of Urls', async () => {
      const userId = new ObjectId();
      const result = [mockUrlData, mockUrlData];
      expect(await urlsService.getAllByUserId(userId)).toStrictEqual(result);
      expect(urlModel.find).toHaveBeenCalledWith({ userId });
    });
  });

  describe('delete', () => {
    it('should call deleteOne on urlModel', async () => {
      const id = (new ObjectId()).toString();
      await urlsService.delete(id);
      expect(urlModel.deleteOne).toHaveBeenCalledWith({ _id: id });
    });
  });
});
