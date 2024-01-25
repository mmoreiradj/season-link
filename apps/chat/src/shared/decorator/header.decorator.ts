import { IncomingMessage } from 'http';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import CustomHeaders from 'shared/interfaces/custom-headers.iface';

const UserData = createParamDecorator(
  (_, ctx: ExecutionContext): CustomHeaders => {
    const req = ctx.switchToHttp().getRequest<IncomingMessage>();
    const { headers } = req;

    return {
      userId: headers['x-user-id'] as string,
      userRoles: (headers['x-user-roles'] as string).split(','),
    };
  },
);

export default UserData;
