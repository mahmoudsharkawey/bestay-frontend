import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const { t } = useTranslation();

  const reviews = [
    {
      name: "Ahmed Khalil",
      role: "Student, AOU",
      text: "BeStay made it so easy for me to find a safe apartment near my campus. The verified listings gave me peace of mind!",
      stars: 5,
    },
    {
      name: "Sarah Jonas",
      role: "Expat Landlord",
      text: "As a landlord, I love how clean the interface is and how smooth the booking process flows with BeStay.",
      stars: 5,
    },
    {
      name: "Mona Mourad",
      role: "Student, AUC",
      text: "The map search is incredible. I could see exactly how far my room was from my university lectures.",
      stars: 4,
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
            {t("home.testimonials.title")}
          </h2>
          <p className="text-slate-500 text-lg">
            {t("home.testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col hover:shadow-xl transition-all duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${idx < rev.stars ? "fill-orange text-orange" : "text-slate-300"}`}
                  />
                ))}
              </div>
              
              <div className="mb-8 relative flex-1">
                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-orange/10 -z-0" />
                <p className="text-slate-600 italic relative z-10 leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center font-bold text-navy uppercase">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy">{rev.name}</h4>
                  <p className="text-slate-500 text-xs">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
