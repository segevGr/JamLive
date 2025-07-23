import { useCallback } from "react";
import { Navbar, SongSearch, LiveSessionView, Dialog } from "components";
import { usePageTitle, useSessionManager } from "hooks";
import { API, axiosInstance } from "services";
import { setCurrentSong, useAppDispatch, useAppSelector } from "store";
import { useSocket } from "context/SocketProvider";
import type { Song } from "types";
import { useTranslation } from "react-i18next";

export default function AdminLobby() {
  const { t } = useTranslation();
  usePageTitle(t("AdminLobby.pageTitle"));

  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth);
  const viewMode = useAppSelector((state) => state.ui.mode);
  const instrument = useAppSelector((state) => state.auth.instrument);
  const { socket } = useSocket();

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

  const onSelect = viewMode === "live" ? handleStartSession : () => {};

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar showSwitch={true} />
      {viewMode === "live" ? (
        showLiveView && activeSong ? (
          <LiveSessionView
            key={activeSong?.id}
            song={activeSong}
            instrument={instrument!}
            role={role}
            onQuit={handleQuit}
          />
        ) : (
          <SongSearch onSelect={onSelect} />
        )
      ) : (
        <SongSearch onSelect={onSelect} />
      )}

      <Dialog {...dialogProps} />
    </div>
  );
}
