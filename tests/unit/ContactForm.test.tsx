import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "@/sections/Contact";

describe("Contact component", () => {
  it("renders the form fields", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("displays error when submitting empty form", () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByLabelText(/name/i)).toBeInvalid();
  });
});
