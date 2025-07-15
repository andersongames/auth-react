// /tests/unit/Login.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import Login from '../../src/pages/Login';
import { errorMessages } from '../../src/constants/errorMessages';

describe('Login Page - Unit Tests', () => {
  beforeEach(() => {
    renderWithProviders(<Login />);
  });

  it('should render email and password fields', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should render submit button enabled by default', () => {
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('should show error message for invalid email format', async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText(/email/i, { exact: true }), 'invalid@email');
    await user.type(screen.getByLabelText(/password/i), 'somepassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(errorMessages.invalidEmail)).toBeInTheDocument();
  });

  it('should show error when password is empty', async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.clear(screen.getByLabelText(/password/i));
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(errorMessages.requiredPassword)).toBeInTheDocument();
  });

  it('should display loading spinner while submitting', async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(screen.getByLabelText(/email/i), 'test@email.com');
    await user.type(screen.getByLabelText(/password/i), 'ValidP@ss123');

    const button = screen.getByRole('button', { name: /login/i });
    await user.click(button);

    expect(screen.getByRole('button', { name: '' })).toBeDisabled();
    expect(await screen.findByTestId('spinner')).toBeInTheDocument();
  });
});
