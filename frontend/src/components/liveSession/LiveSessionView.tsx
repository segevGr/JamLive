import { useEffect, useState } from "react";
import {
  SongDisplay,
  InstrumentBadge,
  QuitButton,
  AutoScrollToggle,
  LoadingSpinner,
  Dialog,
} from "components";
import { useModal } from "hooks";
import { useTranslation } from "react-i18next";
import type { Song, Instrument, UserRole, ViewMode } from "types";

interface LiveSessionViewProps {
  song: Song | null;
  instrument: Instrument;
  role: UserRole;
  onQuit?: () => void;
  mode: ViewMode;
}

const LiveSessionView = ({
  song,
  instrument,
  role,
  onQuit,
  mode,
}: LiveSessionViewProps) => {
  const { t } = useTranslation();

  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);

  // Enables auto-scrolling until the bottom is reached
  useEffect(() => {
    const container = (document.scrollingElement ||
      document.documentElement) as HTMLElement;

    if (!autoScroll) return;

    if (container.scrollHeight - container.clientHeight <= 5) {
      setAutoScroll(false);
      return;
    }

    let animationId: number;

    const scrollStep = () => {
      window.scrollBy({ top: scrollSpeed });

      const atBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5;

      if (atBottom) {
        setAutoScroll(false);
        return;
      }

      animationId = requestAnimationFrame(scrollStep);
    };

    animationId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationId);
  }, [autoScroll, scrollSpeed]);

  const openDialogFunc = () => {
    if (mode === "browse") {
      openDialog({
        type: "warn",
        title: t("jam.returnBrowse.dialogTitle"),
        message: t("jam.returnBrowse.dialogText"),
        confirmLabel: t("jam.returnBrowse.dialogButtonLabel"),
        onConfirm: () => {
          closeDialog();
          onQuit?.();
        },
        onClose: closeDialog,
      });
    } else {
      openDialog({
        type: "warn",
        title: t("jam.endSession.dialogTitle"),
        message: t("jam.endSession.dialogText"),
        confirmLabel: t("jam.endSession.dialogButtonLabel"),
        onConfirm: () => {
          closeDialog();
          onQuit?.();
        },
        onClose: closeDialog,
      });
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-background relative pb-20 min-h-0">
      <div className="flex flex-col items-center justify-center mt-10">
        {song && (
          <div className="bg-white rounded-xl shadow-md mx-6 md:mx-auto px-6 py-8 text-center max-w-6xl w-full">
            <h2 className="text-5xl font-bold text-primaryDark mb-2">
              {song.title}
            </h2>
            <p className="text-xl text-black mb-4 mt-1">{song.artist}</p>
            <InstrumentBadge instrument={instrument!} />
            {song.lyrics ? (
              <SongDisplay
                songLyrics={song.lyrics}
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
        toggle={() => setAutoScroll((prev) => !prev)}
        onSpeedChange={(newSpeed) => setScrollSpeed(newSpeed)}
        currentSpeed={scrollSpeed}
      />

      {(role === "admin" || mode === "browse") && (
        <QuitButton onQuit={openDialogFunc} mode={mode} />
      )}

      <Dialog isOpen={isDialogOpen} {...dialogData} />
    </div>
  );
};

export default LiveSessionView;
