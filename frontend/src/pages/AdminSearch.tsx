import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Music } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";
interface Song {
  id: string;
  title: string;
  artist: string;
  image?: string;
}

export default function AdminSearch() {
  usePageTitle("Admin Search");
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const url = query.trim()
          ? `/songs/search?q=${encodeURIComponent(query)}`
          : `/songs/search?q=`;
        const res = await axios.get(url);
        setSongs(res.data);
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };

    fetchSongs();
  }, [query]);

  const handleSelectSong = (songId: string) => {
    navigate(`/admin/live/${songId}`);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-textPrimary font-sans">
      <div className="max-w-4xl mx-auto">
        <InputField
          name="search"
          placeholder="Search any song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label="Search"
          //   className="mb-6"
        />

        <h2 className="text-xl font-semibold mb-4">
          {query ? "Search Results" : "Recommended song list"}
        </h2>

        <div className="space-y-3">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
              onClick={() => handleSelectSong(song.id)}
            >
              <div className="flex items-center gap-4">
                {song.image ? (
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-300 flex items-center justify-center text-primary text-xl">
                    ♫
                  </div>
                )}
                <span className="text-lg font-medium">
                  {song.title} – {song.artist}
                </span>
              </div>
              <Music size={20} className="text-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
