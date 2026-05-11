import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { ChevronRight, Home, MapPin, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/shared/stores/auth.store";

export default function HeroSection() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const isLandlord = user?.role === "LANDLORD";
  const isStudent = user?.role === "USER";

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-orange/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/10 text-orange font-medium text-sm mb-6"
            >
              <Home className="h-4 w-4" />
              <span>{t("home.hero.badge", "Your Premium Real Estate Platform")}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-tight mb-6">
                {t("home.hero.title")}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl"
            >
              {t("home.hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {!isLandlord && (
                <Link to="/units" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-orange hover:bg-orange-hover text-white text-lg font-bold shadow-lg shadow-orange/20 transition-all hover:scale-105 active:scale-95">
                    {t("home.hero.findHousing")}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              {!isStudent && (
                <Link to="/units/new" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-xl border-2 border-navy text-navy hover:bg-navy hover:text-white text-lg font-bold transition-all hover:scale-105 active:scale-95">
                    <Home className="mr-2 h-5 w-5" />
                    {t("home.hero.listProperty")}
                  </Button>
                </Link>
              )}
            </motion.div>

            {/* Real Estate Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>{t("home.hero.verified", "Verified Listings")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <MapPin className="h-5 w-5 text-orange" />
                <span>{t("home.hero.locations", "Prime Locations")}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full max-w-2xl lg:max-w-none relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy/10 border-8 border-white">
              <img 
                src="/hero-bg.png" 
                alt="Modern Real Estate Interior" 
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent mix-blend-multiply" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3">
                <div className="h-10 w-10 bg-orange/10 rounded-full flex items-center justify-center">
                  <Home className="h-5 w-5 text-orange" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{t("home.hero.availableNow", "Available Now")}</p>
                  <p className="text-sm font-bold text-navy">{t("home.hero.premium", "Premium Properties")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
