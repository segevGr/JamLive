import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { API } from "../constants/api";
import { axiosInstance } from "../constants/axios";
import Navbar from "../components/Navbar";
import SongList from "../components/songsList";
import { ROUTES } from "../routes/routes";
import { setCurrentSong } from "../store/songSessionSlice";
import { useSocket } from "../context/SocketProvider";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import type { SongData } from "../store/songSessionSlice";

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
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { socket } = useSocket();

  const fetchSongs = async (searchTerm?: string) => {
    try {
      const url = searchTerm?.trim()
        ? `${API.SONGS.SEARCH}?query=${encodeURIComponent(searchTerm)}`
        : `${API.SONGS.SEARCH}?limit=15`;
      const res = await axiosInstance.get(url);
      setSongs(res.data);
    } catch (err) {
      console.error("Failed to fetch songs", err);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      fetchSongs();
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSongs(trimmedQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectSong = async (songId: string) => {
    const selected = songs.find((s) => s.id === songId);
    if (!selected) {
      return;
    }

    const res = await axiosInstance.get<SongData>(API.SONGS.GET_BY_ID(songId));
    const fullSong = res.data;

    socket?.emit("startSong", {
      song: fullSong,
      token,
    });

    dispatch(setCurrentSong(fullSong));
    navigate(ROUTES.JAM);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
