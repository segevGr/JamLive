type SongLine = { lyrics: string; chords?: string };

interface SongDisplayProps {
  song: SongLine[][];
  isSinger: boolean;
}

export default function SongDisplay({ song, isSinger }: SongDisplayProps) {
  return (
    <div className="flex flex-col gap-8 items-center w-full px-4">
      {song.map((line, index) => {
        const isHebrew = isRTL(line.map((p) => p.lyrics).join(" "));
        return (
          <div
            key={index}
            className={`flex flex-wrap justify-center gap-x-2 leading-snug ${
              isHebrew ? "text-right" : "text-left"
            }`}
            dir={isHebrew ? "rtl" : "ltr"}
          >
            {line.map((part, i) => (
              <div
                key={i}
                className="inline-block text-center h-[5.5rem] w-fit px-1"
              >
                <div className="h-[1.8rem]">
                  {!isSinger && part.chords && (
                    <span className="text-gold text-3xl font-semibold">
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
}

function isRTL(text: string) {
  return /[\u0590-\u05FF]/.test(text);
}
