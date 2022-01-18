import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],
  providers: [AuthService,ConfigService, JwtStrategy],
  controllers: [AuthController],
  exports:[PassportModule]
})
export class AuthModule {}
