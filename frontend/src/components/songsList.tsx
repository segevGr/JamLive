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

  // אם אין חיפוש, להציג את כל השירים
  if (!trimmedQuery && songs.length === 0) {
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
        {trimmedQuery ? "Search Results" : "Song List"}
      </h2>
      <div className="space-y-3">
        {songs.length === 0 ? (
          <div className="text-center">
            <p>No songs found, try a different search.</p>
          </div>
        ) : (
          songs.map((song) => (
            <SongCard key={song.id} song={song} onSelect={onSelect} />
          ))
        )}
      </div>
    </div>
  );
}
