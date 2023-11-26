import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  let config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,Access-Control-Allow-Headers,Origin,Authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  });
  const PORT = config.get<number>('PORT');
  const PRODUCT: string = config.get<string>('NODE_ENV');
  if (PRODUCT !== 'production') {
    const configDocs = new DocumentBuilder()
      .setTitle('Api map  ')
      .setDescription('Vnua team')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Backend')
      .build();
    const document = SwaggerModule.createDocument(app, configDocs);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        docExpansion: 'none',
      },
    });
  }
  await app.listen(PORT);
  console.log('App Running On Port : ' + PORT);
}
bootstrap();
