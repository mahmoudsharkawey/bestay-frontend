import { useTranslation } from "react-i18next";
import {
  Users,
  Building2,
  CalendarCheck,
  DollarSign,
  Eye,
  UserCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "@/shared/components/ui/skeleton";
import StatCard from "@/features/admin/components/StatCard";
import ChartCard from "@/features/admin/components/ChartCard";
import EmptyChartState from "@/features/admin/components/EmptyChartState";
import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { CHART_COLORS, PIE_COLORS, buildChartArray } from "@/features/admin/constants";

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const {
    kpis,
    revenueData,
    bookingsData,
    usersGrowthData,
    visitsStatusData,
    isLoading,
    isChartsLoading,
  } = useAdminDashboard();

  const revenueChartData = buildChartArray(revenueData);
  const bookingsChartData = buildChartArray(bookingsData);
  const usersGrowthChartData = buildChartArray(usersGrowthData);
  const visitsStatusChartData = buildChartArray(visitsStatusData);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {t("admin.dashboard")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin.dashboardSubtitle")}
        </p>
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={Users}
            label={t("admin.totalUsers")}
            value={kpis.usersCount ?? 0}
            iconClassName="bg-navy/10 text-navy"
            to="/admin/users"
          />
          <StatCard
            icon={Building2}
            label={t("admin.totalUnits")}
            value={kpis.unitsCount ?? 0}
            iconClassName="bg-orange/10 text-orange"
            to="/admin/listings"
          />
          <StatCard
            icon={CalendarCheck}
            label={t("admin.totalBookings")}
            value={kpis.bookingsCount ?? 0}
            iconClassName="bg-green-100 text-green-700"
            to="/admin/bookings"
          />
          <StatCard
            icon={DollarSign}
            label={t("admin.totalRevenue")}
            value={`$${(kpis.totalRevenue ?? 0).toLocaleString()}`}
            iconClassName="bg-purple-100 text-purple-700"
            to="/admin/analytics"
          />
          <StatCard
            icon={Eye}
            label={t("admin.totalVisits")}
            value={kpis.totalVisits ?? 0}
            iconClassName="bg-sky-100 text-sky-600"
            to="/admin/visits"
          />
          <StatCard
            icon={UserCheck}
            label={t("admin.totalLandlords")}
            value={kpis.landlordsCount ?? 0}
            iconClassName="bg-emerald-100 text-emerald-700"
          />
        </div>
      )}

      {/* Charts Row 1: Revenue + Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title={t("admin.revenueTrends")}>
          {isChartsLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : revenueChartData.length === 0 ? (
            <EmptyChartState />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient
                    id="colorRevSmall"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS[0]}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS[0]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    fontWeight: 500,
                  }}
                  itemStyle={{ color: CHART_COLORS[0] }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevSmall)"
                  activeDot={{
                    r: 6,
                    fill: CHART_COLORS[0],
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title={t("admin.visitStatusDistribution")}>
          {isChartsLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : visitsStatusChartData.length === 0 ? (
            <EmptyChartState />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={visitsStatusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {visitsStatusChartData.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontWeight: 500,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-medium text-slate-600">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Charts Row 2: Users Growth + Visit Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title={t("admin.usersGrowth")}>
          {isChartsLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : usersGrowthChartData.length === 0 ? (
            <EmptyChartState />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={usersGrowthChartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS[2]}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS[2]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontWeight: 500,
                  }}
                  itemStyle={{ color: CHART_COLORS[2] }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_COLORS[2]}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  activeDot={{ r: 5, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title={t("admin.bookingsOverTime")}>
          {isChartsLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : bookingsChartData.length === 0 ? (
            <EmptyChartState />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={bookingsChartData} margin={{ top: 10 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontWeight: 500,
                  }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="value"
                  fill={CHART_COLORS[1]}
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
