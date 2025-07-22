import { LoadingSpinner, SongCard } from "components";
import type { Song } from "types";
import { useTranslation } from "react-i18next";

interface SongListProps {
  songs: Song[];
  query: string;
  onSelect: (id: string) => void;
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  isLoading?: boolean;
  isSearching?: boolean;
}

export default function SongList({
  songs,
  query,
  onSelect,
  loadMoreRef,
  isLoading = false,
  isSearching = false,
}: SongListProps) {
  const { t } = useTranslation();
  const trimmedQuery = query.trim();

  if (!trimmedQuery && songs.length === 0) {
    return isSearching ? (
      <div className="text-center mt-10">
        <LoadingSpinner size="sm" text={t("songList.loading")} />
      </div>
    ) : (
      <div className="text-center mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {t("songList.noResultsTitle")}
        </h2>
        <p className="text-sm text-muted">{t("songList.noResultsSubtitle")}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {trimmedQuery
          ? t("songList.searchResultsTitle")
          : t("songList.songListTitle")}
      </h2>
      <div className="space-y-3">
        {songs.length === 0 && !isSearching ? (
          <div className="text-center">
            <p>{t("songList.noSongsFallback")}</p>
          </div>
        ) : (
          songs.map((song) => (
            <SongCard key={song.id} song={song} onSelect={onSelect} />
          ))
        )}

        <div className="flex flex-col items-center" ref={loadMoreRef}>
          {isLoading && (
            <LoadingSpinner size="sm" text={t("songList.loadingMore")} />
          )}
        </div>
      </div>
    </div>
  );
}
