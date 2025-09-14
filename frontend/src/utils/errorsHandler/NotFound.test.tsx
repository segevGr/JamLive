import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("utils", () => ({
  ErrorPageTemplate: ({ title, description, imageSrc, redirectTo }: any) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <span>{imageSrc}</span>
      <span>{redirectTo}</span>
    </div>
  ),
}));

describe("NotFound page", () => {
  test("renders translated title", () => {
    render(<NotFound />);
    expect(screen.getByText("notFound.title")).toBeInTheDocument();
  });

  test("renders translated description", () => {
    render(<NotFound />);
    expect(screen.getByText("notFound.description")).toBeInTheDocument();
  });

  test("renders image and redirect route", () => {
    render(<NotFound />);
    expect(screen.getByText("/not-found-img.png")).toBeInTheDocument();
    expect(screen.getByText("/")).toBeInTheDocument();
  });
});
