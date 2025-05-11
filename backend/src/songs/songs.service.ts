import { Injectable, NotFoundException } from '@nestjs/common';
import songsData from './songs.json';

@Injectable()
export class SongsService {
  private songs = songsData as any[];

  search(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery),
    );
  }

  getById(id: string) {
    const song = this.songs.find((s) => s.id === id);
    if (!song) throw new NotFoundException('Song not found');
    return song;
  }
}
