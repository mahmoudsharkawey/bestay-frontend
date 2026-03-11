import { useTranslation } from "react-i18next";
import { CreditCard, Calendar, Clock, DollarSign, Loader2, Info } from "lucide-react";
import { usePaymentHistory } from "@/features/payments/hooks/usePayments";

const STATUS_CONFIG = {
  PENDING: {
    label: "payments.status.pending",
    color: "bg-amber-100 text-amber-700",
  },
  PAID: {
    label: "payments.status.paid",
    color: "bg-emerald-100 text-emerald-800",
  },
  FAILED: {
    label: "payments.status.failed",
    color: "bg-red-100 text-red-700",
  },
  REFUNDED: {
    label: "payments.status.refunded",
    color: "bg-purple-100 text-purple-700",
  },
};

function StatusBadge({ status }) {
  const { t } = useTranslation();
  const cfg = STATUS_CONFIG[status] || {
    label: status,
    color: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.color}`}>
      {t(cfg.label, status)}
    </span>
  );
}

export default function PaymentHistoryPage() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = usePaymentHistory();

  const payments = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            {t("payments.historyTitle")}
          </h1>
          <p className="text-slate-500 mt-1">
            {t("payments.historySubtitle")}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-orange" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
            <p className="text-red-500 font-medium">{t("common.error")}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {t("payments.noPayments")}
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              {t("payments.noPaymentsHint")}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {payments.map((payment) => (
              <div 
                key={payment.id || payment._id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Decorative border bar for status */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  payment.status === 'PAID' ? 'bg-emerald-500' :
                  payment.status === 'FAILED' ? 'bg-red-500' :
                  payment.status === 'PENDING' ? 'bg-amber-500' :
                  'bg-slate-300'
                }`} />

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Left Column: Context */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                          {t("payments.paymentForVisit")}
                          <span className="text-sm font-normal text-slate-500">#{payment.id.slice(-6).toUpperCase()}</span>
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(payment.createdAt).toLocaleDateString()}
                          <span className="px-1 text-slate-300">•</span>
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(payment.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {payment.stripePaymentIntentId && (
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-50 w-fit px-2 py-1 rounded-md">
                        <Info className="w-3 h-3" />
                        Stripe ID: {payment.stripePaymentIntentId}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Amount & Status */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 gap-2 sm:gap-3">
                    <div className="flex items-start">
                      <DollarSign className="w-4 h-4 text-slate-400 mt-1 mr-0.5" />
                      <span className="text-2xl font-bold text-slate-900 leading-none">
                        {(payment.amount / 100).toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500 font-medium ml-1 mt-1">
                        EGP
                      </span>
                    </div>
                    <StatusBadge status={payment.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
