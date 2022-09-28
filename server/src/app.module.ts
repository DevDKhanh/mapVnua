import { UploadModule } from './modules/upload/upload.module';
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
import { ClassifyModule } from './modules/classify/classify.module';
import { AreaModule } from './modules/area/area.module';
import { LayerModule } from './modules/layer/layer.module';
import { PermissionModule } from './modules/permission/permission.module';
import { DisplayModule } from './modules/\bdisplay/display.module';
@Module({
  imports: [
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
        synchronize: true,
        migrationsRun: true,
        autoLoadEntities: true,
        entities: ['dist/**/*.entity.{ts,js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        retryAttempts: 5,
      }),
    }),
    SharedModule,
    AuthModule,
    SettingModule,
    UploadModule,
    LanguageModule,
    ClassifyModule,
    AreaModule,
    DisplayModule,
    LayerModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
