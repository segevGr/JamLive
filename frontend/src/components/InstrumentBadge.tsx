import { Music, Mic, Guitar, Drumstick, Keyboard, Music2 } from "lucide-react";
import { JSX } from "react";

interface InstrumentBadgeProps {
  instrument: string;
}

const iconClass = "h-5 w-5 mr-2";

const iconMap: Record<string, JSX.Element> = {
  vocals: <Mic className={iconClass} />,
  guitar: <Guitar className={iconClass} />,
  bass: <Guitar className={`${iconClass} rotate-180`} />,
  drums: <Drumstick className={iconClass} />,
  keyboards: <Keyboard className={iconClass} />,
  saxophone: <Music2 className={iconClass} />,
};

export default function InstrumentBadge({ instrument }: InstrumentBadgeProps) {
  const icon = iconMap[instrument.toLowerCase()] || (
    <Music className={iconClass} />
  );

  return (
    <div className="flex items-center text-lg text-white bg-primary rounded-full px-4 py-2 mb-4 shadow-sm max-w-fit mx-auto">
      {icon}
      <span className="capitalize font-semibold">{instrument}</span>
    </div>
  );
}
