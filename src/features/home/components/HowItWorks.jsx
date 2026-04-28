import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, CalendarCheck, Home, CheckCircle, UploadCloud, Banknote } from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();

  const studentSteps = [
    { icon: <Search className="h-6 w-6" />, title: t("home.howItWorks.student.step1Title", "Find"), text: t("home.howItWorks.student.step1", "Browse our verified property listings tailored to your university location.") },
    { icon: <CalendarCheck className="h-6 w-6" />, title: t("home.howItWorks.student.step2Title", "Visit"), text: t("home.howItWorks.student.step2", "Schedule a visit or take a virtual tour of your favorite properties.") },
    { icon: <Home className="h-6 w-6" />, title: t("home.howItWorks.student.step3Title", "Move In"), text: t("home.howItWorks.student.step3", "Book securely through our platform and settle into your new home.") },
  ];

  const landlordSteps = [
    { icon: <UploadCloud className="h-6 w-6" />, title: t("home.howItWorks.landlord.step1Title", "List"), text: t("home.howItWorks.landlord.step1", "Create an attractive listing for your property in just a few minutes.") },
    { icon: <CheckCircle className="h-6 w-6" />, title: t("home.howItWorks.landlord.step2Title", "Approve"), text: t("home.howItWorks.landlord.step2", "Review applications from verified students and accept the best fit.") },
    { icon: <Banknote className="h-6 w-6" />, title: t("home.howItWorks.landlord.step3Title", "Earn"), text: t("home.howItWorks.landlord.step3", "Receive secure, timely payments directly through our platform.") },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange font-bold tracking-widest uppercase text-sm mb-2 block">{t("home.howItWorks.badge", "Simple Process")}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
            {t("home.howItWorks.title", "How It Works")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* For Tenants */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-orange" />
            <h3 className="text-2xl font-bold text-navy mb-10 flex items-center gap-3">
              <span className="bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm tracking-wide">{t("home.howItWorks.student.badge", "For Tenants")}</span>
            </h3>
            
            <div className="space-y-10 flex-1 relative">
              {/* Connecting line */}
              <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-slate-100 z-0 hidden sm:block" />
              
              {studentSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-6 relative z-10 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border-2 border-orange text-orange flex items-center justify-center shadow-md group-hover:bg-orange group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-navy font-bold text-xl mb-2">{step.title}</h4>
                    <p className="text-slate-500 leading-relaxed">
                      {step.text.split(":").pop().trim()} {/* Strip old prefix if it exists */}
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
            className="flex flex-col h-full bg-navy p-8 md:p-12 rounded-3xl shadow-xl shadow-navy/20 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-orange" />
            <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
              <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm tracking-wide">{t("home.howItWorks.landlord.badge", "For Property Owners")}</span>
            </h3>
            
            <div className="space-y-10 flex-1 relative">
              {/* Connecting line */}
              <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-white/10 z-0 hidden sm:block" />
              
              {landlordSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-6 relative z-10 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-navy border-2 border-slate-400 text-slate-300 flex items-center justify-center shadow-md group-hover:border-white group-hover:text-navy group-hover:bg-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-white font-bold text-xl mb-2">{step.title}</h4>
                    <p className="text-slate-400 leading-relaxed">
                      {step.text.split(":").pop().trim()}
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
