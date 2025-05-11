import { Module } from '@nestjs/common';
import { SongSessionGateway } from './song-session.gateway';

@Module({
  providers: [SongSessionGateway],
})
export class SongSessionModule {}
