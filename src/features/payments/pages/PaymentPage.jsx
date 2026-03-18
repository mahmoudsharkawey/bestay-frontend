
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { Loader2, ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";

import { useVisitDetails } from "@/features/visits/hooks/useVisitDetails";
import CheckoutForm from "@/features/payments/components/CheckoutForm";
import { Button } from "@/shared/components/ui/button";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const visitId = location.state?.visitId || searchParams.get("visitId");
  const clientSecret = location.state?.clientSecret;

  const { data: visitData, isLoading: isLoadingVisit } = useVisitDetails(visitId);

  const visit = visitData?.data;

  const amount = visit?.payment?.amount;
  const convertedAmount = amount ? Number(amount / 100) : 0;

  if (!visitId || !clientSecret) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">
          {t("payments.invalidVisit")}
        </h2>
        <Button onClick={() => navigate("/visits")}>{t("common.back")}</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">
            {t("payments.completePayment")}
          </h1>
        </div>

        {isLoadingVisit || !stripePromise ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
  
          </div>
        ) : visit ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Summary */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm overflow-hidden sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                {t("payments.orderSummary")}
              </h2>

              <div className="flex gap-4 mb-6">
                <img
                  src={
                    visit?.unit?.images?.[0] || "https://placehold.co/100x100"
                  }
                  alt={visit?.unit?.title}
                  className="w-24 h-24 object-cover rounded-xl shrink-0 border border-slate-100"
                />
                <div>
                  <h3 className="font-semibold text-slate-800 line-clamp-2">
                    {visit?.unit?.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {visit?.unit?.city}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {t("payments.date")}
                  </span>
                  <span className="font-medium text-slate-900">
                    {new Date(visit.proposedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {t("payments.time")}
                  </span>
                  <span className="font-medium text-slate-900">
                    {new Date(visit.proposedDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-slate-200/60">
                  <span className="text-slate-500">
                    {t("payments.visitFee")}
                  </span>
                  <span className="font-semibold text-blue-600">
                    {convertedAmount} EGP
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Payment Elements */}
            <div className="lg:col-span-7">
              {clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#2563eb",
                        borderRadius: "12px",
                      },
                    },
                  }}
                >
                  <CheckoutForm amount={convertedAmount} />
                </Elements>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-slate-400 mb-4" />
                  <p className="text-slate-500 font-medium">
                    {t("payments.preparingCheckout")}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm text-center">
            <p className="text-slate-500">{t("common.error")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
