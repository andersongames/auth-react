import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';

type RenderWithProvidersOptions = {
  route?: string; // initial route for MemoryRouter
  routerProps?: Partial<MemoryRouterProps>; // allows passing additional props to the MemoryRouter in the future
};

/**
 * Renders a component with all the application's global providers,
 * using MemoryRouter for navigation simulation.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  { route = '/', routerProps }: RenderWithProvidersOptions = {}
): RenderResult {
  return render(
    <MemoryRouter initialEntries={[route]} {...routerProps}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
}
