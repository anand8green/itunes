import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("search term value", () => {
  render(<App />);
  const searchTerm = screen.getByPlaceholderText("Search...");
  expect(searchTerm).toHaveValue("beyonce");
  fireEvent.change(searchTerm, { target: { value: "Hero" } });
  expect(searchTerm).toHaveValue("Hero");
});
