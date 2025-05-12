export type SongLine = {
  lyrics: string;
  chords?: string;
};

export interface SongData {
  id: string;
  title: string;
  artist: string;
  image: string;
  lyrics: SongLine[][];
}
