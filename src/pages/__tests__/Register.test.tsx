import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../Register";
import { BrowserRouter } from "react-router-dom";

// wrapper para simular ambiente com roteamento
const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Register Page", () => {
  it("deve renderizar o formulário de registro com campos obrigatórios", () => {
    renderWithRouter(<Register />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("deve mostrar erros ao tentar submeter com campos vazios", async () => {
    renderWithRouter(<Register />);

    const submitButton = screen.getByRole("button", { name: /register/i });
    await userEvent.click(submitButton);

    expect(await screen.findAllByText(/campo obrigatório/i)).toHaveLength(4);
  });

  it("deve mostrar erro se senhas forem diferentes", async () => {
    renderWithRouter(<Register />);

    await userEvent.type(screen.getByLabelText(/password/i), "abc123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "xyz456");

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/senhas não coincidem/i)).toBeInTheDocument();
  });
});
