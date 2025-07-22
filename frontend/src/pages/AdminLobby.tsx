import { useNavigate } from "react-router-dom";
import { Navbar, SongSearch } from "components";
import { usePageTitle } from "hooks";
import { API, axiosInstance } from "services";
import { ROUTES } from "routes";
import { setCurrentSong, useAppDispatch, useAppSelector } from "store";
import { useSocket } from "context/SocketProvider";
import type { Song } from "types";
import { useTranslation } from "react-i18next";

export default function AdminLobby() {
  const { t } = useTranslation();
  usePageTitle(t("AdminLobby.pageTitle"));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { socket } = useSocket();

  const handleStartSession = async (songId: string) => {
    const res = await axiosInstance.get<Song>(API.SONGS.GET_BY_ID(songId));
    const fullSong = res.data;

    socket?.emit("startSong", { song: fullSong, token });
    dispatch(setCurrentSong(fullSong));
    navigate(ROUTES.JAM);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <SongSearch onSelect={handleStartSession} />
    </div>
  );
}
