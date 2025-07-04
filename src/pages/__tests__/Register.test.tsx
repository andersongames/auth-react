import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../Register";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { errorMessages } from "../../constants/errorMessages";

// wrapper to simulate environment with routing
const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );

describe('Register Page', () => {
  it('should render the registration form with required fields', () => {
    renderWithProviders(<Register />);

    // use strings or regex /name/i or 'Name'??
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { exact: true })).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password', { exact: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('should show errors when trying to submit with empty fields', async () => {
    renderWithProviders(<Register />);

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(errorMessages.nameTooShort)).toBeInTheDocument();
    expect(await screen.findByText(errorMessages.invalidEmail)).toBeInTheDocument();
    expect(await screen.findByText(errorMessages.passwordTooShort)).toBeInTheDocument();
  });

  it('should show error if passwords are different', async () => {
    renderWithProviders(<Register />);

    await userEvent.type(screen.getByLabelText('Password', { exact: true }), 'FdT&8njCbVF5WAPF');
    await userEvent.type(screen.getByLabelText('Confirm Password', { exact: true }), 'xyz456');

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(errorMessages.passwordsDontMatch)).toBeInTheDocument();
  });
});
