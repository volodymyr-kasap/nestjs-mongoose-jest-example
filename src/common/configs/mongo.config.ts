import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';


export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      const uri = configService.getOrThrow('MONGO_URL');
      return {
        uri,
      };
    },
  };
};
