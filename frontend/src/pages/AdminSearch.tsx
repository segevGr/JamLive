import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, Navbar, SongList } from "components";
import { usePageTitle } from "hooks";
import { API } from "constants/api";
import { axiosInstance } from "constants/axios";
import { ROUTES } from "routes";
import { setCurrentSong, useAppDispatch, useAppSelector } from "store";
import { useSocket } from "context/SocketProvider";
import type { Song } from "types/song.types";
import { useTranslation } from "react-i18next";

export default function AdminSearch() {
  const { t } = useTranslation();
  usePageTitle(t("adminSearch.pageTitle"));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { socket } = useSocket();

  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const LIMIT = 10;

  const fetchSongs = useCallback(
    async (
      searchTerm?: string,
      newOffset = 0,
      append = false,
      showSpinner = false
    ) => {
      if (showSpinner) {
        setIsLoading(true);
      } else {
        setIsSearching(true);
      }

      try {
        const url =
          `${API.SONGS.SEARCH}?limit=${LIMIT}&offset=${newOffset}` +
          (searchTerm?.trim()
            ? `&query=${encodeURIComponent(searchTerm)}`
            : "");

        if (showSpinner) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        const res = await axiosInstance.get<Song[]>(url);
        const newSongs = res.data;

        if (append) {
          setSongs((prev) => [...prev, ...newSongs]);
        } else {
          setSongs(newSongs);
        }

        setHasMore(newSongs.length === LIMIT);
        setOffset(newOffset + newSongs.length);
      } catch (err) {
        console.error("Failed to fetch songs", err);
      } finally {
        if (showSpinner) setIsLoading(false);
        else setIsSearching(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchSongs(undefined, 0, false, false);
  }, [fetchSongs]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    setOffset(0);

    const delayDebounce = setTimeout(() => {
      fetchSongs(trimmedQuery, 0, false, false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, fetchSongs]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        fetchSongs(query.trim(), offset, true, true);
      }
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [offset, query, hasMore, isLoading, fetchSongs]);

  const handleSelectSong = async (songId: string) => {
    const selected = songs.find((s) => s.id === songId);
    if (!selected) return;

    const res = await axiosInstance.get<Song>(API.SONGS.GET_BY_ID(songId));
    const fullSong = res.data;

    socket?.emit("startSong", { song: fullSong, token });
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
            placeholder={t("adminSearch.searchPlaceholder")}
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
          <SongList
            songs={songs}
            query={query}
            onSelect={handleSelectSong}
            loadMoreRef={loadMoreRef}
            isLoading={isLoading}
            isSearching={isSearching}
          />
        </div>
      </div>
    </div>
  );
}
