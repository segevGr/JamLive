import { useCallback } from "react";
import { Navbar, Dialog, LobbyContent } from "components";
import { usePageTitle, useSessionManager, useBrowseSongManager } from "hooks";
import { API, axiosInstance } from "services";
import { setCurrentSong, useAppDispatch, useAppSelector } from "store";
import { useSocket } from "context/SocketProvider";
import type { Song } from "types";
import { useTranslation } from "react-i18next";

const AdminLobby = () => {
  const { t } = useTranslation();
  usePageTitle(t("AdminLobby.pageTitle"));

  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth);
  const viewMode = useAppSelector((state) => state.ui.mode);
  const instrument = useAppSelector((state) => state.auth.instrument);
  const { socket } = useSocket();

  const { browseSong, handleSelectBrowseSong, handleCloseBrowseSong } =
    useBrowseSongManager();
  const { activeSong, showLiveView, dialogProps } = useSessionManager({
    role,
  });

  const handleStartSession = async (songId: string) => {
    const res = await axiosInstance.get<Song>(API.SONGS.GET_BY_ID(songId));
    const song = res.data;
    socket?.emit("startSong", { song, token });
    dispatch(setCurrentSong(song));
  };

  const handleQuit = useCallback(() => {
    socket?.emit("quitSession");
  }, [socket]);

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
        onStartSession={handleStartSession}
        onQuitLive={handleQuit}
        onSelectBrowse={handleSelectBrowseSong}
        onQuitBrowse={handleCloseBrowseSong}
      />
      <Dialog {...dialogProps} />
    </div>
  );
};

export default AdminLobby;
