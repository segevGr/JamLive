import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SongData } from '../songs/song.interface';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({ cors: true })
export class SongSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('SongSessionGateway');

  // current active session state
  private currentSong: SongData | null = null;
  private participants: Set<string> = new Set();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.participants.delete(client.id);
  }

  @SubscribeMessage('joinSession')
  handleJoin(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client joined session: ${client.id}`);
    this.participants.add(client.id);

    if (this.currentSong) {
      client.emit('startSong', this.currentSong);
    }
  }

  @SubscribeMessage('startSong')
  handleStartSong(
    @MessageBody() payload: { song: SongData; token: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const decoded = jwt.verify(
        payload.token,
        process.env.JWT_SECRET || '',
      ) as any;

      if (decoded.role !== 'admin') {
        this.logger.warn(`❌ Unauthorized user tried to start song`);
        return;
      }

      this.logger.log(
        `✅ Admin ${decoded.userName} started song: ${payload.song.title}`,
      );

      this.currentSong = payload.song;

      for (const participantId of this.participants) {
        const socket = this.server.sockets.sockets.get(participantId);
        if (socket) {
          socket.emit('startSong', payload.song);
        }
      }
    } catch (err) {
      this.logger.error('Invalid token in startSong');
    }
  }

  @SubscribeMessage('quitSession')
  handleQuitSession(@ConnectedSocket() client: Socket) {
    this.logger.log(`Session quit by ${client.id}`);
    this.currentSong = null;
    this.participants.clear();

    this.server.emit('sessionEnded');
  }
}
