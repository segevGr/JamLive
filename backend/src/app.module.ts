import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SongSessionModule } from './song-session/song-session.module';
import { ConfigModule } from '@nestjs/config';
import { SongSessionGateway } from './song-session/song-session.gateway';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    UsersModule,
    AuthModule,
    SongSessionModule,
    SongsModule,
  ],
  providers: [SongSessionGateway],
})
export class AppModule {}
