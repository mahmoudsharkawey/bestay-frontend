import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Quote, Star, MapPin } from "lucide-react";

export default function Testimonials() {
  const { t } = useTranslation();

  const defaultReviews = [
    {
      name: "Ahmed Khalil",
      role: "Engineering Student",
      location: "Near AOU Campus",
      text: "BeStay made it so easy for me to find a safe apartment near my campus. The verified listings gave me absolute peace of mind!",
      stars: 5,
    },
    {
      name: "Sarah Jonas",
      role: "Property Owner",
      location: "Downtown",
      text: "As a landlord, I love how clean the interface is and how smooth the booking process flows with BeStay. It completely eliminated my vacancy periods.",
      stars: 5,
    },
    {
      name: "Mona Mourad",
      role: "Medical Student",
      location: "Near AUC Campus",
      text: "The map search is incredible. I could see exactly how far my room was from my university lectures. Highly recommend this platform!",
      stars: 5,
    },
  ];

  const reviews = t("home.testimonials.reviews", { returnObjects: true }) || defaultReviews;
  
  // Safety check in case translation isn't an array
  const safeReviews = Array.isArray(reviews) ? reviews : defaultReviews;

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange font-bold tracking-widest uppercase text-sm mb-2 block">{t("home.testimonials.badge", "Success Stories")}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
            {t("home.testimonials.title", "Trusted by Thousands")}
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {t("home.testimonials.subtitle", "Don't just take our word for it. Here's what our community of students and property owners has to say.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {safeReviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/30 flex flex-col hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-4 w-4 ${idx < rev.stars ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-slate-100 group-hover:text-orange/20 transition-colors" />
              </div>
              
              <div className="mb-8 flex-1">
                <p className="text-slate-700 font-medium leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center font-bold text-white shadow-md">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">{rev.name}</h4>
                  <p className="text-slate-500 text-xs mb-1">{rev.role}</p>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                    <MapPin className="h-3 w-3" />
                    {rev.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
