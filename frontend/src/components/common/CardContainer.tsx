import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isHeader?: boolean;
}

const CardContainer = ({
  children,
  className,
  onClick,
  isHeader = false,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "p-4 rounded-xl border border-borderGray  shadow-sm transition",
        onClick && "cursor-pointer hover:shadow-md hover:bg-hoverCard",
        className,
        isHeader ? "" : "bg-white"
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
