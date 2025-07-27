import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from '../../src/pages/Dashboard';
import { AuthContext, type AuthContextType } from '../../src/context/AuthContext';
import { renderWithProviders } from '../test-utils';

const renderDashboardWithAuth = (contextValue: AuthContextType) => {
  return renderWithProviders(
    <AuthContext.Provider value={contextValue}>
      <Dashboard />
    </AuthContext.Provider>
  );
};

describe('Dashboard Page - Conditional Rendering', () => {
  it('should show user info for authenticated user', () => {
    renderDashboardWithAuth({
      isAuthenticated: true,
      loading: false,
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
      },
      login: vi.fn(),
      logout: vi.fn(),
    });

    const name = screen.getAllByText(/john doe/i);
    expect(name.length).toBe(2);
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/user/i, { exact: true })).toBeInTheDocument();
  });

  it('should show Admin Panel and Manage Content link only for admin', () => {
    renderDashboardWithAuth({
      isAuthenticated: true,
      loading: false,
      user: {
        id: '2',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      },
      login: vi.fn(),
      logout: vi.fn(),
    });

    expect(screen.getByRole('link', { name: /go to admin panel/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /access personal settings/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /manage content/i })).toBeInTheDocument();
  });

  it('should show Personal Settings link only for user', () => {
    renderDashboardWithAuth({
      isAuthenticated: true,
      loading: false,
      user: {
        id: '3',
        name: 'User A',
        email: 'usera@example.com',
        role: 'user',
      },
      login: vi.fn(),
      logout: vi.fn(),
    });

    expect(screen.getByRole('link', { name: /access personal settings/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /go to admin panel/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /manage content/i })).not.toBeInTheDocument();
  });

  it('should show Manage Content link for editor', () => {
    renderDashboardWithAuth({
      isAuthenticated: true,
      loading: false,
      user: {
        id: '5',
        name: 'Editor',
        email: 'editor@example.com',
        role: 'editor',
      },
      login: vi.fn(),
      logout: vi.fn(),
    });

    expect(screen.queryByRole('link', { name: /access personal settings/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /go to admin panel/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /manage content/i })).toBeInTheDocument();
  });
});
