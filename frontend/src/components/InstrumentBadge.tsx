import { Mic, Guitar, Drum, Keyboard, Music2, Music } from "lucide-react";
import { JSX } from "react";
import { Instrument } from "types/instruments.types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const iconClass = "h-5 w-5 mr-2";

const iconMap: Record<Instrument, JSX.Element> = {
  Vocals: <Mic className={iconClass} />,
  Guitar: <Guitar className={iconClass} />,
  Bass: <Guitar className={clsx("rotate-180", iconClass)} />,
  Drums: <Drum className={iconClass} />,
  Keyboard: <Keyboard className={iconClass} />,
  Saxophone: <Music2 className={iconClass} />,
};

export default function InstrumentBadge({
  instrument,
}: {
  instrument: Instrument;
}) {
  const { t } = useTranslation();
  const icon = iconMap[instrument] || <Music className={iconClass} />;

  const normalized =
    instrument.charAt(0).toUpperCase() + instrument.slice(1).toLowerCase();

  return (
    <div className="inline-flex items-center text-lg bg-primary text-white rounded-full px-5 py-2 shadow-md">
      {icon}
      {t(`instruments.${normalized}`, { defaultValue: normalized })}
    </div>
  );
}
