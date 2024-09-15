import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const uri = configService.get<string>('DATABASE_URI');
      return MongooseModule.forRoot(uri);
    },
  },
];
