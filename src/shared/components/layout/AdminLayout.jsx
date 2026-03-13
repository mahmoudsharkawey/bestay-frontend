import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  Eye,
  Star,
  BarChart3,
  LogOut,
  Globe,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { useAuthStore } from "@/shared/stores/auth.store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/shared/components/ui/sidebar";
import { useUiStore } from "@/shared/stores/ui.store";

const NAV_GROUPS = [
  {
    titleKey: "admin.navGroupMain",
    items: [
      {
        to: "/admin",
        icon: LayoutDashboard,
        labelKey: "admin.navDashboard",
        end: true,
      },
    ],
  },
  {
    titleKey: "admin.navGroupManagement",
    items: [
      { to: "/admin/users", icon: Users, labelKey: "admin.navUsers" },
      { to: "/admin/listings", icon: Building2, labelKey: "admin.navListings" },
      {
        to: "/admin/bookings",
        icon: CalendarCheck,
        labelKey: "admin.navBookings",
      },
      { to: "/admin/visits", icon: Eye, labelKey: "admin.navVisits" },
      { to: "/admin/reviews", icon: Star, labelKey: "admin.navReviews" },
    ],
  },
  {
    titleKey: "admin.navGroupInsights",
    items: [
      {
        to: "/admin/analytics",
        icon: BarChart3,
        labelKey: "admin.navAnalytics",
      },
    ],
  },
];

export function AppSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-16 flex justify-center border-b border-sidebar-border px-6">
        <div className="flex items-center">
          <span className="font-bold text-lg">
            <span className="text-orange">Be</span>
            <span className="text-navy">Stay</span>
          </span>
          <span className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{t(group.titleKey)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = item.end
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to);

                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        asChild
                        tooltip={t(item.labelKey)}
                        isActive={isActive}
                      >
                        <Link to={item.to}>
                          <item.icon />
                          <span>{t(item.labelKey)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture} />
            <AvatarFallback className="bg-navy/10 text-navy text-xs">
              {(user?.name || "A").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">
              {user?.name || "Admin"}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 mt-1 gap-2"
        >
          <LogOut className="h-4 w-4" />
          {t("common.logOut")}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function AdminLayout() {
  const { language, setLanguage } = useUiStore();
  const toggleLang = () => setLanguage(language === "en" ? "ar" : "en");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 lg:px-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ms-2" />
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-navy transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-50"
          >
            <Globe className="h-4 w-4" />
            <span>{language === "en" ? "AR" : "EN"}</span>
          </button>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto bg-slate-50">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
