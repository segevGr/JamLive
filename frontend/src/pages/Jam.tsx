import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SongDisplay from "../components/SongDisplay";
import { useAppSelector, useAppDispatch } from "../store/storeHooks";
import InstrumentBadge from "../components/InstrumentBadge";
import AutoScrollToggle from "../components/AutoScrollToggle";
import QuitButton from "../components/QuitButton";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { clearSession } from "../store/songSessionSlice";
import { ROUTES } from "../constants/routes";
import ErrorPage from "../components/ErrorPage";
import ModalDialog from "../components/ModalDialog";

export default function Jam() {
  const { role, instrument } = useAppSelector((state) => state.auth);
  const { currentSong } = useAppSelector((state) => state.songSession);

  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  const { socket } = useSocket();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentSong && !sessionEnded) {
      setError("No song selected. Please go back to the waiting room.");
    }
  }, [currentSong, sessionEnded]);

  useEffect(() => {
    if (!scrollRef.current) return;

    if (autoScroll) {
      scrollInterval.current = setInterval(() => {
        const container = scrollRef.current!;
        container.scrollBy({ top: 1 });

        const { scrollTop, scrollHeight, clientHeight } = container;
        const reachedBottom = scrollTop + clientHeight >= scrollHeight - 5;

        if (reachedBottom) {
          setAutoScroll(false);
        }
      }, 150);
    }

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    };
  }, [autoScroll]);

  useEffect(() => {
    if (!socket) return;

    const handleSessionEnded = () => {
      setSessionEnded(true);
      dispatch(clearSession());
    };

    socket.on("sessionEnded", handleSessionEnded);

    return () => {
      socket.off("sessionEnded", handleSessionEnded);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (!sessionEnded) return;

    const timer = setTimeout(() => {
      if (role === "admin") {
        navigate(ROUTES.ADMIN_SEARCH);
      } else {
        navigate(ROUTES.WAITING_ROOM);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [sessionEnded, role, navigate]);

  const handleQuit = () => {
    socket?.emit("quitSession");
    setShowConfirmModal(false);
  };

  if (sessionEnded) {
    return (
      <ModalDialog
        isOpen={true}
        title="Session Ended"
        message={
          role === "admin"
            ? "The session has ended. Back to song selection..."
            : "The session has ended. Waiting for the next song..."
        }
        showButtons={false}
      />
    );
  }

  if (!currentSong) {
    return (
      <ErrorPage
        title="Access Denied"
        description="You're off tempo – no song has started yet!"
        imageSrc="/access-denied-graphic.png"
        buttonText={role === "admin" ? "Select a song" : "Back to Waiting Room"}
        redirectTo={
          role === "admin" ? ROUTES.ADMIN_SEARCH : ROUTES.WAITING_ROOM
        }
      />
    );
  }

  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-auto bg-background relative pb-20"
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-primaryLight mb-6">
          Live Session
        </h1>

        {error && <p className="text-errorText">{error}</p>}

        {!currentSong && !error && <p className="text-lg">Loading song...</p>}

        {currentSong && (
          <div className="bg-white rounded-xl shadow-md mx-6 md:mx-auto px-6 md:px-40 py-8 text-center">
            <h2 className="text-5xl font-bold text-gold mb-2">
              {currentSong.title}
            </h2>
            <p className="text-xl text-primaryLight mb-4 mt-1">
              {currentSong.artist}
            </p>
            <InstrumentBadge instrument={instrument!} />
            <SongDisplay
              song={currentSong.lyrics}
              isSinger={instrument?.toLowerCase() === "vocals"}
            />
          </div>
        )}
      </div>
      <AutoScrollToggle
        isScrolling={autoScroll}
        toggle={() => setAutoScroll(!autoScroll)}
      />
      {role === "admin" && (
        <QuitButton onQuit={() => setShowConfirmModal(true)} />
      )}
      {showConfirmModal && (
        <ModalDialog
          isOpen={showConfirmModal}
          title="End Session?"
          message="Are you sure you want to end the session for all players?"
          confirmText="Yes, Quit"
          cancelText="Cancel"
          onConfirm={handleQuit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}
