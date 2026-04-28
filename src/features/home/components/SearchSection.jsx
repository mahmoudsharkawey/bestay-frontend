import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Building, DollarSign } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export default function SearchSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [roomType, setRoomType] = useState("all");
  const [budget, setBudget] = useState(10000); 

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("city", query); 
    if (roomType !== "all") params.set("roomType", roomType);
    if (budget < 10000) params.set("maxPrice", budget);
    
    navigate(`/units?${params.toString()}`);
  };

  return (
    <section className="relative -mt-16 z-20 container mx-auto px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl p-4 border border-slate-100 hidden md:block"
        style={{ boxShadow: "0 20px 50px rgba(27, 61, 111, 0.12)" }}
      >
        <form onSubmit={handleSearch} className="flex items-center divide-x divide-slate-100">
          
          {/* Location */}
          <div className="flex-1 px-6 py-2 group cursor-text">
            <label className="block text-xs font-bold text-navy mb-1 uppercase tracking-wide">
              {t("home.search.location", "Location")}
            </label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400 group-focus-within:text-orange" />
              <input
                type="text"
                placeholder={t("home.search.placeholder", "Where do you want to live?")}
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-600 placeholder:text-slate-400 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Property Type Select */}
          <div className="flex-1 px-6 py-2">
            <label className="block text-xs font-bold text-navy mb-1 uppercase tracking-wide">
              {t("units.roomType", "Property Type")}
            </label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="border-0 shadow-none p-0 h-auto focus:ring-0 text-slate-600 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent w-full">
                <div className="flex items-center gap-2 w-full">
                  <Building className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <SelectValue placeholder={t("home.search.anyType", "Select type")} className="flex-1 text-left" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">{t("home.search.anyType", "Any type")}</SelectItem>
                <SelectItem value="SINGLE">{t("home.search.singleRoom", "Single Room")}</SelectItem>
                <SelectItem value="DOUBLE">{t("home.search.doubleRoom", "Double Room")}</SelectItem>
                <SelectItem value="SHARED">{t("home.search.sharedRoom", "Shared Room")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range */}
          <div className="flex-1 px-6 py-2">
            <label className="block text-xs font-bold text-navy mb-1 uppercase tracking-wide flex justify-between">
              <span>{t("common.budget", "Max Budget")}</span>
              <span className="text-orange font-semibold lowercase normal-case">{budget === 20000 ? t("common.any", "Any") : `EGP ${budget}`}</span>
            </label>
            <div className="flex items-center gap-2 mt-2">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <input
                type="range"
                min="3000"
                max="20000"
                step="1000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#ff8a00' }}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="pl-4 pr-2">
            <Button 
              type="submit" 
              size="icon"
              className="h-14 w-14 rounded-xl bg-orange hover:bg-orange-hover text-white transition-transform hover:scale-105"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Mobile Search (Stack) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 block md:hidden"
      >
         <form onSubmit={handleSearch} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy uppercase">{t("home.search.location", "Location")}</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder={t("home.search.placeholder", "Where to?")}
                  className="pl-12 h-12 rounded-xl border-slate-200"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy uppercase">{t("units.roomType", "Property Type")}</label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="w-full h-12 rounded-xl border-slate-200">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-slate-400" />
                    <SelectValue placeholder={t("home.search.anyType", "Select type")} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("home.search.anyType", "Any type")}</SelectItem>
                  <SelectItem value="SINGLE">{t("home.search.singleRoom", "Single Room")}</SelectItem>
                  <SelectItem value="DOUBLE">{t("home.search.doubleRoom", "Double Room")}</SelectItem>
                  <SelectItem value="SHARED">{t("home.search.sharedRoom", "Shared Room")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-navy uppercase">{t("common.budget", "Max Budget")}</label>
                <span className="text-sm text-orange font-semibold">{budget === 20000 ? t("common.any", "Any") : `EGP ${budget}`}</span>
              </div>
              <div className="relative pt-2 pb-2">
                <input
                  type="range"
                  min="3000"
                  max="20000"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#ff8a00' }}
                />
              </div>
            </div>

            <Button type="submit" className="h-14 w-full bg-orange hover:bg-orange-hover text-white rounded-xl text-lg font-bold mt-2">
              <Search className="mr-2 h-5 w-5" /> {t("home.search.searchBtn", "Search")}
            </Button>
         </form>
      </motion.div>

      <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-sm text-slate-500">
        <span className="font-semibold text-navy">{t("nav.universities", "Popular Universities")}:</span>
        {["AOU", "AUC", "GUC", "BUE", "CU"].map((uni) => (
          <button
            key={uni}
            type="button"
            onClick={() => {
              const params = new URLSearchParams();
              params.set("university", uni);
              navigate(`/units?${params.toString()}`);
            }}
            className="px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 hover:border-orange hover:text-orange font-medium transition-all cursor-pointer"
          >
            {uni}
          </button>
        ))}
      </div>
    </section>
  );
}
