import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  public clientConnectionMessage() {
    console.log('Meh');
  }
}
