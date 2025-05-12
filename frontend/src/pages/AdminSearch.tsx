import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { API } from "../constants/api";
import { axiosInstance } from "../constants/axios";
import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import SongList from "../components/songsList";
import { ROUTES } from "../constants/routes";

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

  const fetchSongs = async (searchTerm: string) => {
    try {
      const url = `${API.SONGS.SEARCH}?query=${encodeURIComponent(searchTerm)}`;
      const res = await axiosInstance.get(url);
      setSongs(res.data);
    } catch (err) {
      console.error("Failed to fetch songs", err);
    }
  };

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      setSongs([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSongs(trimmedQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectSong = (songId: string) => {
    navigate(ROUTES.JAM(songId));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar />

      <div className="px-6 py-10 text-textPrimary font-sans flex-grow">
        <div className="max-w-4xl mx-auto">
          <InputField
            name="search"
            placeholder="Search any song..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            trailingIcon={
              query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-gray-400 hover:text-textMain"
                >
                  ✕
                </button>
              )
            }
          />
          <SongList songs={songs} query={query} onSelect={handleSelectSong} />
        </div>
      </div>
    </div>
  );
}
