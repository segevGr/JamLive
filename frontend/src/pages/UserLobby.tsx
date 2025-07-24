import {
  Navbar,
  SongSearch,
  LiveSessionWaiting,
  LiveSessionView,
  Dialog,
} from "components";
import { usePageTitle, useSessionManager, useBrowseSongManager } from "hooks";
import { useAppSelector } from "store";
import { useTranslation } from "react-i18next";

export default function UserLobby() {
  const { t } = useTranslation();
  usePageTitle(t("UserLobby.pageTitle"));

  const viewMode = useAppSelector((state) => state.ui.mode);
  const instrument = useAppSelector((state) => state.auth.instrument);
  const role = useAppSelector((state) => state.auth.role);

  const { browseSong, handleSelectBrowseSong, handleCloseBrowseSong } =
    useBrowseSongManager();
  const { activeSong, showLiveView, dialogProps } = useSessionManager({
    role,
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar showSwitch={true} />

      {viewMode === "browse" &&
        (browseSong ? (
          <LiveSessionView
            key={browseSong.id}
            song={browseSong}
            instrument={instrument!}
            role={role}
            onQuit={handleCloseBrowseSong}
            mode={viewMode}
          />
        ) : (
          <SongSearch onSelect={handleSelectBrowseSong} />
        ))}

      {viewMode === "live" && showLiveView ? (
        <LiveSessionView
          key={activeSong?.id}
          song={activeSong}
          instrument={instrument!}
          role={role}
          mode={viewMode}
        />
      ) : (
        viewMode === "live" && <LiveSessionWaiting />
      )}

      <Dialog {...dialogProps} />
    </div>
  );
}
