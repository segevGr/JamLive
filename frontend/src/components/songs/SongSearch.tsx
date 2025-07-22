import { useState, useEffect, useRef, useCallback } from "react";
import { InputField, SongList } from "components";
import { API } from "constants/api";
import { axiosInstance } from "constants/axios";
import type { Song } from "types";
import { useTranslation } from "react-i18next";

interface Props {
  onSelect: (id: string) => void;
}

export default function SongSearch({ onSelect }: Props) {
  const { t } = useTranslation();

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

  // Loads the first batch of songs when the component mounts
  useEffect(() => {
    fetchSongs(undefined, 0, false, false);
  }, [fetchSongs]);

  // Triggers a new search after 500ms of no typing, resets offset
  useEffect(() => {
    const trimmedQuery = query.trim();
    setOffset(0);

    const delayDebounce = setTimeout(() => {
      fetchSongs(trimmedQuery, 0, false, false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, fetchSongs]);

  //Observes the scroll position and loads more songs when the user reaches the bottom of the list
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

    onSelect(songId);
  };

  return (
    <div className="px-6 py-10 text-textPrimary font-sans flex-grow">
      <div className="max-w-4xl mx-auto">
        <InputField
          name="search"
          placeholder={t("searchPlaceholder")}
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
  );
}
