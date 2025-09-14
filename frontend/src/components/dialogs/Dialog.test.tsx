import { render, screen, fireEvent } from "@testing-library/react";
import Dialog from "./Dialog";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock("hooks", () => ({
  useLockBodyScroll: jest.fn(),
}));
jest.mock("i18n/getDirection", () => ({
  isRtl: () => false,
}));
jest.mock("components", () => ({
  PrimaryButton: ({ text, onClick }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

describe("Dialog", () => {
  test("does not render when closed", () => {
    render(<Dialog isOpen={false} title="Test" message="Message" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test("renders title and message when open", () => {
    render(<Dialog isOpen title="Test Title" message="Test Message" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  test("calls onConfirm when confirm button clicked", () => {
    const onConfirm = jest.fn();
    render(
      <Dialog
        isOpen
        title="Confirm"
        message="Msg"
        type="warn"
        onConfirm={onConfirm}
      />
    );
    fireEvent.click(screen.getByText("OK"));
    expect(onConfirm).toHaveBeenCalled();
  });

  test("calls onClose when cancel clicked", () => {
    const onClose = jest.fn();
    render(
      <Dialog
        isOpen
        title="Cancel"
        message="Msg"
        type="warn"
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByText("profile.dialog.cancel"));
    expect(onClose).toHaveBeenCalled();
  });
});
