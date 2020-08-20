import { Test, TestingModule } from '@nestjs/testing';
import { InjectModel, TypegooseModule } from 'nestjs-typegoose';
import { Url } from './url.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigModule } from '../../config/custom-config.module';
const { Types: { ObjectId } } = mongoose;

@Injectable()
export class TestService {
  constructor(@InjectModel(Url) private readonly urlModel: ReturnModelType<typeof Url>) {}
  async create(url: string, userId: string): Promise<Url> {
    return await this.urlModel.create({ longUrl: url, userId });
  }
}

describe('UrlModel', () => {
  let service: TestService;
  let document;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CustomConfigModule,
        TypegooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get('mongo.uri'),
            useNewUrlParser: true,
            useUnifiedTopology: true
          }),
          inject: [ConfigService]
        }),
        TypegooseModule.forFeature([Url])
      ],

      providers: [TestService],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Creating a document', () => {
    beforeAll(async () => {
      const userId = (new ObjectId()).toString();
      const url = 'https://google.com';
      document = await service.create(url, userId);
    });

    it('should save a new document', async () => {
      expect(document.toObject()).toEqual(expect.objectContaining({
        _id: expect.any(mongoose.Types.ObjectId),
        longUrl: expect.any(String),
        userId: expect.any(mongoose.Types.ObjectId),
        shortId: expect.any(String),
        __v: expect.any(Number)
      }))
    })

    it('should have a shortId of 8 alphanumeric lowercase characters', async () => {
      expect(document.shortId).toStrictEqual(expect.stringMatching(/^[a-zA-Z0-9]{8,}$/));
    });
  })

  afterAll(async () => {
    await mongoose.disconnect();
  })
});
