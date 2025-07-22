import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  SongDisplay,
  InstrumentBadge,
  QuitButton,
  AutoScrollToggle,
  LoadingSpinner,
  Dialog,
} from "components";
import { useAppSelector, useAppDispatch, clearSession } from "store";
import { useSocket } from "context/SocketProvider";
import { ROUTES } from "routes";
import { ErrorPageTemplate } from "utils";
import { useModal, usePageTitle } from "hooks";
import { useTranslation } from "react-i18next";

export default function Jam() {
  const { t } = useTranslation();
  usePageTitle(t("jam.pageTitle"));

  const { role, instrument } = useAppSelector((state) => state.auth);
  const { currentSong } = useAppSelector((state) => state.songSession);

  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();

  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const [sessionEnded, setSessionEnded] = useState(false);

  const { socket } = useSocket();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentSong && !sessionEnded) {
      setError(t("jam.noSongError"));
    }
  }, [currentSong, sessionEnded, t]);

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
        navigate(ROUTES.ADMIN_LOBBY);
      } else {
        navigate(ROUTES.USER_LOBBY);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [sessionEnded, role, navigate]);

  const handleQuit = () => {
    socket?.emit("quitSession");
    closeDialog();
  };

  if (sessionEnded) {
    return (
      <Dialog
        isOpen={sessionEnded}
        title={t("jam.sessionEndedTitle")}
        message={
          role === "admin"
            ? t("jam.sessionEndedAdmin")
            : t("jam.sessionEndedUser")
        }
      />
    );
  }

  if (!currentSong) {
    return (
      <ErrorPageTemplate
        title={t("jam.accessDeniedTitle")}
        description={t("jam.accessDeniedDesc")}
        imageSrc="/access-denied-img.png"
        buttonText={
          role === "admin"
            ? t("jam.selectSongButton")
            : t("jam.backToUserLobbyButton")
        }
        redirectTo={role === "admin" ? ROUTES.ADMIN_LOBBY : ROUTES.USER_LOBBY}
      />
    );
  }

  const openDialogFunc = () => {
    openDialog({
      type: "warn",
      title: t("jam.confirmEndTitle"),
      message: t("jam.confirmEndMessage"),
      confirmLabel: t("jam.confirmEndConfirmLabel"),
      onConfirm: handleQuit,
      onClose: closeDialog,
    });
  };

  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-auto bg-background relative pb-20"
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-accent mb-6">
          {t("jam.liveSessionTitle")}
        </h1>

        {error && <p className="text-errorText">{error}</p>}

        {!currentSong && !error && (
          <LoadingSpinner size="lg" text={t("jam.loadingSong")} />
        )}

        {currentSong && (
          <div className="bg-white rounded-xl shadow-md mx-6 md:mx-auto px-6 py-8 text-center max-w-6xl w-full">
            <h2 className="text-5xl font-bold text-primaryDark mb-2">
              {currentSong.title}
            </h2>
            <p className="text-xl text-black mb-4 mt-1">{currentSong.artist}</p>
            <InstrumentBadge instrument={instrument!} />
            {currentSong.lyrics ? (
              <SongDisplay
                songLyrics={currentSong.lyrics}
                isSinger={instrument?.toLowerCase() === "vocals"}
              />
            ) : (
              <LoadingSpinner size="md" text={t("jam.loadingLyrics")} />
            )}
          </div>
        )}
      </div>
      <AutoScrollToggle
        isScrolling={autoScroll}
        toggle={() => setAutoScroll(!autoScroll)}
      />
      {role === "admin" && <QuitButton onQuit={openDialogFunc} />}
      <Dialog isOpen={isDialogOpen} {...dialogData} />
    </div>
  );
}
