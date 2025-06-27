import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import UserSettings from "./pages/UserSettings";
import About from "./pages/About";
import ManageContent from "./pages/ManageContent";
import { ROLES } from "./constants/roles";
import UserList from "./pages/UserList";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/register" element={
            <AppLayout>
              <Register />
            </AppLayout>
          } />
          <Route
            path="/login"
            element={
              <AppLayout>
                <Login />
              </AppLayout>
            }
          />
          <Route
            path="/about"
            element={
              <AppLayout>
                <About />
              </AppLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
                <AppLayout>
                  <AdminDashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/user-list"
            element={
              <ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
                <AppLayout>
                  <UserList />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-settings"
            element={
              <AppLayout>
                <ProtectedRoute requiredRoles={[ROLES.USER]}>
                  <UserSettings />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/manage-content"
            element={
              <AppLayout>
                <ProtectedRoute requiredRoles={[ROLES.ADMIN, ROLES.EDITOR]}>
                  <ManageContent />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <AppLayout>
                <Unauthorized />
              </AppLayout>
            }
          />
          <Route
            path="*"
            element={
              <AppLayout>
                <NotFound />
              </AppLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
