import {
  Navbar,
  SongSearch,
  LiveSessionWaiting,
  LiveSessionView,
  Dialog,
} from "components";
import { usePageTitle, useSessionManager } from "hooks";
import { useAppSelector } from "store";
import { useTranslation } from "react-i18next";

export default function UserLobby() {
  const { t } = useTranslation();
  usePageTitle(t("UserLobby.pageTitle"));

  const viewMode = useAppSelector((state) => state.ui.mode);
  const instrument = useAppSelector((state) => state.auth.instrument);
  const role = useAppSelector((state) => state.auth.role);

  const { activeSong, showLiveView, dialogProps } = useSessionManager({
    role,
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar showSwitch={true} />

      {viewMode === "browse" && <SongSearch onSelect={() => {}} />}

      {viewMode === "live" && showLiveView ? (
        <LiveSessionView
          key={activeSong?.id}
          song={activeSong}
          instrument={instrument!}
          role={role}
        />
      ) : (
        viewMode === "live" && <LiveSessionWaiting />
      )}

      <Dialog {...dialogProps} />
    </div>
  );
}
