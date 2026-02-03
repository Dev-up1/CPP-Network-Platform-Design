import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Star, Shield, Zap, Globe, DollarSign } from 'lucide-react';

interface Offer {
  id: number;
  name: string;
  payout: string;
  type: string;
  image: string;
}

interface HomePageProps {
  lang: 'en' | 'ar';
  onRegister: () => void;
  featuredOffers: Offer[];
}

export function HomePage({ lang, onRegister, featuredOffers }: HomePageProps) {
  const isRTL = lang === 'ar';

  const t = {
    heroTitle: lang === 'ar' ? 'أفضل شبكة CPA لتحقيق أقصى الأرباح' : 'Maximize Your Traffic Revenue with Premium CPA Offers',
    heroSubtitle: lang === 'ar' ? 'نربط الناشرين بأفضل العروض الحصرية مع دفعات يومية ودعم فني متواصل.' : 'Join the fastest growing affiliate network. Access exclusive offers, guaranteed payouts, and 24/7 dedicated support.',
    getStarted: lang === 'ar' ? 'ابدأ الآن مجاناً' : 'Start Earning Now',
    learnMore: lang === 'ar' ? 'المزيد من المعلومات' : 'Learn More',
    stats: {
      affiliates: lang === 'ar' ? 'ناشر نشط' : 'Active Affiliates',
      payouts: lang === 'ar' ? 'تم دفعها' : 'Paid Out',
      offers: lang === 'ar' ? 'عرض حصري' : 'Exclusive Offers',
    },
    features: {
      title: lang === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose CPP Network?',
      items: [
        { title: lang === 'ar' ? 'دفعات سريعة' : 'Fast Payouts', desc: lang === 'ar' ? 'نظام دفع أسبوعي ويومي للناشرين المتميزين.' : 'Weekly and daily payments for top performing affiliates.' },
        { title: lang === 'ar' ? 'عروض حصرية' : 'Exclusive Offers', desc: lang === 'ar' ? 'أعلى معدلات التحويل في السوق.' : 'Highest converting offers directly from top advertisers.' },
        { title: lang === 'ar' ? 'دعم فني 24/7' : '24/7 Support', desc: lang === 'ar' ? 'مدير حساب خاص لمساعدتك في زيادة أرباحك.' : 'Dedicated account managers to help you scale your campaigns.' },
      ]
    },
    featured: lang === 'ar' ? 'عروض مميزة' : 'Featured Offers',
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 font-bold text-sm border border-purple-100 mb-6">
                <Star className="w-4 h-4 fill-purple-700" />
                Voted #1 CPP Network 2024
              </span>
              <h1 className={`text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1] ${isRTL ? 'font-arabic' : ''}`}>
                {t.heroTitle}
              </h1>
              <p className={`text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onRegister}
                  className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/30 hover:-translate-y-1"
                >
                  {t.getStarted}
                </button>
                <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-slate-300">
                  {t.learnMore}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { label: t.stats.affiliates, value: '50,000+', icon: Globe, color: 'text-purple-600' },
              { label: t.stats.payouts, value: '$150M+', icon: DollarSign, color: 'text-green-600' },
              { label: t.stats.offers, value: '2,500+', icon: Zap, color: 'text-purple-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
              >
                <div className={`p-4 rounded-full bg-slate-50 mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className={`text-3xl lg:text-4xl font-bold text-slate-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
               {t.featured}
             </h2>
             <p className="text-slate-500 max-w-2xl mx-auto">
               Explore our highest converting offers across top verticals like Finance, Sweepstakes, Dating, and Health.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOffers.slice(0, 4).map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img 
                    src={offer.image} 
                    alt={offer.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                    {offer.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-1 truncate">{offer.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-extrabold text-lg">{offer.payout}</span>
                    <button className="text-purple-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold text-slate-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t.features.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.features.items.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {i === 0 ? <Zap className="w-8 h-8" /> : i === 1 ? <Star className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                </div>
                <h3 className={`text-xl font-bold text-slate-900 mb-3 ${isRTL ? 'font-arabic' : ''}`}>{item.title}</h3>
                <p className={`text-slate-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-purple-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2574')] opacity-10 bg-cover bg-center" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? 'جاهز للبدء في تحقيق الأرباح؟' : 'Ready to Start Earning?'}
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of successful affiliates who trust CPP Network for their traffic monetization.
          </p>
          <button 
            onClick={onRegister}
            className="bg-white text-purple-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-2xl"
          >
            {t.getStarted}
          </button>
        </div>
      </section>
    </div>
  );
}