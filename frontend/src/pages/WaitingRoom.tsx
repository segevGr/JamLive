// src/pages/WaitingRoom.tsx
import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import Navbar from "../components/Navbar";
import { usePageTitle } from "../hooks/usePageTitle";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/storeHooks";
import { setCurrentSong } from "../store/songSessionSlice";
import { ROUTES } from "../constants/routes";

const WaitingRoom = () => {
  usePageTitle("Waiting Room");

  const [dots, setDots] = useState("");
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
      navigate(ROUTES.JAM);
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("startSong");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar />

      <main className="flex flex-1 items-center justify-center">
        <div className="w-10/12 h-[80vh] border-2 border-dashed border-borderGray rounded-xl flex flex-col items-center justify-center text-center px-4">
          <Music className="text-gold w-20 h-20 mb-4" />
          <p className="text-4xl text-primary font-medium">
            Waiting for next song
            <span className="inline-block w-6 text-left">{dots}</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default WaitingRoom;
