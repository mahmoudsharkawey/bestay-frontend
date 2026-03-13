import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
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
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { Skeleton } from "@/shared/components/ui/skeleton";
import ChartCard from "@/features/admin/components/ChartCard";
import { adminService } from "@/features/admin/services/admin.api";

const COLORS = [
  "#f5a014",
  "#1b3d6f",
  "#16a34a",
  "#8b5cf6",
  "#0ea5e9",
  "#e11d48",
];

const buildChartArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.labels && data?.data) {
    return data.labels.map((label, i) => ({
      name: label,
      value: data.data[i] || 0,
    }));
  }
  return [];
};

export default function AdminAnalyticsPage() {
  const { t } = useTranslation();

  const revenue = useQuery({
    queryKey: ["admin-analytics-revenue"],
    queryFn: () => adminService.getRevenueStats({ period: "monthly" }),
    retry: 1,
  });

  const conversionFunnel = useQuery({
    queryKey: ["admin-conversion-funnel"],
    queryFn: adminService.getConversionFunnel,
    retry: 1,
  });

  const usersByRole = useQuery({
    queryKey: ["admin-analytics-users-role"],
    queryFn: adminService.getUsersByRole,
    retry: 1,
  });

  const bookingsStatus = useQuery({
    queryKey: ["admin-analytics-bookings-status"],
    queryFn: adminService.getBookingsStatus,
    retry: 1,
  });

  const ratingsSummary = useQuery({
    queryKey: ["admin-ratings-summary"],
    queryFn: adminService.getRatingsSummary,
    retry: 1,
  });

  const topUnits = useQuery({
    queryKey: ["admin-top-units"],
    queryFn: () => adminService.getTopUnits({ by: "visits", limit: 5 }),
    retry: 1,
  });

  const isLoading =
    revenue.isLoading ||
    conversionFunnel.isLoading ||
    usersByRole.isLoading ||
    bookingsStatus.isLoading;

  const revenueChartData = buildChartArray(revenue.data?.data || {});
  const usersByRoleData = buildChartArray(usersByRole.data?.data || {});
  const bookingsStatusData = buildChartArray(bookingsStatus.data?.data || {});
  const funnelData = buildChartArray(conversionFunnel.data?.data || {});
  const topUnitsData = Array.isArray(topUnits.data?.data)
    ? topUnits.data.data
    : [];
  const ratingsData = ratingsSummary.data?.data || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {t("admin.analyticsTitle")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin.analyticsSubtitle")}
        </p>
      </div>

      {/* Revenue Trends (full width) */}
      <ChartCard title={t("admin.revenueTrends")}>
        {isLoading ? (
          <Skeleton className="h-72 rounded-lg" />
        ) : revenueChartData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <p className="text-sm text-slate-400 font-medium">{t("common.noResults")}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} dx={-10} tickFormatter={(val) => `$${val}`} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  fontWeight: 500,
                }}
                itemStyle={{ color: COLORS[0] }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={COLORS[0]}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRev)"
                activeDot={{ r: 6, fill: COLORS[0], stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Row: Users by Role + Bookings Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title={t("admin.usersByRole")}>
          {isLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={usersByRoleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {usersByRoleData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontWeight: 500,
                  }}
                  cursor={{ fill: "transparent" }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
        <ChartCard title={t("admin.topUnits")}>
          {topUnits.isLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : topUnitsData.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-12">
              {t("common.noResults")}
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={topUnitsData.map((u) => ({
                  name: u.title?.slice(0, 20) || u.id?.slice(0, 8),
                  value: u.count || u.bookings || u.visits || 0,
                }))}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
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
                <Bar dataKey="value" fill={COLORS[1]} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Top Units + Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title={t("admin.bookingsStatusDistribution")}>
          {isLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={bookingsStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bookingsStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontWeight: 500,
                  }}
                  cursor={{ fill: "transparent" }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title={t("admin.conversionFunnel")}>
          {conversionFunnel.isLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : funnelData.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-12">
              {t("common.noResults")}
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontWeight: 500,
                  }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {funnelData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Ratings Summary */}
      {ratingsData.distribution && (
        <ChartCard title={t("admin.ratingsSummary")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-5xl font-bold text-slate-800">
                {ratingsData.averageRating?.toFixed(1) || "—"}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {t("admin.averageRating")}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={Object.entries(ratingsData.distribution || {}).map(
                  ([star, count]) => ({ name: `${star}★`, value: count }),
                )}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Bar dataKey="value" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      )}
    </div>
  );
}
