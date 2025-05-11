import { Module } from '@nestjs/common';
import { SongSessionGateway } from './song-session.gateway';
import { SongsService } from '../songs/songs.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  providers: [SongSessionGateway, SongsService, JwtService, JwtStrategy],
})
export class SongSessionModule {}
