import { BaseButton } from "components";

interface AutoScrollToggleProps {
  isScrolling: boolean;
  toggle: () => void;
}

export default function AutoScrollToggle({
  isScrolling,
  toggle,
}: AutoScrollToggleProps) {
  return (
    <BaseButton
      text={isScrolling ? "Stop Scroll" : "Start Scroll"}
      onClick={toggle}
      color={isScrolling ? "error" : "green"}
      fullWidth={false}
      size="md"
      className="fixed bottom-4 right-4 z-50"
    />
  );
}
