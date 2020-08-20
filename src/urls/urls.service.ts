import { Injectable } from '@nestjs/common';
import { Url } from './models/url.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { mongoose } from "@typegoose/typegoose";

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url) private readonly urlModel: ReturnModelType<typeof Url>) {}

  async create(url: string, userId: string): Promise<Url> {
    const newUrl = await this.urlModel.create({ longUrl: url, userId });
    return newUrl.toObject()
  }

  async getAllByUserId(userId: mongoose.Types.ObjectId): Promise<Url[]> {
    return this.urlModel.find({ userId }).lean();
  }

  async delete(_id: string): Promise<void> {
    await this.urlModel.deleteOne({ _id });
  }
}
