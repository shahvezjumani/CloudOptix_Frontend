import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import useAuthStore from './store/auth.store'

// Pages & Layouts
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OTPPage from './pages/OTPPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import AnimatedLayout from './layouts/AnimatedLayout'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import MyFilesPage from './pages/MyFilesPage'
import UploadPage from './pages/UploadPage'
import AISearchPage from './pages/AISearchPage'
import OptimizationPage from './pages/OptimizationPage'
import SharedFilesPage from './pages/SharedFilesPage'
import SettingsPage from './pages/SettingsPage'
import ProtectedRoute from './layouts/ProtectedRoute' // Import your ProtectedRoute

export default function App() {
  const { authReady, init, user } = useAuthStore()

  useEffect(() => {
    init(); // Silently restore session
  }, [init]);

  // We use useMemo to prevent the router from being re-created on every render,
  // but it will re-evaluate correctly when 'user' changes.
  const router = useMemo(() =>
    createBrowserRouter(
      createRoutesFromElements(
        <>
          {/* Public Routes */}
          <Route element={<AnimatedLayout />}>
            <Route path="/" element={<LandingPage />} />
            {/* If user is logged in, redirect them away from login/signup to dashboard */}
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
            {/* <Route path="/otp" element={<OTPPage />} /> */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="files" element={<MyFilesPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="ai-search" element={<AISearchPage />} />
            <Route path="optimization" element={<OptimizationPage />} />
            <Route path="shared" element={<SharedFilesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<div className="flex items-center justify-center h-screen text-2xl text-white">404 — Page Not Found</div>} />
        </>
      )
    ), [user]); // Re-run this logic whenever the user state changes

  // 1. Wait for Auth to be ready (prevents flash of login page)
  if (!authReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#09090b]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // 2. Render the router once auth is checked
  return <RouterProvider router={router} />;
}