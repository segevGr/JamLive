import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SongsService {
  private readonly API_BASE = 'https://www.tab4u.com/api/v1';

  async searchSongs(query: string) {
    const { data } = await axios.get(`${this.API_BASE}/search/${encodeURIComponent(query)}`);
    return data.songs.slice(0, 10);
  }

  async getSongById(songId: number) {
    const { data } = await axios.get(`${this.API_BASE}/song/${songId}`);
    return data;
  }
}
