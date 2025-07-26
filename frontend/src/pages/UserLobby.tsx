import { Navbar, Dialog, LobbyContent } from "components";
import { usePageTitle, useSessionManager, useBrowseSongManager } from "hooks";
import { useAppSelector } from "store";
import { useTranslation } from "react-i18next";

const UserLobby = () => {
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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar showSwitch={true} />

      <LobbyContent
        role={role}
        instrument={instrument!}
        viewMode={viewMode}
        browseSong={browseSong}
        activeSong={activeSong}
        showLiveView={showLiveView}
        onStartSession={() => {}}
        onSelectBrowse={handleSelectBrowseSong}
        onQuitBrowse={handleCloseBrowseSong}
      />

      <Dialog {...dialogProps} />
    </div>
  );
};

export default UserLobby;
