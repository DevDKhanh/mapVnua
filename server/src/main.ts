import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

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
  const configDocs = new DocumentBuilder()
    .setTitle('Api map  ')
    .setDescription('Vnua team')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Backend')
    .build();
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(PORT);
  console.log('App Running On Port : ' + PORT);
}
bootstrap();
