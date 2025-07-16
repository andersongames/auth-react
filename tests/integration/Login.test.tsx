// /tests/integration/Login.test.tsx
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithProviders } from '../test-utils';
import Login from '../../src/pages/Login';
import { AuthContext } from '../../src/context/AuthContext';
import toast from 'react-hot-toast';
import { errorMessages } from '../../src/constants/errorMessages';
import { successMessages } from '../../src/constants/successMessages';
import { Route, Routes } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-hot-toast');

describe('Login Page - integration tests', () => {
  it('should call login() and redirect to /dashboard on success', async () => {
    const user = userEvent.setup({ delay: 0 });
    const mockLogin = vi.fn().mockResolvedValue(undefined);

    renderWithProviders(
      <AuthContext.Provider value={{
        isAuthenticated: false,
        loading: false,
        user: null,
        login: mockLogin,
        logout: vi.fn()
      }}>
        <Login />
      </AuthContext.Provider>
    );

    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'Abc123!@');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('john@example.com', 'Abc123!@');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should show toast error when login fails', async () => {
    const user = userEvent.setup({ delay: 0 });
    const mockLogin = vi.fn().mockRejectedValue(new Error(errorMessages.loginFailed));

    renderWithProviders(
      <AuthContext.Provider value={{
        isAuthenticated: false,
        loading: false,
        user: null,
        login: mockLogin,
        logout: vi.fn()
      }}>
        <Login />
      </AuthContext.Provider>
    );

    await user.type(screen.getByLabelText('Email'), 'wrong@email.com');
    await user.type(screen.getByLabelText('Password'), 'WrongPassword!');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessages.loginFailed);
    });
  });

  it('should redirect to /dashboard if already authenticated', () => {
    renderWithProviders(
      <AuthContext.Provider value={{
        isAuthenticated: true,
        loading: false,
        user: { id: '1', name: 'User', email: 'a@a.com', role: 'user' },
        login: vi.fn(),
        logout: vi.fn()
      }}>
        <Login />
      </AuthContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should show toast if loggedOut=true in query', () => {
    renderWithProviders(<Login />, { route: '/login?loggedOut=true' });

    expect(toast.success).toHaveBeenCalledWith(successMessages.loggedOut, { id: 'logout-toast' });
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('should show toast if expired=true in query', () => {
    renderWithProviders(<Login />, { route: '/login?expired=true' });

    expect(toast.error).toHaveBeenCalledWith(errorMessages.sessionExpired, { id: 'expired-toast' });
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('should navigate to /register when clicking the Register link', async () => {
    const user = userEvent.setup({ delay: 0 });

    renderWithProviders(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register Page</div>} />
      </Routes>,
      {
        route: '/login',
      }
    );

    await user.click(screen.getByRole('link', { name: /register/i }));

    expect(await screen.findByText(/register page/i)).toBeInTheDocument();
  });
});
