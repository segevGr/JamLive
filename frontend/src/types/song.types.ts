export interface Song {
  id: string;
  title: string;
  artist: string;
  image?: string;
  lyrics?: SongLine[][];
}

export interface SongLine {
  lyrics: string;
  chords?: string;
}
