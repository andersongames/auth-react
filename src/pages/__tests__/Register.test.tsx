import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../Register";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

// wrapper to simulate environment with routing
const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Register Page', () => {
  it('should render the registration form with required fields', () => {
    renderWithRouter(
      // can use <authProvider> in renderWithRouter?
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    // use strings or regex /name/i or 'Name'??
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { exact: true })).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password', { exact: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('should show errors when trying to submit with empty fields', async () => {
    renderWithRouter(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    await userEvent.click(submitButton);
    // can use "submitButton.click()"  and drop userEvent?
    // submitButton.click();

    expect(await screen.findByText('Name must have at least 2 characters.')).toBeInTheDocument();
    expect(await screen.findByText('Invalid email address.')).toBeInTheDocument();
    expect(await screen.findByText('Password must have at least 6 characters.')).toBeInTheDocument();
  });

  it('should show error if passwords are different', async () => {
    renderWithRouter(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    await userEvent.type(screen.getByLabelText('Password', { exact: true }), 'FdT&8njCbVF5WAPF');
    await userEvent.type(screen.getByLabelText('Confirm Password', { exact: true }), 'xyz456');

    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
  });
});
