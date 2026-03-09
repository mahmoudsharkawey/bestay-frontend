import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/shared/components/layout/MainLayout'
import AuthLayout from '@/shared/components/layout/AuthLayout'
import AdminLayout from '@/shared/components/layout/AdminLayout'
import { ProtectedRoute, GuestRoute, AdminRoute } from '@/shared/guards/RouteGuards'

// Feature pages
import HomePage from '@/features/home/pages/HomePage'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage'
import VerifyResetCodePage from '@/features/auth/pages/VerifyResetCodePage'
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage'
import UnitsPage from '@/features/units/pages/UnitsPage'
import UnitDetailPage from '@/features/units/pages/UnitDetailPage'
import BookingsPage from '@/features/bookings/pages/BookingsPage'
import ProfilePage from '@/features/profile/pages/ProfilePage'
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage'
import NotFoundPage from '@/shared/components/layout/NotFoundPage'

export const router = createBrowserRouter([
  // Public routes (MainLayout)
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/units', element: <UnitsPage /> },
      { path: '/units/:id', element: <UnitDetailPage /> },
    ],
  },

  // Protected routes (auth required, MainLayout)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/bookings', element: <BookingsPage /> },
          { path: '/profile', element: <ProfilePage /> },
        ],
      },
    ],
  },

  // Guest-only routes (redirect to / if already logged in)
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
          { path: '/verify-reset-code', element: <VerifyResetCodePage /> },
          { path: '/reset-password', element: <ResetPasswordPage /> },
        ],
      },
    ],
  },

  // Admin routes (ADMIN role required)
  {
    element: <AdminRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
        ],
      },
    ],
  },

  // 404
  { path: '*', element: <NotFoundPage /> },
])
