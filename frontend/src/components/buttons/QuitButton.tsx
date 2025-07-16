import BaseButton from "./BaseButton";

interface QuitButtonProps {
  onQuit: () => void;
}

export default function QuitButton({ onQuit }: QuitButtonProps) {
  return (
    <BaseButton
      text="Quit"
      onClick={onQuit}
      color="red"
      fullWidth={false}
      size="md"
      className="fixed bottom-4 left-4 z-50"
    />
  );
}
