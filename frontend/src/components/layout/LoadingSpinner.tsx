import clsx from "clsx";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeClasses = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

export default function LoadingSpinner({
  size = "md",
  text,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div
        className={clsx(
          "rounded-full animate-spin border-primaryLight border-t-transparent",
          sizeClasses[size]
        )}
      />
      {text && (
        <p className="mt-3 text-sm font-sans text-textSubtle animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
