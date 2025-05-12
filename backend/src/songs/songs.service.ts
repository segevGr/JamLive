import { Injectable, NotFoundException } from '@nestjs/common';
import index from './songs-list/index.json';
import { Song } from './song.interface';

@Injectable()
export class SongsService {
  private songs: Song[] = index as Song[];

  search(query: string): Song[] {
    const lowerQuery = query.toLowerCase();

    const ranked = this.songs
      .map((song) => {
        const title = song.title.toLowerCase();
        const artist = song.artist.toLowerCase();

        let score = 0;
        if (title === lowerQuery || artist === lowerQuery) {
          score = 3;
        } else if (
          title.startsWith(lowerQuery) ||
          artist.startsWith(lowerQuery)
        ) {
          score = 2;
        } else if (title.includes(lowerQuery) || artist.includes(lowerQuery)) {
          score = 1;
        }

        return { song, score };
      })
      // .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return ranked.map((entry) => entry.song);
  }

  getById(id: string): Song {
    const song = this.songs.find((s) => s.id === id);
    if (!song) throw new NotFoundException('Song not found');
    return song;
  }
}
