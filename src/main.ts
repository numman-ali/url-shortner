import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  const host = configService.get('app.host');
  const dev = configService.get('app.dev');
  if (dev) app.enableCors();

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
  console.log(`Access the client${dev ? '' : ' and server'} app at http://${host}:${dev ? 8080 : port}`)
  if (dev) console.log(`Access the server app at http://${host}:${port}`)

}
bootstrap();
