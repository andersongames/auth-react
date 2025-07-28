// tests/unit/RoleBased.test.tsx
import { screen } from '@testing-library/react';
import RoleBased from '../../src/components/RoleBased';
import { AuthContext, type AuthContextType } from '../../src/context/AuthContext';
import { renderWithProviders } from '../test-utils';
import { ROLES, type Role } from '../../src/constants/roles';

const mockUser = {
  id: '1',
  name: 'Jane',
  email: 'jane@example.com',
  role: ROLES.USER,
};

const mockAuthContext: AuthContextType = {
  isAuthenticated: true,
  loading: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
};

function renderWithAuthContext(authContextValue: AuthContextType, allowedRoles: Role[]) {
  return renderWithProviders(
    <AuthContext.Provider value={authContextValue}>
      <RoleBased allowedRoles={allowedRoles}>
        <div>Visible only to allowed roles</div>
      </RoleBased>
    </AuthContext.Provider>
  );
}

describe('RoleBased - unit tests', () => {
  it('should render children if user has allowed role', () => {
    renderWithAuthContext({
      ...mockAuthContext,
      user: { ...mockUser, role: ROLES.USER },
    }, [ROLES.USER, ROLES.ADMIN]);

    expect(screen.getByText('Visible only to allowed roles')).toBeInTheDocument();
  });

  it('should not render children if user does not have an allowed role', () => {
    renderWithAuthContext({
      ...mockAuthContext,
      user: { ...mockUser, role: ROLES.USER },
    }, [ROLES.ADMIN]);

    expect(screen.queryByText('Visible only to allowed roles')).not.toBeInTheDocument();
  });

  it('should not render children if user is null', () => {
    renderWithAuthContext({
      ...mockAuthContext,
      user: null,
    }, [ROLES.USER]);

    expect(screen.queryByText('Visible only to allowed roles')).not.toBeInTheDocument();
  });
});
