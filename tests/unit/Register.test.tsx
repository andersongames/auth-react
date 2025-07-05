import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../../src/pages/Register";
import { errorMessages } from "../../src/constants/errorMessages";
import { renderWithProviders } from "../test-utils";

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

    // Creates a user interaction instance with zero delay between keystrokes.
    // This speeds up tests by removing the default artificial typing delay.
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText('Password', { exact: true }), 'FdT&8njC');
    await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'xyzw4567');

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(errorMessages.passwordsDontMatch)).toBeInTheDocument();
  });
});
