import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Ban,
  MapPin,
  ChevronRight,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";
import { useCreatePaymentIntent } from "@/features/payments/hooks/usePayments";
import { Button } from "@/shared/components/ui/button";
import StatusBadge from "./StatusBadge";

function formatDate(iso) {
  return iso
    ? new Date(iso).toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
}

export default function VisitCard({ visit, role, actions }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { t } = useTranslation();
  const {
    approve,
    isApproving,
    reject,
    isRejecting,
    confirm,
    isConfirming,
    cancel,
    isCancelling,
    acceptReschedule,
    isAcceptingReschedule,
    rejectReschedule,
    isRejectingReschedule,
    rescheduleVisitId,
    setRescheduleVisitId,
    rescheduleDate,
    setRescheduleDate,
    handleRescheduleSubmit,
    isRescheduling,
  } = actions;

  const navigate = useNavigate();
  const { mutate: createIntent, isPending: isCreatingIntent } =
    useCreatePaymentIntent();

  const handlePayNow = () => {
    createIntent(visit.id, {
      onSuccess: (res) => {
        navigate("/payments", {
          state: {
            clientSecret: res.data.clientSecret,
            visitId: visit.id,
          },
        });
      },
    });
  };

  const isLandlord = role === "LANDLORD";
  const isUser = role === "USER";
  const isPaymentPaid = visit.payment?.status === "PAID";

  // Display date: prefer rescheduleDate if RESCHEDULED, else proposedDate
  const displayDate =
    visit.status === "RESCHEDULE_PROPOSED" && visit.rescheduleDate
      ? visit.rescheduleDate
      : visit.proposedDate;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-4 items-start">
      {/* Unit image */}
      {visit.unit?.images?.[0] ? (
        <img
          src={visit.unit.images[0]}
          alt={visit.unit?.title}
          className="w-20 h-16 object-cover rounded-xl shrink-0 hidden sm:block"
        />
      ) : (
        <div className="w-20 h-16 rounded-xl bg-navy/10 shrink-0 items-center justify-center text-navy/20 text-2xl hidden sm:flex">
          🏠
        </div>
      )}

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
          <div>
            <Link
              to={`/units/${visit.unit?.id}`}
              className="font-semibold text-navy hover:text-orange transition-colors text-base line-clamp-1"
            >
              {visit.unit?.title || t("visits.unknownUnit")}
            </Link>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />
              {visit.unit?.city || "—"}
            </p>
          </div>
          <StatusBadge status={visit.status} />
        </div>

        {/* Dates */}
        <div className="text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-1 mb-3">
          {visit.status === "RESCHEDULE_PROPOSED" && visit.rescheduleDate ? (
            <>
              <span className="flex items-center gap-1 line-through text-slate-300">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(visit.proposedDate)}
              </span>
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                <ChevronRight className="h-3.5 w-3.5" />
                {formatDate(visit.rescheduleDate)}
              </span>
            </>
          ) : (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-orange" />
              {formatDate(displayDate)}
            </span>
          )}
          {/* Tenant name shown to landlord */}
          {isLandlord && visit.user && (
            <span className="text-slate-400">
              {t("visits.tenant")}:{" "}
              <strong className="text-slate-600">{visit.user.name}</strong>
            </span>
          )}
        </div>

        {/* ── Action buttons / inline reschedule form ─────────────── */}
        <div className="flex flex-wrap gap-2">
          {/* LANDLORD actions on PENDING */}
          {isLandlord && visit.status === "PENDING_OWNER" && (
            <>
              <Button
                size="sm"
                onClick={() => approve(visit.id)}
                disabled={isApproving}
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg h-8 px-3 text-xs"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                {t("visits.approve")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => reject(visit.id)}
                disabled={isRejecting}
                className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg h-8 px-3 text-xs"
              >
                <XCircle className="h-3.5 w-3.5 mr-1" />
                {t("visits.reject")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRescheduleVisitId(visit.id)}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg h-8 px-3 text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                {t("visits.proposeReschedule")}
              </Button>
            </>
          )}

          {/* LANDLORD actions on APPROVED */}
          {isLandlord && visit.status === "APPROVED" && (
            <>
              {!showDatePicker ? (
                <Button
                  size="sm"
                  onClick={() => setShowDatePicker(true)}
                  disabled={!isPaymentPaid}
                  title={
                    !isPaymentPaid ? t("visits.confirmRequiresPaid") : undefined
                  }
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-8 px-3 text-xs disabled:opacity-50"
                >
                  <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                  {t("visits.confirmVisit")}
                </Button>
              ) : (
                <div className="w-full flex flex-wrap items-end gap-2 bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-emerald-700 font-medium">
                      {t("visits.startDate")}
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (endDate && e.target.value > endDate) setEndDate("");
                      }}
                      className="border border-emerald-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-emerald-700 font-medium">
                      {t("visits.endDate")}
                    </label>
                    <input
                      type="date"
                      min={startDate || new Date().toISOString().split("T")[0]}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      disabled={!startDate}
                      className="border border-emerald-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white disabled:opacity-50"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      confirm({
                        visitId: visit.id,
                        data: {
                          startDate: new Date(startDate).toISOString(),
                          endDate: new Date(endDate).toISOString(),
                        },
                      })
                    }
                    disabled={isConfirming || !startDate || !endDate}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-7 px-3 text-xs"
                  >
                    {isConfirming ? t("common.saving") : t("visits.confirmVisit")}
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDatePicker(false);
                      setStartDate("");
                      setEndDate("");
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              )}
              {!isPaymentPaid && (
                <span className="flex items-center gap-1 text-xs text-amber-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {t("visits.awaitingPayment")}
                </span>
              )}
            </>
          )}

          {/* USER actions on PENDING */}
          {isUser && visit.status === "PENDING" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => cancel(visit.id)}
              disabled={isCancelling}
              className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg h-8 px-3 text-xs"
            >
              <Ban className="h-3.5 w-3.5 mr-1" />
              {t("visits.cancelVisit")}
            </Button>
          )}

          {/* USER actions on APPROVED — Pay Now */}
          {isUser && visit.status === "APPROVED" && (
            <div className="flex flex-col gap-1">
              {!isPaymentPaid ? (
                <>
                  <Button
                    onClick={handlePayNow}
                    disabled={isCreatingIntent}
                    variant="ghost"
                    className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    {isCreatingIntent ? "..." : t("visits.payNow")}
                  </Button>
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {t("visits.paymentRequired")}
                  </p>
                </>
              ) : (
                <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 w-fit">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {t("visits.paidWaitingForLandlord")}
                </p>
              )}
            </div>
          )}

          {/* USER actions on RESCHEDULED */}
          {isUser && visit.status === "RESCHEDULE_PROPOSED" && (
            <>
              <p className="w-full text-xs text-blue-600 flex items-center gap-1 mb-1">
                <RefreshCw className="h-3.5 w-3.5" />
                {t("visits.landlordProposedDate")}
                <span className="text-slate-400">
                  {formatDate(visit?.pendingDate)}
                </span>
              </p>
              <Button
                size="sm"
                onClick={() => acceptReschedule(visit.id)}
                disabled={isAcceptingReschedule}
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg h-8 px-3 text-xs"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                {t("visits.acceptReschedule")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => rejectReschedule(visit.id)}
                disabled={isRejectingReschedule}
                className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg h-8 px-3 text-xs"
              >
                <XCircle className="h-3.5 w-3.5 mr-1" />
                {t("visits.rejectReschedule")}
              </Button>
            </>
          )}
        </div>

        {/* Inline reschedule date input for LANDLORD */}
        {isLandlord && rescheduleVisitId === visit.id && (
          <div className="mt-3 flex flex-wrap items-center gap-2 bg-blue-50 rounded-xl p-3 border border-blue-100">
            <label className="text-xs text-blue-700 font-medium shrink-0">
              {t("visits.newDateLabel")}
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
              className="border border-blue-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            />
            <Button
              size="sm"
              onClick={() => handleRescheduleSubmit(visit.id)}
              disabled={isRescheduling || !rescheduleDate}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-7 px-3 text-xs"
            >
              {isRescheduling ? t("common.saving") : t("visits.send")}
            </Button>
            <button
              type="button"
              onClick={() => {
                setRescheduleVisitId(null);
                setRescheduleDate("");
              }}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              {t("common.cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
