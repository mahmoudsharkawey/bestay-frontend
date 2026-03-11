import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function PaymentSuccessPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  
  const isSuccess = redirectStatus === "succeeded";

  if (!paymentIntent) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Invalid Session</h1>
          <p className="text-slate-500 mb-6">No payment intent found.</p>
          <Button onClick={() => navigate("/visits")} className="w-full">
            Back to Visits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
        {isSuccess ? (
          <div className="py-4">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
            <p className="text-slate-500 mb-8">
              Your payment has been completed. The landlord has been notified and your booking is being created.
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                to="/bookings"
                className="flex items-center justify-center w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                View My Bookings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                to="/visits"
                className="flex items-center justify-center w-full h-11 bg-white hover:bg-slate-50 text-slate-600 font-medium rounded-xl border border-slate-200 transition-colors"
              >
                Back to Visits
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Process Failed</h1>
            <p className="text-slate-500 mb-8">
              We encountered an issue verifying your payment. Please check your visits or contact support.
            </p>
            <Button onClick={() => navigate("/visits")} className="w-full">
              Back to Visits
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
