import { useEffect, useState, useCallback } from "react";
import { useModal } from "hooks";
import { useSocket } from "context/SocketProvider";
import { useAppDispatch, setCurrentSong, clearSession } from "store";
import { useTranslation } from "react-i18next";
import type { Song, UserRole } from "types";

interface UseSessionManagerOptions {
  role: UserRole;
}

export default function useSessionManager({ role }: UseSessionManagerOptions) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  const [showLiveView, setShowLiveView] = useState(false);
  const [currentSong, setCurrentSongState] = useState<Song | null>(null);
  const [isOpen, openDialog, closeDialog, dialogData] = useModal();

  const handleStartSong = useCallback(
    (song: Song) => {
      setCurrentSongState(song);
      setShowLiveView(true);
      dispatch(setCurrentSong(song));
    },
    [dispatch]
  );

  const handleSessionEnded = useCallback(() => {
    openDialog({
      type: "info",
      title: t("jam.sessionEndedTitle"),
      message:
        role === "admin"
          ? t("jam.sessionEndedAdmin")
          : t("jam.sessionEndedUser"),
    });
    socket?.emit("joinSession");
    dispatch(setCurrentSong(null));
    setTimeout(() => {
      closeDialog();
      setShowLiveView(false);
      setCurrentSongState(null);
      dispatch(clearSession());
    }, 3000);
  }, [dispatch, closeDialog, openDialog, t, role, socket]);

  // Setup socket listeners for joining, starting a song, and handling session end
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleConnect = () => {
      socket.emit("joinSession");
    };

    socket.connected ? handleConnect() : socket.on("connect", handleConnect);

    socket.on("startSong", handleStartSong);
    socket.on("sessionEnded", handleSessionEnded);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("startSong", handleStartSong);
      socket.off("sessionEnded", handleSessionEnded);
    };
  }, [socket, handleStartSong, handleSessionEnded]);

  return {
    showLiveView,
    activeSong: currentSong,
    dialogProps: { isOpen, ...dialogData },
  };
}
