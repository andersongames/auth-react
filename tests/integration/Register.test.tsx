import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithProviders } from '../test-utils';
import Register from '../../src/pages/Register';
import * as authService from '../../src/services/authService';
import { successMessages } from '../../src/constants/successMessages';
import { errorMessages } from '../../src/constants/errorMessages';
import { AuthContext, type AuthContextType } from '../../src/context/AuthContext';
import toast from 'react-hot-toast';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-hot-toast');

const mockAuthContext: AuthContextType = {
  isAuthenticated: true,
  loading: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
};

describe('Register Page - integration tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should submit valid form, call registerUser, show success toast and redirect', async () => {
    const user = userEvent.setup({ delay: 0 });
    const mockRegisterUser = vi.spyOn(authService, 'registerUser').mockResolvedValue(undefined);

    renderWithProviders(<Register />);

    await user.type(screen.getByLabelText('Name', { exact: true }), 'John');
    await user.type(screen.getByLabelText('Email', { exact: true }), 'john@example.com');
    await user.type(screen.getByLabelText('Password', { exact: true }), 'Abc123!@');
    await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'Abc123!@');

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
        password: 'Abc123!@',
        role: 'admin',
      });
      expect(toast.success).toHaveBeenCalledWith(successMessages.registrationSuccess);
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }, { timeout: 3000 });
  });

  it('should show toast error when registerUser throws known error', async () => {
    const user = userEvent.setup({ delay: 0 });
    vi.spyOn(authService, 'registerUser').mockRejectedValue(new Error(errorMessages.emailAlreadyRegistered));

    renderWithProviders(<Register />);

    await user.type(screen.getByLabelText('Name', { exact: true }), 'John');
    await user.type(screen.getByLabelText('Email', { exact: true }), 'john@example.com');
    await user.type(screen.getByLabelText('Password', { exact: true }), 'Abc123!@');
    await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'Abc123!@');

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessages.emailAlreadyRegistered);
    });
  });

  it('should redirect to /dashboard if user is already authenticated', () => {
    // simulate auth context with authenticated user
    renderWithProviders(
      <AuthContext.Provider value={mockAuthContext}>
        <Register />
      </AuthContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should disable submit button while loading', async () => {
    renderWithProviders(
      <AuthContext.Provider value={{ isAuthenticated: false, loading: true, user: null, login: vi.fn(), logout: vi.fn() }}>
        <Register />
      </AuthContext.Provider>
    );

    const button = screen.getByRole('button', { name: /sign up/i });
    expect(button).toBeDisabled();
  });
});
