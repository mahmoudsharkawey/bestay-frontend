import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/shared/components/layout/MainLayout";
import AuthLayout from "@/shared/components/layout/AuthLayout";
import AdminLayout from "@/shared/components/layout/AdminLayout";
import {
  ProtectedRoute,
  GuestRoute,
  AdminRoute,
  LandlordRoute,
} from "@/shared/guards/RouteGuards";

// Feature pages
import HomePage from "@/features/home/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import VerifyResetCodePage from "@/features/auth/pages/VerifyResetCodePage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import UnitsPage from "@/features/units/pages/UnitsPage";
import UnitDetailPage from "@/features/units/pages/UnitDetailPage";
import MyUnitsPage from "@/features/units/pages/MyUnitsPage";
import CreateEditUnitPage from "@/features/units/pages/CreateEditUnitPage";
import BookingsPage from "@/features/bookings/pages/BookingsPage";
import PaymentPage from "@/features/payments/pages/PaymentPage";
import PaymentSuccessPage from "@/features/payments/pages/PaymentSuccessPage";
import PaymentHistoryPage from "@/features/payments/pages/PaymentHistoryPage";
import MyVisitsPage from "@/features/visits/pages/MyVisitsPage";
import ScheduleVisitPage from "@/features/visits/pages/ScheduleVisitPage";
import MyFavoritesPage from "@/features/favorites/pages/MyFavoritesPage";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import UserPreferencePage from "@/features/user-preference/pages/UserPreferencePage";
import RecommendationsPage from "@/features/user-preference/pages/RecommendationsPage";
import LandlordDashboard from "@/features/landlord/pages/LandlordDashboard";
import PricingToolPage from "@/features/pricing/pages/PricingToolPage";
import NotFoundPage from "@/shared/components/layout/NotFoundPage";

// Admin pages
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import AdminUsersPage from "@/features/admin/pages/AdminUsersPage";
import AdminListingsPage from "@/features/admin/pages/AdminListingsPage";
import AdminBookingsPage from "@/features/admin/pages/AdminBookingsPage";
import AdminVisitsPage from "@/features/admin/pages/AdminVisitsPage";
import AdminReviewsPage from "@/features/admin/pages/AdminReviewsPage";
import AdminAnalyticsPage from "@/features/admin/pages/AdminAnalyticsPage";

export const router = createBrowserRouter([
  // Public routes (MainLayout)
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/units", element: <UnitsPage /> },
      { path: "/units/:id", element: <UnitDetailPage /> },
    ],
  },

  // Protected routes (auth required, MainLayout)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/bookings", element: <BookingsPage /> },
          { path: "/payments", element: <PaymentPage /> },
          { path: "/payments/history", element: <PaymentHistoryPage /> },
          { path: "/payments/success", element: <PaymentSuccessPage /> },
          { path: "/visits", element: <MyVisitsPage /> },
          { path: "/visits/schedule/:unitId", element: <ScheduleVisitPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/favorites", element: <MyFavoritesPage /> },
          { path: "/notifications", element: <NotificationsPage /> },
          { path: "/preferences", element: <UserPreferencePage /> },
          { path: "/recommendations", element: <RecommendationsPage /> },
          { path: "/units/my", element: <MyUnitsPage /> },
          { path: "/units/new", element: <CreateEditUnitPage /> },
          { path: "/units/:id/edit", element: <CreateEditUnitPage /> },
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
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/forgot-password", element: <ForgotPasswordPage /> },
          { path: "/verify-reset-code", element: <VerifyResetCodePage /> },
          { path: "/reset-password", element: <ResetPasswordPage /> },
        ],
      },
    ],
  },

  // Admin routes (ADMIN role required)
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "users", element: <AdminUsersPage /> },
          { path: "listings", element: <AdminListingsPage /> },
          { path: "bookings", element: <AdminBookingsPage /> },
          { path: "visits", element: <AdminVisitsPage /> },
          { path: "reviews", element: <AdminReviewsPage /> },
          { path: "analytics", element: <AdminAnalyticsPage /> },
        ],
      },
    ],
  },

  // Landlord routes (LANDLORD role required)
  {
    element: <LandlordRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/landlord", element: <LandlordDashboard /> },
          { path: "/pricing", element: <PricingToolPage /> },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFoundPage /> },
]);
