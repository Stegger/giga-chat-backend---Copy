import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Model } from 'mongoose';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(@Inject('PROFILE_MODEL') private profileModel: Model<Profile>) {}

  create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const createdProfile = new this.profileModel(createProfileDto);
    return createdProfile.save();
  }

  findByGender(gender: string): Promise<Profile[]> {
    return this.profileModel
      .find({
        gender: gender,
      })
      .exec();
  }

  findAll() {
    return this.profileModel.find().exec();
  }
}
