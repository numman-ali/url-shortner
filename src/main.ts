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

  if (dev) {
    app.enableCors();
    const options = new DocumentBuilder()
      .setTitle('URL Shortner API')
      .setDescription(`This is the backend API which deals with saving and handling shortened URLs.`)
      .setVersion('1.0')
      .addBearerAuth({
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Retrieve a JWT token by making a POST request to "/api/auth/login" route with a valid email and password.' },
        'JWT Token')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);
  }

  await app.listen(port);
  console.log(`Access the client${dev ? '' : ' and server'} app at http://${host}:${dev ? 8080 : port}`)
  if (dev) console.log(`Access the server app at http://${host}:${port}`)

}
bootstrap();
