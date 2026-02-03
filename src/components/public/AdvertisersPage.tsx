import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, BarChart, ShieldCheck } from 'lucide-react';

interface AdvertisersPageProps {
  lang: 'en' | 'ar';
}

export function AdvertisersPage({ lang }: AdvertisersPageProps) {
  const isRTL = lang === 'ar';
  
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1758518726869-01aff69a56e3?auto=format&fit=crop&q=80&w=2000" 
            alt="Business Meeting" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl lg:text-6xl font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? 'اعثر على عملاء جدد بجودة عالية' : 'Acquire High-Quality Customers at Scale'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl text-slate-300 max-w-2xl mx-auto mb-8 ${isRTL ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? 'ادفع فقط مقابل النتائج. شبكتنا من الناشرين المحترفين جاهزة لترويج عروضك.' : 'Pay only for results. Our network of vetted publishers allows you to scale your user acquisition risk-free.'}
          </motion.p>
          <button className="bg-purple-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors">
            {lang === 'ar' ? 'ابدأ كمعلن' : 'Become an Advertiser'}
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-3xl font-bold text-slate-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'لماذا تعلن معنا؟' : 'Why Advertise With Us?'}
              </h2>
              <div className="space-y-8">
                {[
                  { icon: Target, title: 'Precision Targeting', desc: 'Reach your ideal audience by Geo, Device, OS, and Carrier.' },
                  { icon: Users, title: 'Vetted Publishers', desc: 'We manually approve every affiliate to ensure traffic quality.' },
                  { icon: ShieldCheck, title: 'Fraud Protection', desc: 'Proprietary anti-fraud technology blocks suspicious traffic in real-time.' },
                  { icon: BarChart, title: 'Real-Time Analytics', desc: 'Track clicks, conversions, and ROI instantly via our dashboard.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 rounded-2xl rotate-3 opacity-10" />
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                alt="Dashboard Analytics" 
                className="relative rounded-2xl shadow-2xl border border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-100">
            <h2 className={`text-3xl font-bold text-center text-slate-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'تواصل مع فريق المبيعات' : 'Contact Sales'}
            </h2>
            <p className="text-center text-slate-500 mb-8">
              Tell us about your product and goals. We'll get back to you within 24 hours.
            </p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Website</label>
                <input type="url" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="https://" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Budget (USD)</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none">
                  <option>$1,000 - $5,000</option>
                  <option>$5,000 - $25,000</option>
                  <option>$25,000 - $100,000</option>
                  <option>$100,000+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
              </div>
              
              <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}