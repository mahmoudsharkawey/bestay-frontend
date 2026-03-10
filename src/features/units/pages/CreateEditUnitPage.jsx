import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { useCreateEditUnit } from "@/features/units/hooks/useCreateEditUnit";
import { unitsService } from "@/features/units/services/units.api";
import UnitStepBasicInfo from "@/features/units/components/UnitStepBasicInfo";
import UnitStepDetails from "@/features/units/components/UnitStepDetails";
import UnitStepMedia from "@/features/units/components/UnitStepMedia";

const STEPS = [
  { key: "basic", label: "units.steps.basic" },
  { key: "details", label: "units.steps.details" },
  { key: "media", label: "units.steps.media" },
];

function CreateEditForm({ mode, unit }) {
  const { t } = useTranslation();
  const { form, step, totalSteps, nextSt0ep, prevStep, submitForm, isPending } =
    useCreateEditUnit({ mode, unit });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-navy mb-2">
          {mode === "edit" ? t("units.editUnit") : t("units.createUnit")}
        </h1>

        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-8 mt-4">
          {STEPS.map((s, i) => {
            const idx = i + 1;
            const done = step > idx;
            const active = step === idx;
            return (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-1.5 flex-shrink-0`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      done
                        ? "bg-green-500 text-white"
                        : active
                          ? "bg-navy text-white"
                          : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : idx}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${active ? "text-navy" : "text-slate-400"}`}
                  >
                    {t(s.label)}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${step > idx ? "bg-green-400" : "bg-slate-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <Form {...form}>
            {/* form onSubmit is disabled — submit is triggered only via explicit button click */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {step === 1 && <UnitStepBasicInfo form={form} />}
              {step === 2 && <UnitStepDetails form={form} />}
              {step === 3 && <UnitStepMedia form={form} />}

              {/* Navigation */}
              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 rounded-xl h-11"
                  >
                    ← {t("common.back")}
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-navy hover:bg-navy/90 text-white rounded-xl h-11"
                  >
                    {t("common.next")} →
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={isPending}
                    onClick={submitForm}
                    className="flex-1 bg-orange hover:bg-orange-hover text-white rounded-xl h-11"
                  >
                    {isPending && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {isPending
                      ? t("common.saving")
                      : mode === "edit"
                        ? t("units.saveChanges")
                        : t("units.publishUnit")}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default function CreateEditUnitPage() {
  const { id } = useParams();
  const mode = id ? "edit" : "create";

  const { data, isLoading } = useQuery({
    queryKey: ["unit", id],
    queryFn: () => unitsService.getUnitById(id),
    enabled: !!id,
  });

  if (id && isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange" />
      </div>
    );

  // Support multiple response shapes (same as useUnitDetail)
  const rawData = data?.data;
  const unit = rawData?.unit ?? (rawData?.id ? rawData : null);

  return <CreateEditForm mode={mode} unit={unit} />;
}
