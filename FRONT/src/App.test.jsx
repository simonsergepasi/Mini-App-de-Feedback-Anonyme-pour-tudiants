import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders form with initial values", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/laisse ton feedback/i)).toBeInTheDocument();
  expect(screen.getByText(/envoyer/i)).toBeInTheDocument();
  expect(screen.getByText(/feedback anonyme/i)).toBeInTheDocument();
});

test("updates textarea value on change", () => {
  render(<App />);
  const textarea = screen.getByPlaceholderText(/laisse ton feedback/i);
  fireEvent.change(textarea, { target: { value: "Test feedback" } });
  expect(textarea).toHaveValue("Test feedback");
});

test("changes category on select", () => {
  render(<App />);
  const select = screen.getByLabelText(/choisis une catégorie/i);
  fireEvent.change(select, { target: { value: "Organisation" } });
  expect(select).toHaveValue("Organisation");
});