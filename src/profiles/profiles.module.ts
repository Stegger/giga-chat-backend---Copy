import { CacheModule, Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { MongodbModule } from '../infrastructure/mongo/mongodb.module';
import { ProfileProvider } from '../infrastructure/mongo/profile.provider';

@Module({
  imports: [CacheModule.register(), MongodbModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, ...ProfileProvider],
})
export class ProfilesModule {}
