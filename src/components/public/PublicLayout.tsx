import React from 'react';
import { Globe, TrendingUp, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PublicLayoutProps {
  children: React.ReactNode;
  onLogin: (role: any) => void;
  lang: 'en' | 'ar';
  setLang: (l: 'en' | 'ar') => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function PublicLayout({ children, onLogin, lang, setLang, currentPage, onNavigate }: PublicLayoutProps) {
  const isRTL = lang === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const t = {
    home: lang === 'ar' ? 'الرئيسية' : 'Home',
    advertisers: lang === 'ar' ? 'المعلنين' : 'Advertisers',
    affiliates: lang === 'ar' ? 'الناشرين' : 'Affiliates',
    login: lang === 'ar' ? 'دخول' : 'Login',
    register: lang === 'ar' ? 'تسجيل' : 'Register',
  };

  const navLinks = [
    { id: 'landing', label: t.home },
    { id: 'advertisers', label: t.advertisers },
    { id: 'affiliates', label: t.affiliates },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 font-bold text-2xl text-purple-900 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span>CPP<span className="text-purple-600">Network</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.id 
                    ? 'text-purple-600' 
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="text-slate-700 hover:text-purple-600 font-medium transition-colors"
            >
              {t.login}
            </button>
            <button 
              onClick={() => onLogin('affiliate')}
              className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 hover:scale-105 active:scale-95"
            >
              {t.register}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white border-b border-slate-100"
            >
              <div className="p-4 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left font-medium text-slate-600 py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <button 
                    onClick={() => onNavigate('login')}
                    className="w-full text-center py-2 text-slate-600 font-medium"
                  >
                    {t.login}
                  </button>
                  <button 
                    onClick={() => onLogin('affiliate')}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium"
                  >
                    {t.register}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span>CPP<span className="text-purple-500">Network</span></span>
              </div>
              <p className="max-w-xs leading-relaxed">
                {lang === 'ar' 
                  ? 'الشبكة الرائدة في مجال التسويق بالعمولة. نربط المعلنين بأفضل الناشرين لتحقيق أعلى عائد على الاستثمار.' 
                  : 'The leading affiliate marketing network. Connecting top advertisers with premium publishers for maximum ROI.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">{t.home}</button></li>
                <li><button onClick={() => onNavigate('advertisers')} className="hover:text-white transition-colors">{t.advertisers}</button></li>
                <li><button onClick={() => onNavigate('affiliates')} className="hover:text-white transition-colors">{t.affiliates}</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-white transition-colors">{t.login}</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h3>
              <ul className="space-y-2">
                <li>info@cppnetwork.com</li>
                <li>+1 (888) 976-2431</li>
                <li>123 Wall Street, NY, USA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            © 2024 CPP Network. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}