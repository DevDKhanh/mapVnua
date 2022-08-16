import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }
  async validate(payload: any) {
    return payload;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.role < 1) {
      throw new ForbiddenException();
    }
    return user;
  }
}
@Injectable()
export class PermisionSeenGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user?.permission?.permissionSeen) {
      return user;
    }

    throw new ForbiddenException();
  }
}
@Injectable()
export class PermisionEditGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user?.permission?.permissionEdit) {
      return user;
    }

    throw new ForbiddenException();
  }
}
@Injectable()
export class PermisionDeleteGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user?.permission?.permissionDelete) {
      return user;
    }

    throw new ForbiddenException();
  }
}
@Injectable()
export class PermisionCreateGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user?.permission?.permissionCreate) {
      return user;
    }

    throw new ForbiddenException();
  }
}
@Injectable()
export class PermisionUploadGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (
      user?.permission?.permissionCreate ||
      user?.permission?.permissionEdit
    ) {
      return user;
    }

    throw new ForbiddenException();
  }
}
