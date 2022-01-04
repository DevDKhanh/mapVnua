import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { AuthModule } from './modules/auth/auth.module';
import { SettingModule } from './modules/setting/setting.module';
import { LanguageModule } from './modules/language/language.module';
@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: config.get<number>('MYSQL_PORT'),
        database: config.get<string>('MYSQL_DATABASE'),
        username: config.get<string>('MYSQL_USERNAME'),
        password: config.get<string>('MYSQL_PASSWORD'),
        synchronize: config.get<boolean>('MYSQL_SYNC'),
        autoLoadEntities: true,
        entities: ['dist/**/*.entity.{ts,js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        retryAttempts: 5,
      }),
    }),
    AuthModule,
    SettingModule,
    LanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
