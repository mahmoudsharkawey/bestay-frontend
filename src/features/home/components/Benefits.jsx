import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Home, Key, Compass, ShieldCheck, MapPin, Building } from "lucide-react";

export default function Benefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Compass className="h-10 w-10 text-orange" />,
      title: t("home.benefits.map.title", "Smart Discovery"),
      desc: t("home.benefits.map.desc", "Explore neighborhoods and properties interactively with our advanced mapping technology."),
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-orange" />,
      title: t("home.benefits.verified.title", "Verified Listings"),
      desc: t("home.benefits.verified.desc", "Every property is rigorously checked to ensure what you see is exactly what you get."),
    },
    {
      icon: <Key className="h-10 w-10 text-orange" />,
      title: t("home.benefits.booking.title", "Seamless Booking"),
      desc: t("home.benefits.booking.desc", "From viewing to signing, experience a frictionless journey to your new home."),
    },
  ];

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Decorative architectural lines */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 100 L50 0 L100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
          <path d="M25 100 L75 0" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-orange font-bold tracking-widest uppercase text-sm mb-2 block">{t("home.benefits.badge", "Why Choose Us")}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("home.benefits.title", "The New Standard in Housing")}
          </h2>
          <div className="w-20 h-1.5 bg-orange mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle background icon */}
              <div className="absolute -right-8 -bottom-8 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                <Building className="w-48 h-48 text-white" />
              </div>
              
              <div className="relative z-10">
                <div className="mb-8 w-20 h-20 rounded-2xl bg-white/10 text-white flex items-center justify-center group-hover:bg-orange/20 transition-colors border border-white/5">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
