import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useUnits } from "@/features/units/hooks/useUnits";
import UnitCard from "@/features/units/components/UnitCard";
import UnitCardSkeleton from "@/features/units/components/UnitCardSkeleton";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedProperties() {
  const { t } = useTranslation();
  // We'll fetch the first 4 units for the featured section
  const { units, isLoading, isError } = useUnits();

  // Limit to 4 for the grid
  const featuredUnits = units.slice(0, 4);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight"
            >
              {t("home.featured.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg"
            >
              {t("home.featured.subtitle")}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/units">
              <Button variant="ghost" className="text-orange hover:text-orange-hover hover:bg-orange/5 font-bold text-lg group transition-all">
                {t("common.viewAll")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <UnitCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500">{t("common.error")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <UnitCard unit={unit} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
