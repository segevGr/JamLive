import { SongSearch, LiveSessionView, LiveSessionWaiting } from "components";
import type { Song, UserRole, Instrument, ViewMode } from "types";
import { useTranslation } from "react-i18next";

interface Props {
  role: UserRole;
  instrument: Instrument;
  viewMode: ViewMode;
  browseSong: Song | null;
  activeSong: Song | null;
  showLiveView: boolean;
  onStartSession: (songId: string) => void;
  onQuitLive?: () => void;
  onSelectBrowse: (songId: string) => void;
  onQuitBrowse: () => void;
}

const LobbyContent = ({
  role,
  instrument,
  viewMode,
  browseSong,
  activeSong,
  showLiveView,
  onStartSession,
  onQuitLive,
  onSelectBrowse,
  onQuitBrowse,
}: Props) => {
  const { t } = useTranslation();
  const titleMode = browseSong || showLiveView ? "active" : "inactive";

  return (
    <div className="flex flex-col flex-grow min-h-0">
      <h2 className="text-base md:text-xl font-semibold text-primary text-center mt-5 ">
        {t(
          `lobbyHeader.${
            role as Exclude<UserRole, null>
          }.${titleMode}.${viewMode}`
        )}
      </h2>

      {viewMode === "browse" ? (
        browseSong ? (
          <LiveSessionView
            key={browseSong.id}
            song={browseSong}
            instrument={instrument}
            role={role}
            onQuit={onQuitBrowse}
            mode="browse"
          />
        ) : (
          <SongSearch onSelect={onSelectBrowse} />
        )
      ) : showLiveView && activeSong ? (
        <LiveSessionView
          key={activeSong.id}
          song={activeSong}
          instrument={instrument}
          role={role}
          onQuit={onQuitLive}
          mode="live"
        />
      ) : role === "admin" ? (
        <SongSearch onSelect={onStartSession} />
      ) : (
        <LiveSessionWaiting />
      )}
    </div>
  );
};

export default LobbyContent;
