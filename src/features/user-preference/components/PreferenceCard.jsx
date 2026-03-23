import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  MapPin,
  GraduationCap,
  DollarSign,
  BedDouble,
  Ruler,
  Sofa,
  Trash2,
  Pencil,
} from "lucide-react";

/**
 * Read-only card showing the current user preference.
 * @param {{ preference: object, onEdit: () => void, onDelete: () => void, isDeleting: boolean }} props
 */
export default function PreferenceCard({
  preference,
  onEdit,
  onDelete,
  isDeleting = false,
}) {
  const { t } = useTranslation();

  if (!preference) return null;

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-navy">
          {t("preferences.yourPreferences")}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="text-sm gap-1.5"
          >
            <Pencil className="h-3.5 w-3.5" />
            {t("common.edit")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting}
            className="text-sm gap-1.5 text-danger border-danger/30 hover:bg-danger/5 hover:text-danger"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t("common.delete")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Unit Type */}
          <InfoItem
            icon={BedDouble}
            label={t("preferences.unitType")}
            value={preference.unitType ? t(`units.unitTypes.${preference.unitType}`, preference.unitType) : "—"}
          />

          {/* Gender Type */}
          <InfoItem
            icon={null}
            label={t("preferences.genderType")}
            value={preference.genderType ? t(`units.genderTypes.${preference.genderType}`, preference.genderType) : "—"}
          />

          {/* Budget Range */}
          <InfoItem
            icon={DollarSign}
            label={t("preferences.budget")}
            value={
              preference.minBudget || preference.maxBudget
                ? `${preference.minBudget ?? "—"} – ${preference.maxBudget ?? "—"}`
                : "—"
            }
          />

          {/* City */}
          <InfoItem
            icon={MapPin}
            label={t("preferences.city")}
            value={preference.city}
          />

          {/* University */}
          {preference.university && (
            <InfoItem
              icon={GraduationCap}
              label={t("preferences.university")}
              value={preference.university}
            />
          )}

          {/* Rooms */}
          <InfoItem
            icon={BedDouble}
            label={t("preferences.rooms")}
            value={preference.rooms}
          />

          {/* Max Distance */}
          {preference.maxDistance && (
            <InfoItem
              icon={Ruler}
              label={t("preferences.maxDistance")}
              value={`${preference.maxDistance} km`}
            />
          )}

          {/* Furnished */}
          <InfoItem
            icon={Sofa}
            label={t("preferences.furnished")}
            value={preference.furnished ? t("preferences.yes") : t("preferences.no")}
          />
        </div>

        {/* Facilities */}
        {preference.facilities?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-sm font-medium text-slate-600 mb-2">
              {t("preferences.facilities")}
            </p>
            <div className="flex flex-wrap gap-2">
              {preference.facilities.map((f) => (
                <Badge
                  key={f}
                  variant="secondary"
                  className="text-xs"
                >
                  {t(`units.facilityLabels.${f}`, f.replace(/_/g, " "))}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      {Icon && <Icon className="h-4 w-4 text-orange mt-0.5 shrink-0" />}
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-navy">{value || "—"}</p>
      </div>
    </div>
  );
}
