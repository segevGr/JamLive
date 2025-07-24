import { SongSearch, LiveSessionView, LiveSessionWaiting } from "components";
import type { Song, UserRole, Instrument } from "types";

interface Props {
  role: UserRole;
  instrument: Instrument;
  viewMode: "live" | "browse";
  browseSong: Song | null;
  activeSong: Song | null;
  showLiveView: boolean;
  onStartSession: (songId: string) => void;
  onQuitLive?: () => void;
  onSelectBrowse: (songId: string) => void;
  onQuitBrowse: () => void;
}

export default function LobbyContent({
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
}: Props) {
  if (viewMode === "browse") {
    return browseSong ? (
      <LiveSessionView
        key={browseSong.id}
        song={browseSong}
        instrument={instrument!}
        role={role}
        onQuit={onQuitBrowse}
        mode={viewMode}
      />
    ) : (
      <SongSearch onSelect={onSelectBrowse} />
    );
  } else {
    if (showLiveView && activeSong) {
      return (
        <LiveSessionView
          key={activeSong.id}
          song={activeSong}
          instrument={instrument}
          role={role}
          onQuit={onQuitLive}
          mode="live"
        />
      );
    }

    if (role === "admin") {
      return <SongSearch onSelect={onStartSession} />;
    }

    return <LiveSessionWaiting />;
  }
}
