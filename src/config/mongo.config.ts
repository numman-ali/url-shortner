import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export const mongoConfig = registerAs('mongo', () => ({
  uri: process.env.MONGO_URI,
}));

export const mongoConfigValidation = {
  MONGO_URI: Joi.string().default('mongodb://127.0.0.1:27017/url-shortner'),
};
