import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SongsService } from '../songs/songs.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@WebSocketGateway({ cors: true })
@Injectable()
export class SongSessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private sessions: Record<string, Set<string>> = {};
  private activeSongs: Record<string, any> = {}; // sessionId → song

  constructor(
    private readonly songsService: SongsService,
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    for (const sessionId in this.sessions) {
      this.sessions[sessionId].delete(client.id);
    }
  }

  @SubscribeMessage('joinSession')
  handleJoin(
    @MessageBody() data: { sessionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { sessionId } = data;
    if (!this.sessions[sessionId]) this.sessions[sessionId] = new Set();
    this.sessions[sessionId].add(client.id);
    client.join(sessionId);

    return { message: `Joined session ${sessionId}` };
  }

  @SubscribeMessage('sendLyrics')
  handleSendLyrics(
    @MessageBody() data: { sessionId: string; lyrics: string; chords?: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { sessionId, lyrics, chords } = data;
    client.broadcast.to(sessionId).emit('receiveLyrics', { lyrics, chords });
  }

  @SubscribeMessage('startSong')
  async handleStartSong(
    @MessageBody() data: { sessionId: string; songId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.getUserFromSocket(client);
    if (!user || user.role !== 'admin') {
      client.emit('error', { message: 'Only admin can start a song' });
      return;
    }

    let song;
    try {
      song = this.songsService.getById(data.songId);
    } catch {
      client.emit('error', { message: 'Song not found' });
      return;
    }

    this.activeSongs[data.sessionId] = song;

    const server = client.nsp;
    const sockets = await server.in(data.sessionId).fetchSockets();

    for (const s of sockets) {
      const instrument = s.handshake.auth.instrument || '';
      const isSinger =
        instrument.toLowerCase().includes('שירה') ||
        instrument.toLowerCase().includes('vocal');

      const filteredLyrics = song.lyricsChords.map((line: any[]) =>
        line.map((item) => ({
          lyrics: item.lyrics,
          chords: isSinger ? undefined : item.chords,
        })),
      );

      s.emit('startSong', {
        title: song.title,
        artist: song.artist,
        lyricsChords: filteredLyrics,
      });
    }
  }

  @SubscribeMessage('quitSession')
  async handleQuitSession(
    @MessageBody() data: { sessionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.getUserFromSocket(client);
    if (!user || user.role !== 'admin') {
      client.emit('error', { message: 'Only admin can end the session' });
      return;
    }

    delete this.activeSongs[data.sessionId];

    client.nsp.to(data.sessionId).emit('sessionEnded', {
      message: 'The session has been ended by admin',
    });
  }

  private async getUserFromSocket(client: Socket) {
    const token = client.handshake.auth?.token;
    if (!token) return null;

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return await this.jwtStrategy.validate(payload);
    } catch {
      return null;
    }
  }
}
