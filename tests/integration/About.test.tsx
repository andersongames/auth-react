import { screen } from '@testing-library/react';
import { AuthContext } from '../../src/context/AuthContext';
import About from '../../src/pages/About';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../test-utils';

const renderAboutWithAuth = (contextValue: React.ContextType<typeof AuthContext>) => {
  return renderWithProviders(
    <AuthContext.Provider value={contextValue}>
      <About />
    </AuthContext.Provider>
  );
};

describe('About Page - Conditional Rendering', () => {
  it('should show login message and hide role messages when user is not authenticated', () => {
    renderAboutWithAuth({
      isAuthenticated: false,
      loading: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    expect(screen.getByText(/you are not logged in/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Log in here/ })).toBeInTheDocument();

    expect(screen.queryByText(/welcome, user!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/welcome, admin!/i)).not.toBeInTheDocument();
  });

  it('should show role message for user role', () => {
    renderAboutWithAuth({
      isAuthenticated: true,
      loading: false,
      user: { id: '1', name: 'Test User', email: 'user@example.com', role: 'user' },
      login: vi.fn(),
      logout: vi.fn(),
    });

    expect(screen.queryByText(/you are not logged in/i)).not.toBeInTheDocument();

    expect(screen.getByText(/welcome, user! you have access to basic features./i)).toBeInTheDocument();

    expect(screen.queryByText(/welcome, admin!/i)).not.toBeInTheDocument();
  });

  it('should show role message for admin role', () => {
    renderAboutWithAuth({
      isAuthenticated: true,
      loading: false,
      user: { id: '2', name: 'Admin', email: 'admin@example.com', role: 'admin' },
      login: vi.fn(),
      logout: vi.fn(),
    });

    expect(screen.queryByText(/you are not logged in/i)).not.toBeInTheDocument();

    expect(screen.getByText(/welcome, admin! you can manage users and system data./i)).toBeInTheDocument();

    expect(screen.queryByText(/welcome, user!/i)).not.toBeInTheDocument();
  });
});
