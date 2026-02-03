import React from 'react';
import { motion } from 'motion/react';
import { Wallet, Gift, Clock, Zap, Check } from 'lucide-react';

interface AffiliatesPageProps {
  lang: 'en' | 'ar';
  onRegister: () => void;
}

export function AffiliatesPage({ lang, onRegister }: AffiliatesPageProps) {
  const isRTL = lang === 'ar';
  
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[600px] flex items-center bg-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1758840734307-aed01ccec284?auto=format&fit=crop&q=80&w=2000" 
            alt="Freelancer Working" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-5xl lg:text-7xl font-bold mb-6 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'حول زياراتك إلى أرباح حقيقية' : 'Turn Your Traffic Into Serious Income'}
              </h1>
              <p className={`text-xl text-purple-100 mb-8 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'انضم إلى أفضل شبكة CPP في العالم. عروض حصرية، مدفوعات مضمونة، ودعم لا مثيل له.' : 'Join the world\'s premium CPP network. Access exclusive offers, guaranteed weekly payouts, and dedicated affiliate support.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onRegister}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
                >
                  {lang === 'ar' ? 'سجل الآن مجاناً' : 'Join for Free'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold text-slate-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'لماذا يفضل الناشرون شبكتنا؟' : 'Why Top Affiliates Choose Us'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Wallet, 
                title: 'Highest Payouts', 
                desc: 'We negotiate the best rates directly with advertisers so you earn more per conversion.' 
              },
              { 
                icon: Clock, 
                title: 'Weekly Payments', 
                desc: 'Get paid on time, every time. We support PayPal, Wire, Crypto, and Payoneer.' 
              },
              { 
                icon: Gift, 
                title: 'Exclusive Offers', 
                desc: 'Access private offers you won\'t find on any other network.' 
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-purple-100 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-3xl lg:text-4xl font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'كيف تبدأ؟' : 'How It Works'}
              </h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Create Account', desc: 'Fill out our simple application form. Approval takes less than 24 hours.' },
                  { step: '02', title: 'Select Offers', desc: 'Browse our marketplace and find offers that match your traffic source.' },
                  { step: '03', title: 'Start Promoting', desc: 'Get your tracking links and start driving traffic using your preferred methods.' },
                  { step: '04', title: 'Get Paid', desc: 'Watch your earnings grow and receive payments weekly or bi-weekly.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-3xl font-bold text-purple-500 opacity-50 font-mono">{item.step}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={onRegister}
                className="mt-12 bg-purple-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors"
              >
                Start Earning Today
              </button>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <Zap className="w-5 h-5 text-yellow-400" /> 
                 Live Recent Payouts
               </h3>
               <div className="space-y-4">
                 {[
                   { user: 'User1293', amount: '$4,250.00', method: 'Wire Transfer', time: '2 mins ago' },
                   { user: 'Affiliate_KING', amount: '$1,840.50', method: 'PayPal', time: '5 mins ago' },
                   { user: 'MediaBuyerPro', amount: '$12,400.00', method: 'Crypto (USDT)', time: '12 mins ago' },
                   { user: 'SarahJ', amount: '$850.00', method: 'Payoneer', time: '18 mins ago' },
                   { user: 'TrafficMaster', amount: '$2,100.00', method: 'Wire Transfer', time: '24 mins ago' },
                 ].map((payout, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-slate-700">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
                         {payout.user.charAt(0)}
                       </div>
                       <div>
                         <p className="font-bold text-sm">{payout.user}</p>
                         <p className="text-xs text-slate-400">{payout.method}</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <p className="font-bold text-green-400">{payout.amount}</p>
                       <p className="text-xs text-slate-500">{payout.time}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}