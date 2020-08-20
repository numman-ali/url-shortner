import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export const appConfig = registerAs('app', () => ({
  dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiryTime: parseInt(process.env.JWT_EXPIRY_TIME, 10)
}));

export const appConfigValidation = {
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(3000),
  HOST: Joi.string().default('localhost'),
  JWT_SECRET: Joi.string().default('secret123'),
  JWT_EXPIRY_TIME: Joi.number().default(43200)
};
