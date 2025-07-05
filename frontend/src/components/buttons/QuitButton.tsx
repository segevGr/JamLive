interface QuitButtonProps {
  onQuit: () => void;
}

export default function QuitButton({ onQuit }: QuitButtonProps) {
  return (
    <button
      type="button"
      onClick={onQuit}
      className="fixed bottom-4 left-4 z-50 rounded-full px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg bg-red-600 text-white font-semibold shadow-md hover:opacity-90"
    >
      Quit
    </button>
  );
}
