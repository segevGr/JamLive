import { Mic, Guitar, Drum, Keyboard, Music2, Music } from "lucide-react";
import { JSX } from "react";
import { Instrument } from "types/instruments.types";

const iconClass = "h-5 w-5 mr-2";

const iconMap: Record<Instrument, JSX.Element> = {
  Vocals: <Mic className={iconClass} />,
  Guitar: <Guitar className={iconClass} />,
  Bass: <Guitar className={`${iconClass} rotate-180`} />,
  Drums: <Drum className={iconClass} />,
  Keyboard: <Keyboard className={iconClass} />,
  Saxophone: <Music2 className={iconClass} />,
};

export default function InstrumentBadge({
  instrument,
}: {
  instrument: Instrument;
}) {
  const icon = iconMap[instrument] || <Music className={iconClass} />;

  return (
    <div className="inline-flex items-center text-lg bg-primary text-white rounded-full px-5 py-2 shadow-md">
      {icon}
      <span className="capitalize font-semibold">{instrument}</span>
    </div>
  );
}
