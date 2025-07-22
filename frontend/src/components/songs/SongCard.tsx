import { Music } from "lucide-react";
import { Song } from "types";

interface Props {
  song: Song;
  onSelect: (id: string) => void;
}

export default function SongCard({ song, onSelect }: Props) {
  return (
    <div
      className="border border-borderCard hover:bg-hoverCard hover:shadow-md transition rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
      onClick={() => onSelect(song.id)}
    >
      <div className="flex items-center gap-4">
        {song.image ? (
          <img
            src={`${process.env.REACT_APP_BASE_URL}${song.image}`}
            alt={song.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg  flex items-center justify-center text-primary text-xl">
            ♫
          </div>
        )}
        <span className="text-lg font-medium">
          {song.title} – {song.artist}
        </span>
      </div>
      <Music size={20} className="text-primary" />
    </div>
  );
}
