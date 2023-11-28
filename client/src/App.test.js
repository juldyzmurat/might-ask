import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders", () => {
  render(<App />);
  expect(screen).toBeTruthy();
});
