import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CardContainer = ({ children, className, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-xl border border-borderGray bg-white shadow-sm transition",
        onClick && "cursor-pointer hover:shadow-md hover:bg-hoverCard",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
