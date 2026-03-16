import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-orange/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-navy tracking-tight leading-tight mb-6">
              {t("home.hero.title")}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/units">
              <Button size="lg" className="h-14 px-8 rounded-xl bg-orange hover:bg-orange-hover text-white text-lg font-bold shadow-lg shadow-orange/20 transition-all hover:scale-105 active:scale-95">
                {t("home.hero.findHousing")}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/units/new">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl border-2 border-navy text-navy hover:bg-navy hover:text-white text-lg font-bold transition-all hover:scale-105 active:scale-95">
                {t("home.hero.listProperty")}
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof / Stats placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-50"
          >
            {/* Example Logos / Trusted by universities */}
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Trusted by students from</div>
            <div className="font-bold text-xl">AOU</div>
            <div className="font-bold text-xl">AUC</div>
            <div className="font-bold text-xl">GUC</div>
            <div className="font-bold text-xl">BUE</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
