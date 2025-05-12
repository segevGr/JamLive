import SongCard from "./SongCard";

interface Song {
  id: string;
  title: string;
  artist: string;
  image?: string;
}

interface SongListProps {
  songs: Song[];
  query: string;
  onSelect: (id: string) => void;
}

export default function SongList({ songs, query, onSelect }: SongListProps) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return null;
  }

  if (songs.length === 0) {
    return (
      <div className="text-center mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No results found
        </h2>
        <p className="text-sm text-muted">
          Try searching for a different song or artist.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Search Results
      </h2>
      <div className="space-y-3">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
