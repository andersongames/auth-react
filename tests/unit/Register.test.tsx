import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../../src/pages/Register";
import { errorMessages } from "../../src/constants/errorMessages";
import { renderWithProviders } from "../test-utils";

describe('Register Page - unit tests (validation & UI)', () => {
  beforeEach(() => {
    renderWithProviders(<Register />);
  });

  it('should render the registration form with required fields', async () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { exact: true })).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password', { exact: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('should disable submit button when internal isLoading is true', async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText('Name', { exact: true }), 'John');
    await user.type(screen.getByLabelText('Email', { exact: true }), 'john@example.com');
    await user.type(screen.getByLabelText('Password', { exact: true }), 'Abc123!@');
    await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'Abc123!@');

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('should show errors when trying to submit with empty fields', async () => {
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(errorMessages.nameTooShort)).toBeInTheDocument();
    expect(await screen.findByText(errorMessages.invalidEmail)).toBeInTheDocument();
    expect(await screen.findByText(errorMessages.passwordTooShort)).toBeInTheDocument();
  });

  it('should show error if passwords are different', async () => {
    // Creates a user interaction instance with zero delay between keystrokes.
    // This speeds up tests by removing the default artificial typing delay.
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText('Password', { exact: true }), 'FdT&8njC');
    await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'xyzw4567');

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(errorMessages.passwordsDontMatch)).toBeInTheDocument();
  });

  it('should show error when name has less than 2 characters', async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText('Name', { exact: true }), 'A');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(errorMessages.nameTooShort)).toBeInTheDocument();
  });

  it('should show error for invalid email format', async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText('Email', { exact: true }), 'invalid@email');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(errorMessages.invalidEmail)).toBeInTheDocument();
  });

  it('should show error when password is too short', async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText('Password', { exact: true }), 'aB1!');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(errorMessages.passwordTooShort)).toBeInTheDocument();
  });

  it('should highlight password requirements as user types', async () => {
    const user = userEvent.setup({ delay: 0 });
    const passwordInput = screen.getByLabelText('Password', { exact: true });

    // Start typing a partial password
    await user.type(passwordInput, 'abc');
    expect(screen.getByText(/at least 8 characters/i)).toHaveClass('text-red-600');
    expect(screen.getByText(/one uppercase letter/i)).toHaveClass('text-red-600');
    expect(screen.getByText(/one lowercase letter/i)).toHaveClass('text-green-600');
    expect(screen.getByText(/one number/i)).toHaveClass('text-red-600');
    expect(screen.getByText(/one special character/i)).toHaveClass('text-red-600');

    // Complete with a strong password
    await user.clear(passwordInput);
    await user.type(passwordInput, 'Abc123!@');

    // Wait for UI to reflect all password requirements as met
    await waitFor(() => {
      expect(screen.getByText(/at least 8 characters/i)).toHaveClass('text-green-600');
      expect(screen.getByText(/one uppercase letter/i)).toHaveClass('text-green-600');
      expect(screen.getByText(/one lowercase letter/i)).toHaveClass('text-green-600');
      expect(screen.getByText(/one number/i)).toHaveClass('text-green-600');
      expect(screen.getByText(/one special character/i)).toHaveClass('text-green-600');
    });
  });
});
