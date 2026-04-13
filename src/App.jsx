import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AnimatedLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="files" element={<MyFilesPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="ai-search" element={<AISearchPage />} />
        <Route path="optimization" element={<OptimizationPage />} />
        <Route path="shared" element={<SharedFilesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<div className="flex items-center justify-center h-screen text-2xl text-white">404 — Page Not Found</div>} />
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}
