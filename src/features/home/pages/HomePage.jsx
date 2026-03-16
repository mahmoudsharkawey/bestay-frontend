import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import SearchSection from "../components/SearchSection";
import FeaturedProperties from "../components/FeaturedProperties";
import HowItWorks from "../components/HowItWorks";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div className={`flex flex-col min-h-screen ${isRtl ? "font-cairo rtl" : "font-inter"}`}>
      {/* Hero with Search overlay */}
      <HeroSection />
      <SearchSection />

      {/* Main content sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FeaturedProperties />
        <HowItWorks />
        <Benefits />
        <Testimonials />
      </motion.div>
    </div>
  );
}
