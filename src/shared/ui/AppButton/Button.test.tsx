import { Button, ThemeButton } from "shared/ui/AppButton/Button";
import { render, screen } from "@testing-library/react";

describe("button", () => {
  test("button render", () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });
  test("button render with theme", () => {
    render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
    expect(screen.getByText("TEST")).toHaveClass("clear");
    screen.debug();
  });
});
