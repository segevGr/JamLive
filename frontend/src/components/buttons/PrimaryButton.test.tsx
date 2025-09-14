import { render, screen, fireEvent } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";

jest.mock("components", () => ({
  BaseButton: ({ text, onClick }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

describe("PrimaryButton", () => {
  test("renders with text", () => {
    render(<PrimaryButton text="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("fires onClick", () => {
    const handleClick = jest.fn();
    render(<PrimaryButton text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalled();
  });
});
