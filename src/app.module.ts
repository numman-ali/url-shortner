import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigModule } from './config/custom-config.module';
import { TypegooseModule } from "nestjs-typegoose";
import { ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [
    CustomConfigModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('app.dev') ? [] : [{
          rootPath: join(__dirname, 'client'),
        }];
      },
      inject: [ConfigService]
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongo.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    UrlsModule,
  ],
})
export class AppModule {}
