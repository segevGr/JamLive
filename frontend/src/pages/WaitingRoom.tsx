import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import Navbar from "components/Navbar";
import { usePageTitle } from "hooks/usePageTitle";
import { useSocket } from "context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/storeHooks";
import { setCurrentSong } from "store/reducers/songSessionSlice";
import { ROUTES } from "routes/routes";

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
  }, [socket, dispatch, navigate]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex flex-1 items-center justify-center">
        <div className="relative w-10/12 md:w-11/12 h-[70vh] md:h-[80vh] flex items-center justify-center text-center px-4">
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none text-borderGray"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="398"
              height="398"
              rx="16"
              ry="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="10"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>

          <div className="z-10 flex flex-col items-center">
            <Music className="text-accent w-20 h-20 mb-4" />
            <p className="text-4xl text-primary font-medium">
              Waiting for next song
              <span className="inline-block w-6 text-left">{dots}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WaitingRoom;
