import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, Calendar, Home, CheckCircle, UserPlus, DollarSign } from "lucide-react";

const STICK_COLORS = {
  student: "bg-orange/10 text-orange border-orange/20",
  landlord: "bg-navy/10 text-navy border-navy/20",
};

export default function HowItWorks() {
  const { t } = useTranslation();

  const studentSteps = [
    { icon: <Search className="h-6 w-6" />, text: t("home.howItWorks.student.step1") },
    { icon: <Calendar className="h-6 w-6" />, text: t("home.howItWorks.student.step2") },
    { icon: <Home className="h-6 w-6" />, text: t("home.howItWorks.student.step3") },
  ];

  const landlordSteps = [
    { icon: <UserPlus className="h-6 w-6" />, text: t("home.howItWorks.landlord.step1") },
    { icon: <CheckCircle className="h-6 w-6" />, text: t("home.howItWorks.landlord.step2") },
    { icon: <DollarSign className="h-6 w-6" />, text: t("home.howItWorks.landlord.step3") },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-navy text-center mb-16"
        >
          {t("home.howItWorks.title")}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* For Students */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className={`w-fit px-4 py-2 rounded-full font-bold text-sm mb-8 ${STICK_COLORS.student}`}>
              {t("home.howItWorks.student.title")}
            </div>
            <div className="space-y-10 flex-1">
              {studentSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-orange text-white flex items-center justify-center shadow-lg shadow-orange/20 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <p className="text-navy font-semibold text-lg leading-snug">
                      {step.text.split(":")[0]}
                    </p>
                    <p className="text-slate-500 mt-1">
                      {step.text.split(":")[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* For Landlords */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className={`w-fit px-4 py-2 rounded-full font-bold text-sm mb-8 ${STICK_COLORS.landlord}`}>
              {t("home.howItWorks.landlord.title")}
            </div>
            <div className="space-y-10 flex-1">
              {landlordSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center shadow-lg shadow-navy/20 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <p className="text-navy font-semibold text-lg leading-snug">
                      {step.text.split(":")[0]}
                    </p>
                    <p className="text-slate-500 mt-1">
                      {step.text.split(":")[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
