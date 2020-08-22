import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, TypegooseModule } from 'nestjs-typegoose';
import { Url } from './url.model';
import * as mongoose from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigModule } from '../../config/custom-config.module';
const { Types: { ObjectId } } = mongoose;

describe('UrlModel', () => {
  let urlModel: any;
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
    }).compile();

    urlModel = module.get(getModelToken('Url'));
  });

  it('should be defined', () => {
    expect(urlModel).toBeDefined();
  });

  describe('and it', () => {
    beforeAll(async () => {
      const userId = (new ObjectId()).toString();
      const url = 'https://google.com';
      document = await urlModel.create({ longUrl: url, userId });
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

    it('should return URL document', async () => {
      expect((await urlModel.findOne({_id: document._id})).toObject()).toEqual(document.toObject());
    });

    it('should return URL document', async () => {
      expect(await urlModel.deleteOne({_id: document._id })).toEqual({ n: 1, ok: 1, deletedCount: 1 })
    });
  })

  afterAll(async () => {
    await mongoose.disconnect();
  })
});
