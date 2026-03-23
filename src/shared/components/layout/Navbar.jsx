import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useUiStore } from "@/shared/stores/ui.store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  User,
  CalendarDays,
  MapPin,
  CreditCard,
  LogOut,
  Settings,
  SlidersHorizontal,
  Building2,
  Plus,
  Bell,
  Heart,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Logo from "@/shared/components/layout/Logo";
import { getInitials } from "@/shared/utils/user";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { language, setLanguage } = useUiStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { unreadCount } = useNotifications();

  const initials = getInitials(user?.name);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-orange ${
      isActive ? "text-navy" : "text-slate-500"
    }`;

  const toggleLang = () => setLanguage(language === "en" ? "ar" : "en");

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  const isLandlord = user?.role === "LANDLORD";
  const isUser = user?.role === "USER";

  const dropdownLinks = [
    { to: "/profile", icon: User, label: t("nav.myProfile") },
    ...(isUser
      ? [
          { to: "/favorites", icon: Heart, label: t("nav.myFavorites") },
          { to: "/preferences", icon: SlidersHorizontal, label: t("nav.myPreferences", "My Preferences") },
        ]
      : []),
    { to: "/visits", icon: MapPin, label: t("nav.myVisits") },
    { to: "/bookings", icon: CalendarDays, label: t("nav.myBookings") },
    ...(isLandlord
      ? [
          { to: "/units/my", icon: Building2, label: t("nav.myUnits") },
          { to: "/units/new", icon: Plus, label: t("units.addUnit") },
        ]
      : []),
    ...(isUser
      ? [
          {
            to: "/payments/history",
            icon: CreditCard,
            label: t("nav.payments"),
          },
        ]
      : []),
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-slate-100"
      style={{ boxShadow: "0 1px 4px rgba(27, 61, 111, 0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="lg" showText={false} />

          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <NavLink to="/units" className={navLinkClass}>
                  {t("nav.explore")}
                </NavLink>
                <NavLink to="/bookings" className={navLinkClass}>
                  {t("nav.bookings")}
                </NavLink>
                {/* <NavLink to="/visits" className={navLinkClass}>
                  {t("nav.visits")}
                </NavLink> */}
                {isLandlord && (
                  <>
                    <NavLink to="/landlord" className={navLinkClass}>
                      {t("nav.myDashboard")}
                    </NavLink>
                    {/* <NavLink to="/units/my" className={navLinkClass}>
                      {t("nav.myUnits")}
                    </NavLink> */}
                    {/* <NavLink
                      to="/units/new"
                      className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 bg-orange hover:bg-orange-hover text-white rounded-lg transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {t("units.addUnit")}
                    </NavLink> */}
                  </>
                )}
              </>
            ) : (
              <>
                <NavLink to="/units" className={navLinkClass}>
                  {t("nav.findHousing")}
                </NavLink>
                <NavLink to="/" className={navLinkClass}>
                  {t("nav.universities")}
                </NavLink>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-navy transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-50"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "AR" : "EN"}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Notifications Bell */}
                <Link
                  to="/notifications"
                  className="relative p-2 text-slate-500 hover:text-navy hover:bg-slate-50 rounded-full transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
                  )}
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    <Avatar className="h-9 w-9 border-2 border-slate-100">
                      <AvatarImage src={user?.picture} alt={user?.name} />
                      <AvatarFallback className="text-xs bg-orange-light text-orange font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-navy hidden lg:block max-w-[120px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-100 py-2"
                      style={{
                        boxShadow: "0 8px 32px rgba(27, 61, 111, 0.12)",
                      }}
                    >
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-navy truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-1">
                        {dropdownLinks.map(({ to, icon: Icon, label }) => (
                          <Link
                            key={label}
                            to={to}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy transition-colors"
                          >
                            <Icon className="h-4 w-4 text-slate-400" />
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          {t("common.logOut")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="h-9 rounded-lg border-navy text-navy hover:bg-navy hover:text-white text-sm font-medium"
                  >
                    {t("nav.logIn")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="h-9 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold">
                    {t("nav.signUp")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-slate-600 hover:text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-1">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-3 py-3 mb-2">
                  <Avatar className="h-10 w-10 border-2 border-slate-100">
                    <AvatarImage src={user?.picture} alt={user?.name} />
                    <AvatarFallback className="text-xs bg-orange-light text-orange font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-2">
                  <NavLink
                    to="/units"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav.explore")}
                  </NavLink>
                  {isLandlord && (
                    <>
                      <NavLink
                        to="/landlord"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Building2 className="h-4 w-4 text-slate-400" />
                        {t("nav.myDashboard")}
                      </NavLink>
                      <NavLink
                        to="/units/my"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Building2 className="h-4 w-4 text-slate-400" />
                        {t("nav.myUnits")}
                      </NavLink>
                      <NavLink
                        to="/units/new"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-orange rounded-lg hover:bg-orange/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Plus className="h-4 w-4" />
                        {t("units.addUnit")}
                      </NavLink>
                    </>
                  )}
                  {dropdownLinks.map(({ to, icon: Icon, label }) => (
                    <NavLink
                      key={label}
                      to={to}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="h-4 w-4 text-slate-400" />
                      {label}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-danger rounded-lg hover:bg-danger/5"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("common.logOut")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/units"
                  className="block px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.findHousing")}
                </NavLink>
                <div className="pt-2 flex flex-col gap-2 px-3">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full h-10 rounded-lg border-navy text-navy"
                    >
                      {t("nav.logIn")}
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full h-10 rounded-lg bg-orange hover:bg-orange-hover text-white font-semibold">
                      {t("nav.signUp")}
                    </Button>
                  </Link>
                </div>
              </>
            )}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-2 text-sm text-slate-500 hover:text-navy"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
