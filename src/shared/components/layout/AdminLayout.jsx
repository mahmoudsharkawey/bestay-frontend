import { Outlet, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard } from 'lucide-react'

export default function AdminLayout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="font-bold text-primary text-lg">BeStay Admin</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`
            }
          >
            <LayoutDashboard size={16} />
            {t('nav.admin')}
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center px-6 shrink-0">
          <span className="text-sm text-muted-foreground">Admin Panel</span>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
