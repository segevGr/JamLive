import { Injectable, NotFoundException } from '@nestjs/common';
import index from './index.json';
import { SongData } from './song.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SongsService {
  private songs: SongData[] = index as SongData[];

  search(query?: string, limit: number = 10, offset: number = 0): SongData[] {
    if (!query || query.trim() === '') {
      return this.songs.slice(offset, offset + limit);
    }

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
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(offset, offset + limit);

    return ranked.map((entry) => entry.song);
  }

  getById(id: string): any {
    const song = this.songs.find((s) => s.id === id);
    if (!song) throw new NotFoundException('Song not found');

    const lyricsPath = path.join(
      process.cwd(),
      'public',
      'songs',
      `${id}.json`,
    );
    if (!fs.existsSync(lyricsPath)) {
      throw new NotFoundException(`Lyrics file for '${id}' not found`);
    }

    const lyricsRaw = fs.readFileSync(lyricsPath, 'utf-8');
    const lyrics = JSON.parse(lyricsRaw);

    return {
      ...song,
      lyrics,
    };
  }
}
