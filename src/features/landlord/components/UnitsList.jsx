import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Building2, Plus, Pencil, Trash2, Eye, MapPin } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function UnitsList({ units, isLoading, onView, onEdit, onDelete }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-navy">{t("units.myUnits")}</h2>
        <Link
          to="/units/my"
          className="text-xs text-orange hover:underline"
        >
          {t("common.viewAll")}
        </Link>
      </div>
      {isLoading ? (
        <div className="divide-y divide-slate-50">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse bg-slate-50 m-4 rounded-xl"
            />
          ))}
        </div>
      ) : units.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-slate-300 gap-3">
          <Building2 className="h-12 w-12" />
          <p className="text-sm font-medium text-slate-400">
            {t("units.noUnitsYet")}
          </p>
          <Button
            onClick={() => navigate("/units/new")}
            className="bg-orange hover:bg-orange-hover text-white rounded-xl mt-1"
          >
            <Plus className="h-4 w-4 mr-2" /> {t("units.addUnit")}
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={
                    unit.images?.[0] ||
                    "https://placehold.co/48x48/1B3D6F/white?text=U"
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy text-sm truncate">
                  {unit.title}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {unit.city}
                  <span className="mx-1">·</span>
                  <span className="font-medium text-orange">
                    ${unit.price}/mo
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onView(unit.id)}
                  className="p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                  title={t("common.view")}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit(unit.id)}
                  className="p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                  title={t("common.edit")}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(unit.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title={t("common.delete")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
