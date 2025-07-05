interface AutoScrollToggleProps {
  isScrolling: boolean;
  toggle: () => void;
}

export default function AutoScrollToggle({
  isScrolling,
  toggle,
}: AutoScrollToggleProps) {
  return (
    <button
      type="button"
      onClick={toggle}
      className={`fixed bottom-4 right-4 z-50 rounded-full px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg font-semibold shadow-md transition
        ${
          isScrolling ? "bg-errorText" : "bg-green"
        } text-white hover:opacity-90`}
    >
      {isScrolling ? "Stop Scroll" : "Start Scroll"}
    </button>
  );
}
