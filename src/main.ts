import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseExceptionFilter())
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get('app.port');

  if (configService.get('app.env') !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('URL Shortner API')
      .setDescription(`This is the backend API which deals with saving and handling shortened URLs.`)
      .setVersion('1.0')
      .addBearerAuth({
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Log into the Producer App. Get the token from cookies under auth_jwt_token. Remove "Bearer%20" before adding.' },
        'Producer JWT Token')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);
  }

  await app.listen(port);
}
bootstrap();
