import { useTranslation } from "react-i18next";

export default function EmptyChartState() {
  const { t } = useTranslation();

  return (
    <div className="h-[280px] flex items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
      <p className="text-sm text-slate-400 font-medium">
        {t("common.noResults")}
      </p>
    </div>
  );
}
