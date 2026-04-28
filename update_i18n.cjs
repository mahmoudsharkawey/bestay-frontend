const fs = require('fs');

// Load files
const enPath = './src/i18n/en.json';
const arPath = './src/i18n/ar.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// Updates for EN
en.home.hero.badge = "Your Premium Real Estate Platform";
en.home.hero.verified = "Verified Listings";
en.home.hero.locations = "Prime Locations";
en.home.hero.availableNow = "Available Now";
en.home.hero.premium = "Premium Properties";

en.home.search = en.home.search || {};
en.home.search.location = "Location";
en.home.search.placeholder = "Where do you want to live?";
en.home.search.searchBtn = "Search";
en.home.search.anyType = "Any type";
en.home.search.singleRoom = "Single Room";
en.home.search.doubleRoom = "Double Room";
en.home.search.sharedRoom = "Shared Room";
en.home.search.studio = "Studio";

en.common.budget = "Max Budget";
en.common.any = "Any";

en.home.benefits.badge = "Why Choose Us";
en.home.benefits.title = "The New Standard in Housing";
en.home.benefits.map.title = "Smart Discovery";
en.home.benefits.map.desc = "Explore neighborhoods and properties interactively with our advanced mapping technology.";
en.home.benefits.verified.title = "Verified Listings";
en.home.benefits.verified.desc = "Every property is rigorously checked to ensure what you see is exactly what you get.";
en.home.benefits.booking.title = "Seamless Booking";
en.home.benefits.booking.desc = "From viewing to signing, experience a frictionless journey to your new home.";

en.home.howItWorks.badge = "Simple Process";
en.home.howItWorks.title = "How It Works";
en.home.howItWorks.student.badge = "For Tenants";
en.home.howItWorks.student.step1Title = "Find";
en.home.howItWorks.student.step1 = "Browse our verified property listings tailored to your university location.";
en.home.howItWorks.student.step2Title = "Visit";
en.home.howItWorks.student.step2 = "Schedule a visit or take a virtual tour of your favorite properties.";
en.home.howItWorks.student.step3Title = "Move In";
en.home.howItWorks.student.step3 = "Book securely through our platform and settle into your new home.";

en.home.howItWorks.landlord.badge = "For Property Owners";
en.home.howItWorks.landlord.step1Title = "List";
en.home.howItWorks.landlord.step1 = "Create an attractive listing for your property in just a few minutes.";
en.home.howItWorks.landlord.step2Title = "Approve";
en.home.howItWorks.landlord.step2 = "Review applications from verified students and accept the best fit.";
en.home.howItWorks.landlord.step3Title = "Earn";
en.home.howItWorks.landlord.step3 = "Receive secure, timely payments directly through our platform.";

en.home.testimonials.badge = "Success Stories";
en.home.testimonials.title = "Trusted by Thousands";
en.home.testimonials.subtitle = "Don't just take our word for it. Here's what our community of students and property owners has to say.";
en.home.testimonials.reviews = [
  {
    name: "Ahmed Khalil",
    role: "Engineering Student",
    location: "Near AOU Campus",
    text: "BeStay made it so easy for me to find a safe apartment near my campus. The verified listings gave me absolute peace of mind!",
    stars: 5
  },
  {
    name: "Sarah Jonas",
    role: "Property Owner",
    location: "Downtown",
    text: "As a landlord, I love how clean the interface is and how smooth the booking process flows with BeStay. It completely eliminated my vacancy periods.",
    stars: 5
  },
  {
    name: "Mona Mourad",
    role: "Medical Student",
    location: "Near AUC Campus",
    text: "The map search is incredible. I could see exactly how far my room was from my university lectures. Highly recommend this platform!",
    stars: 5
  }
];

// Updates for AR
ar.home.hero.badge = "منصتك العقارية المميزة";
ar.home.hero.verified = "عقارات موثقة";
ar.home.hero.locations = "مواقع متميزة";
ar.home.hero.availableNow = "متاح الآن";
ar.home.hero.premium = "عقارات فاخرة";

