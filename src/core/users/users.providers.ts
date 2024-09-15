import { Connection } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model(User.name, UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
