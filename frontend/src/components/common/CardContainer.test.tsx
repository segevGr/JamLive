import { render, screen, fireEvent } from "@testing-library/react";
import CardContainer from "./CardContainer";

describe("CardContainer", () => {
  test("renders children", () => {
    render(<CardContainer>hello world</CardContainer>);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<CardContainer onClick={handleClick}>click me</CardContainer>);
    fireEvent.click(screen.getByText("click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders with header mode (no bg-white)", () => {
    render(<CardContainer isHeader>header content</CardContainer>);
    const div = screen.getByText("header content").parentElement;
    expect(div).not.toHaveClass("bg-white");
  });
});