ar.home.search = ar.home.search || {};
ar.home.search.location = "الموقع";
ar.home.search.placeholder = "أين تريد أن تعيش؟";
ar.home.search.searchBtn = "بحث";
ar.home.search.anyType = "أي نوع";
ar.home.search.singleRoom = "غرفة مفردة";
ar.home.search.doubleRoom = "غرفة مزدوجة";
ar.home.search.sharedRoom = "غرفة مشتركة";
ar.home.search.studio = "استوديو";

ar.common = ar.common || {};
ar.common.budget = "أقصى ميزانية";
ar.common.any = "أي";

ar.home.benefits.badge = "لماذا تختارنا";
ar.home.benefits.title = "المعيار الجديد في الإسكان";
ar.home.benefits.map.title = "اكتشاف ذكي";
ar.home.benefits.map.desc = "اكتشف الأحياء والعقارات بشكل تفاعلي باستخدام تقنية الخرائط المتقدمة لدينا.";
ar.home.benefits.verified.title = "عقارات موثقة";
ar.home.benefits.verified.desc = "يتم فحص كل عقار بدقة لضمان أن ما تراه هو ما تحصل عليه بالضبط.";
ar.home.benefits.booking.title = "حجز سلس";
ar.home.benefits.booking.desc = "من المشاهدة إلى التوقيع، جرب رحلة خالية من المتاعب إلى منزلك الجديد.";

ar.home.howItWorks.badge = "عملية بسيطة";
ar.home.howItWorks.title = "كيف يعمل بيستاي";
ar.home.howItWorks.student.badge = "للمستأجرين";
ar.home.howItWorks.student.step1Title = "ابحث";
ar.home.howItWorks.student.step1 = "تصفح قوائم العقارات الموثقة لدينا والمصممة لموقع جامعتك.";
ar.home.howItWorks.student.step2Title = "زر";
ar.home.howItWorks.student.step2 = "حدد موعدًا لزيارة أو قم بجولة افتراضية في عقاراتك المفضلة.";
ar.home.howItWorks.student.step3Title = "اسكن";
ar.home.howItWorks.student.step3 = "احجز بأمان من خلال منصتنا واستقر في منزلك الجديد.";

ar.home.howItWorks.landlord.badge = "لملاك العقارات";
ar.home.howItWorks.landlord.step1Title = "اعرض";
ar.home.howItWorks.landlord.step1 = "قم بإنشاء قائمة جذابة لعقارك في بضع دقائق فقط.";
ar.home.howItWorks.landlord.step2Title = "وافق";
ar.home.howItWorks.landlord.step2 = "راجع طلبات الطلاب الموثقين واقبل الأنسب.";
ar.home.howItWorks.landlord.step3Title = "اربح";
ar.home.howItWorks.landlord.step3 = "تلقى مدفوعات آمنة وفي الوقت المناسب مباشرة عبر منصتنا.";

ar.home.testimonials.badge = "قصص نجاح";
ar.home.testimonials.title = "موثوق من قبل الآلاف";
ar.home.testimonials.subtitle = "لا تأخذ كلمتنا فقط. إليك ما يقوله مجتمعنا من الطلاب وملاك العقارات.";
ar.home.testimonials.reviews = [
  {
    name: "أحمد خليل",
    role: "طالب هندسة",
    location: "بالقرب من الجامعة العربية المفتوحة",
    text: "سهّل بيستاي علي العثور على شقة آمنة بالقرب من جامعتي. القوائم الموثقة منحتني راحة بال مطلقة!",
    stars: 5
  },
  {
    name: "سارة جوناس",
    role: "مالكة عقار",
    location: "وسط البلد",
    text: "كمالك للعقارات، أحب الواجهة النظيفة ومدى سلاسة عملية الحجز مع بيستاي. لقد قضى تمامًا على فترات الشغور لدي.",
    stars: 5
  },
  {
    name: "منى مراد",
    role: "طالبة طب",
    location: "بالقرب من الجامعة الأمريكية",
    text: "البحث في الخريطة لا يصدق. يمكنني أن أرى بالضبط المسافة بين غرفتي ومحاضراتي في الجامعة. أوصي بشدة بهذه المنصة!",
    stars: 5
  }
];

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
console.log('Translations updated successfully.');
