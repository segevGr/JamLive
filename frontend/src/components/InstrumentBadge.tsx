import { Mic, Guitar, Drum, Keyboard, Music2, Music } from "lucide-react";
import { JSX } from "react";
import { Instrument } from "types";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
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

const InstrumentBadge = ({ instrument }: { instrument: Instrument }) => {
  const { t } = useTranslation();
  const icon = iconMap[instrument] || <Music className={iconClass} />;

  return (
    <div
      className={`inline-flex items-center gap-x-2 text-lg bg-primary text-white rounded-full px-5 py-2 shadow-md ${
        isRtl() ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {icon}
      {t(`instruments.${instrument}`)}
    </div>
  );
};

export default InstrumentBadge;
