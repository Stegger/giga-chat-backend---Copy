import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Match } from './entities/match.entity';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MatchesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly matchesService: MatchesService,
  ) {}

  @SubscribeMessage('createMatch')
  create(@MessageBody() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto).then((value) => {
      this.cacheManager.set<Match>(value.userUUID, value, {
        ttl: 600,
      });
      if (createMatchDto.isAMatch) {
        this.cacheManager
          .get<Match>(createMatchDto.userMatchReceiverUUID)
          .then((otherMatch) => {
            if (
              otherMatch?.likes.includes(createMatchDto.userMatchSenderUUID)
            ) {
              this.server.emit(
                'haveMatch',
                createMatchDto.userMatchReceiverUUID +
                  ' and ' +
                  createMatchDto.userMatchSenderUUID +
                  ' likes each other',
              );
            }
          });
      }
    });
  }

  @SubscribeMessage('findAllMatches')
  findAll() {
    return;
    this.matchesService.findAll();
  }

  @SubscribeMessage('findOneMatch')
  findOne(
    @MessageBody()
    id: number,
  ) {
    return this.matchesService.findOne(id);
  }

  @SubscribeMessage('updateMatch')
  update(
    @MessageBody()
    updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchesService.update(updateMatchDto.id, updateMatchDto);
  }

  @SubscribeMessage('removeMatch')
  remove(@MessageBody() id: number) {
    return this.matchesService.remove(id);
  }
}
