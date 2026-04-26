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
import useAuthStore from './store/auth.store'
import { useEffect } from 'react'

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

  // const { authReady, init } = useAuthStore()
  // useEffect(() => {
  //   init(); // silently restore session on page refresh
  // }, []);

  // Don't render anything until we know auth state
  // prevents flashing /login when user is actually logged in
  // if (!authReady) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  //     </div>
  //   );
  // }

  return <RouterProvider router={router} />
}
