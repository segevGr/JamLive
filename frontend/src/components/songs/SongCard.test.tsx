import { render, screen, fireEvent } from "@testing-library/react";
import SongCard from "./SongCard";
import { Song } from "types";

jest.mock("components", () => ({
  CardContainer: ({ children, onClick }: any) => (
    <div onClick={onClick} data-testid="card">
      {children}
    </div>
  ),
}));

const song: Song = {
  id: "1",
  title: "Test Song",
  artist: "Test Artist",
};

describe("SongCard", () => {
  test("renders title and artist", () => {
    render(<SongCard song={song} onSelect={() => {}} />);
    expect(screen.getByText(/Test Song – Test Artist/)).toBeInTheDocument();
  });

  test("renders fallback when no image", () => {
    render(<SongCard song={song} onSelect={() => {}} />);
    expect(screen.getByText("♫")).toBeInTheDocument();
  });

  test("calls onSelect when clicked", () => {
    const onSelect = jest.fn();
    render(<SongCard song={song} onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId("card"));
    expect(onSelect).toHaveBeenCalledWith("1");
  });
});
