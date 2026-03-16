import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Map, ShieldCheck, Zap } from "lucide-react";

export default function Benefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Map className="h-10 w-10 text-orange" />,
      title: t("home.benefits.map.title"),
      desc: t("home.benefits.map.desc"),
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-orange" />,
      title: t("home.benefits.verified.title"),
      desc: t("home.benefits.verified.desc"),
    },
    {
      icon: <Zap className="h-10 w-10 text-orange" />,
      title: t("home.benefits.booking.title"),
      desc: t("home.benefits.booking.desc"),
    },
  ];

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("home.benefits.title")}
          </h2>
          <div className="w-20 h-1.5 bg-orange mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-8 p-6 rounded-2xl bg-white/10 text-white group-hover:bg-orange-100 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
