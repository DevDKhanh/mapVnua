import { MailerModule } from '@nestjs-modules/mailer';
import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { envValidate } from 'src/common/config/env.validation';
import { AllExceptionsFilter } from 'src/common/config/exceptions.filter';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      validate: envValidate,
    }),
    WinstonModule.forRoot({
      transports: [
        new DailyRotateFile({
          filename: '/%DATE%-result.log',
          datePattern: 'YYYY-MM-DD',
          dirname: process.cwd() + '/logs',
          handleExceptions: true,
          json: false,
          zippedArchive: true,
        }),
      ],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, './../i18n/'),
        watch: true,
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          service: 'gmail',
          secure: false,
          auth: {
            user: config.get<string>('GMAIL_ACCOOUNT'),
            pass: config.get<string>('GMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: 'App <duykhanh@gmail.com>',
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ConfigService,
  ],
  exports: [JwtModule, ConfigService],
})
export class SharedModule {}
