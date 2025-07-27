// tests/unit/ProtectedRoute.test.tsx
import { screen } from '@testing-library/react';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { AuthContext, type AuthContextType } from '../../src/context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { ROLES, type Role } from '../../src/constants/roles';
import { renderWithProviders } from '../test-utils';

const mockUser = {
  id: '123',
  name: 'John',
  email: 'john@example.com',
  role: ROLES.ADMIN,
};

const mockAuthContext = {
  isAuthenticated: true,
  loading: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
};

const TestPage = () => <div>Protected Content</div>;

function renderWithAuth(authContextValue: AuthContextType, requiredRoles?: Role[]) {
  return renderWithProviders(
    <AuthContext.Provider value={authContextValue}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute requiredRoles={requiredRoles}>
              <TestPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/unauthorized" element={<div>Unauthorized Page</div>} />
      </Routes>
    </AuthContext.Provider>,
    { route: '/protected'  }
  );
}

describe('ProtectedRoute - unit tests', () => {
  it('should render children if authenticated and has required role', () => {
    renderWithAuth({
      ...mockAuthContext,
      user: { ...mockUser, role: ROLES.ADMIN },
    }, [ROLES.ADMIN]);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to /unauthorized if authenticated but lacks required role', () => {
    renderWithAuth({
      ...mockAuthContext,
      user: { ...mockUser, role: ROLES.USER },
    }, [ROLES.ADMIN]);

    expect(screen.getByText('Unauthorized Page')).toBeInTheDocument();
  });

  it('should redirect to /login if not authenticated', () => {
    renderWithAuth({
      ...mockAuthContext,
      isAuthenticated:false,
    });

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
