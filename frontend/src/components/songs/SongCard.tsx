import { Music } from "lucide-react";
import { Song } from "types";
import { CardContainer } from "components";

interface Props {
  song: Song;
  onSelect: (id: string) => void;
}

const backendBaseUrl =
  process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const SongCard = ({ song, onSelect }: Props) => {
  return (
    <CardContainer
      onClick={() => onSelect(song.id)}
      className="px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        {song.image ? (
          <img
            src={`${backendBaseUrl}${song.image}`}
            alt={song.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-primary text-xl">
            ♫
          </div>
        )}
        <span className="text-lg font-medium">
          {song.title} – {song.artist}
        </span>
      </div>
      <Music size={20} className="text-primary" />
    </CardContainer>
  );
};

export default SongCard;
