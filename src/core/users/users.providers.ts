import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model(User.name, UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
