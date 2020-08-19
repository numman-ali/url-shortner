import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { appConfig, appConfigValidation } from './app.config';
import { mongoConfig, mongoConfigValidation } from './mongo.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, mongoConfig],
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        ...appConfigValidation,
        ...mongoConfigValidation
      })
    })
  ]
})

export class CustomConfigModule {}
