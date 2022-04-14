import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserInfo {
  id: string;
  role: string;
  permission: {
    permissionSeen: boolean;
    permissionEdit: boolean;
    permissionDelete: boolean;
    permissionCreate: boolean;
  };
}
export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
