import { useEffect } from "react";
import { Navbar, SongSearch, LiveSessionWaiting } from "components";
import { usePageTitle } from "hooks";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch, setCurrentSong } from "store";
import { useSocket } from "context/SocketProvider";

export default function UserLobby() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  const currentSong = useAppSelector((state) => state.songSession.currentSong);

  usePageTitle(t("UserLobby.pageTitle"));

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleConnect = () => {
      socket.emit("joinSession");
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    socket.on("startSong", (songData) => {
      dispatch(setCurrentSong(songData));
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("startSong");
    };
  }, [socket, dispatch]);

  const viewMode = useAppSelector((state) => state.ui.mode);
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      {viewMode === "browse" && <SongSearch onSelect={() => {}} />}

      {viewMode === "live" && !currentSong && <LiveSessionWaiting />}

      {viewMode === "live" && currentSong && (
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <p className="text-xl text-gray-500">
            {t(
              "UserLobby.noActiveSession",
              "No active session. Waiting for admin..."
            )}
          </p>
        </div>
      )}
    </div>
  );
}
