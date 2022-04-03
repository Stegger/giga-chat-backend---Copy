import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Model } from 'mongoose';
import { Match } from './entities/match.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class MatchesService {
  constructor(
    @Inject('MATCH_MODEL') private readonly matchModel: Model<Match>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public updateMatchInCache(value: Match) {
    this.cacheManager.set<Match>(value.userUUID, value, {
      ttl: 600,
    });
  }

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = await this.matchModel
      .findOne<Match>({
        userUUID: createMatchDto.userMatchSenderUUID,
      })
      .exec();
    if (match) {
      if (createMatchDto.isAMatch) {
        return this.matchModel
          .findOneAndUpdate(
            {
              userUUID: createMatchDto.userMatchSenderUUID,
            },
            {
              $push: { likes: createMatchDto.userMatchReceiverUUID },
            },
          )
          .exec();
      } else {
        return this.matchModel
          .findOneAndUpdate(
            {
              userUUID: createMatchDto.userMatchSenderUUID,
            },
            {
              $push: { disLikes: createMatchDto.userMatchReceiverUUID },
            },
          )
          .exec();
      }
    } else {
      const likes = [];
      const dislike = [];
      if (createMatchDto.isAMatch) {
        likes.push(createMatchDto.userMatchReceiverUUID);
      } else {
        dislike.push(createMatchDto.userMatchReceiverUUID);
      }
      return this.matchModel.create({
        userUUID: createMatchDto.userMatchSenderUUID,
        likes: likes,
        disLikes: dislike,
      });
    }
  }

  findAll() {
    return `This action returns all matches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
