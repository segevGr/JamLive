import { Injectable, NotFoundException } from '@nestjs/common';
import songsData from './songs.json';
import { Song } from './song.interface';

@Injectable()
export class SongsService {
  private songs: Song[] = songsData as Song[];

  search(query: string): Song[] {
    const lowerQuery = query.toLowerCase();
    return this.songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery),
    );
  }

  getById(id: string): Song {
    const song = this.songs.find((s) => s.id === id);
    if (!song) throw new NotFoundException('Song not found');
    return song;
  }
}
