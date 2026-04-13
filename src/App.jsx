import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OTPPage from './pages/OTPPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import Test from './pages/Test'
import AnimatedLayout from './layouts/AnimatedLayout'
import ProtectedLayout from './layouts/ProtectedRoute'
import useAuthStore from './store/auth.store'

function AnimatedRoutes() {

  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route element={<AnimatedLayout />}>
        <Route path='/' element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route element={<ProtectedLayout isAuthenticated={isAuthenticated} />}>
          <Route path="/test/*" element={<Test />} />
        </Route>
      </Route>
      <Route path="*" element={<div className='flex items-center justify-center h-screen text-2xl'>404 - Page Not Found</div>} /></>
    )
  )


  return router
}

export default function App() {
  return (
    <RouterProvider router={AnimatedRoutes()} />
  )
}
