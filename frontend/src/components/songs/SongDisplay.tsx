import { SongLine } from "types";
import clsx from "clsx";

interface SongDisplayProps {
  songLyrics: SongLine[][];
  isSinger: boolean;
}

const SongDisplay = ({ songLyrics, isSinger }: SongDisplayProps) => {
  return (
    <div className="flex flex-col gap-8 items-center w-full px-4">
      {songLyrics.map((line, index) => {
        const isHebrew = isRTL(line.map((p) => p.lyrics).join(" "));
        return (
          <div
            key={index}
            className={clsx(
              "flex flex-wrap justify-center gap-x-2 leading-snug",
              isHebrew ? "text-right" : "text-left"
            )}
            dir={isHebrew ? "rtl" : "ltr"}
          >
            {line.map((part, i) => (
              <div
                key={i}
                className="inline-block text-center h-[5.5rem] w-fit px-1"
              >
                <div className="h-[1.8rem]">
                  {!isSinger && part.chords && (
                    <span className="text-textMain text-3xl font-semibold">
                      {part.chords}
                    </span>
                  )}
                </div>
                <div className="text-5xl text-primary font-bold">
                  {part.lyrics}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

function isRTL(text: string) {
  return /[\u0590-\u05FF]/.test(text);
}

export default SongDisplay;
