import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Building, Filter } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export default function SearchSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Redirect to /units with search param
    const params = new URLSearchParams();
    // Check if query looks like a university or city
    // In our backend, we have separate fields, but for a quick search 
    // we'll just pass it as 'city' for now or handle it on the units page
    params.set("city", query); 
    navigate(`/units?${params.toString()}`);
  };

  return (
    <section className="relative -mt-12 md:-mt-16 z-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100"
        style={{ boxShadow: "0 20px 50px rgba(27, 61, 111, 0.12)" }}
      >
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder={t("home.search.placeholder")}
              className="h-14 pl-12 pr-4 rounded-xl border-slate-200 focus:border-orange focus:ring-orange text-lg transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 min-w-[300px]">
            <div className="flex-1 flex items-center gap-3 px-4 h-14 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
              <Building className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium">{t("units.roomType")}</span>
            </div>
            
            <div className="flex-1 flex items-center gap-3 px-4 h-14 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
              <Filter className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium">{t("common.filter")}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="h-14 px-10 rounded-xl bg-navy hover:bg-navy/90 text-white text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("home.search.searchBtn")}
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="font-semibold text-navy">{t("nav.universities")}:</span>
          {["AOU", "AUC", "GUC", "BUE", "CU"].map((uni) => (
            <button
              key={uni}
              type="button"
              onClick={() => {
                const params = new URLSearchParams();
                params.set("university", uni);
                navigate(`/units?${params.toString()}`);
              }}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-orange hover:text-white transition-all cursor-pointer"
            >
              {uni}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
