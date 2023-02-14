import { CacheModule, Module, CacheStore } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils/index';
import * as redisStore from 'cache-manager-redis-store';
const redisConfig = getConfig('REDIS_CONFIG');
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
      auth_pass: redisConfig.auth,
      db: redisConfig.db,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
