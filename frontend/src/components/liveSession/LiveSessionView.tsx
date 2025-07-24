import { useEffect, useRef, useState } from "react";
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

export default function LiveSessionView({
  song,
  instrument,
  role,
  onQuit,
  mode,
}: LiveSessionViewProps) {
  const { t } = useTranslation();

  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Enables auto-scrolling until the bottom is reached
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
    <div
      ref={scrollRef}
      className="h-screen overflow-y-auto bg-background relative pb-20"
    >
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-accent mb-6">
          {t("jam.liveSessionTitle")}
        </h1>

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
        toggle={() => setAutoScroll(!autoScroll)}
      />
      {(role === "admin" || mode === "browse") && (
        <QuitButton onQuit={openDialogFunc} mode={mode} />
      )}
      <Dialog isOpen={isDialogOpen} {...dialogData} />
    </div>
  );
}
