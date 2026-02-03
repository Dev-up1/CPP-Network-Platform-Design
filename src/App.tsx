import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  Briefcase, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Bell,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { OfferDetailsModal } from './components/OfferDetailsModal';
import { AdminOfferManager } from './components/AdminOfferManager';
import { PublicLayout } from './components/public/PublicLayout';
import { HomePage } from './components/public/HomePage';
import { AdvertisersPage } from './components/public/AdvertisersPage';
import { AffiliatesPage } from './components/public/AffiliatesPage';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Language = 'en' | 'ar';
type UserRole = 'admin' | 'affiliate' | null;
type Page = 'landing' | 'login' | 'dashboard' | 'marketplace' | 'offers' | 'reports' | 'payouts' | 'users' | 'settings' | 'advertisers' | 'affiliates';

interface AppState {
  lang: Language;
  role: UserRole;
  currentPage: Page;
  sidebarOpen: boolean;
  selectedOfferId: number | null;
}

// --- Mock Data ---
const MOCK_STATS = {
  affiliate: {
    earnings: 12450.50,
    balance: 3200.00,
    conversions: 842,
    epc: 0.45,
    chartData: [
      { name: 'Mon', value: 120 },
      { name: 'Tue', value: 240 },
      { name: 'Wed', value: 180 },
      { name: 'Thu', value: 320 },
      { name: 'Fri', value: 450 },
      { name: 'Sat', value: 380 },
      { name: 'Sun', value: 510 },
    ]
  },
  admin: {
    revenue: 145000.00,
    activeOffers: 124,
    activeAffiliates: 1540,
    pendingPayouts: 12500.00,
    chartData: [
      { name: 'Jan', value: 45000 },
      { name: 'Feb', value: 52000 },
      { name: 'Mar', value: 48000 },
      { name: 'Apr', value: 61000 },
      { name: 'May', value: 58000 },
      { name: 'Jun', value: 72000 },
    ]
  }
};

const MOCK_OFFERS = [
  { id: 1, name: 'Crypto King App', payout: '$4.50', type: 'CPI', geo: 'US, UK, CA', category: 'Finance', status: 'Active', conversionRate: '12%', image: 'https://images.unsplash.com/photo-1614787296891-d1b2b1aced36?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'Sweepstakes iPhone 15', payout: '$2.10', type: 'CPL', geo: 'Global', category: 'Sweepstakes', status: 'Active', conversionRate: '8.5%', image: 'https://images.unsplash.com/photo-1758348844679-47fa7e1e1fb2?auto=format&fit=crop&q=80&w=200' },
  { id: 3, name: 'Dating Gold', payout: '$35.00', type: 'CPA', geo: 'DE, FR', category: 'Dating', status: 'Private', conversionRate: '3.2%', image: 'https://images.unsplash.com/photo-1758874089420-ef03b31e595e?auto=format&fit=crop&q=80&w=200' },
  { id: 4, name: 'Keto Diet Trial', payout: '$42.00', type: 'CPS', geo: 'US', category: 'Nutra', status: 'Active', conversionRate: '2.1%', image: 'https://images.unsplash.com/photo-1722032617357-7b09276b1a8d?auto=format&fit=crop&q=80&w=200' },
  { id: 5, name: 'VPN Shield', payout: '$12.00', type: 'CPA', geo: 'Global', category: 'Utilities', status: 'Paused', conversionRate: '5.4%', image: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?auto=format&fit=crop&q=80&w=200' },
];

const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    marketplace: 'Marketplace',
    offers: 'Manage Offers',
    users: 'Affiliates',
    reports: 'Reports',
    payouts: 'Payouts',
    settings: 'Settings',
    logout: 'Logout',
    welcomeBack: 'Welcome back',
    totalEarnings: 'Total Earnings',
    availableBalance: 'Available Balance',
    totalConversions: 'Total Conversions',
    revenue: 'Total Revenue',
    activeOffers: 'Active Offers',
    activeAffiliates: 'Active Affiliates',
    pendingPayouts: 'Pending Payouts',
    recentActivity: 'Recent Activity',
    topOffers: 'Top Offers',
    status: 'Status',
    payout: 'Payout',
    geo: 'GEO',
    category: 'Category',
    actions: 'Actions',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    getStarted: 'Get Started',
    heroTitle: 'Maximize Your Traffic Revenue',
    heroSubtitle: 'The fastest growing CPP network with exclusive offers and highest payouts.',
    loginTitle: 'Sign in to your account',
    loginSubtitle: 'Enter your credentials to access the dashboard',
    searchOffers: 'Search offers...',
    filter: 'Filter',
    today: 'Today',
    weekly: 'Weekly',
    monthly: 'Monthly'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    marketplace: 'سوق العروض',
    offers: 'إدارة العروض',
    users: 'الناشرين',
    reports: 'التقارير',
    payouts: 'المدفوعات',
    settings: 'الإعدادات',
    logout: 'تسجيل خروج',
    welcomeBack: 'مرحباً بك',
    totalEarnings: 'إجمالي الأرباح',
    availableBalance: 'الرصيد المتاح',
    totalConversions: 'إجمالي التحويلات',
    revenue: 'إجمالي الإيرادات',
    activeOffers: 'العروض النشطة',
    activeAffiliates: 'الناشرين النشطين',
    pendingPayouts: 'مدفوعات معلقة',
    recentActivity: 'النشاط الأخير',
    topOffers: 'أفضل العروض',
    status: 'الحالة',
    payout: 'الدفع',
    geo: 'البلدان',
    category: 'التصنيف',
    actions: 'إجراءات',
    login: 'تسجيل الدخول',
    register: 'تسجيل حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    getStarted: 'ابدأ الآن',
    heroTitle: 'عظم أرباحك من الزيارات',
    heroSubtitle: 'شبكة CPA الأسرع نمواً مع عروض حصرية وأعلى مدفوعات.',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    loginSubtitle: 'أدخل بيانات الاعتماد الخاصة بك للوصول',
    searchOffers: 'البحث عن العروض...',
    filter: 'تصفية',
    today: 'اليوم',
    weekly: 'أسبوعي',
    monthly: 'شهري'
  }
};

// --- Components ---

const LanguageToggle = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  return (
    <button 
      onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
    >
      <Globe className="w-4 h-4" />
      <span>{lang === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
};

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-xl text-purple-900 dark:text-purple-100">
    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
      <TrendingUp className="w-5 h-5" />
    </div>
    <span>CPP<span className="text-purple-600">Network</span></span>
  </div>
);

const LoginPage = ({ onLogin, lang, setLang }: { onLogin: (role: UserRole) => void, lang: Language, setLang: (l: Language) => void }) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-4 right-4">
        <LanguageToggle lang={lang} setLang={setLang} />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          <h2 className={`text-2xl font-bold text-center text-slate-900 mb-2 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t.loginTitle}
          </h2>
          <p className={`text-center text-slate-500 mb-8 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t.loginSubtitle}
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.email}</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="contact@yourmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.password}</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-4 flex flex-col gap-3">
              <button 
                onClick={() => onLogin('affiliate')}
                className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                {t.login} (Affiliate Demo)
              </button>
              <button 
                onClick={() => onLogin('admin')}
                className="w-full bg-slate-800 text-white py-2.5 rounded-lg font-medium hover:bg-slate-900 transition-colors"
              >
                {t.login} (Admin Demo)
              </button>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center text-sm text-slate-500">
          Don't have an account? <span className="text-purple-600 font-medium cursor-pointer">{t.register}</span>
        </div>
      </motion.div>
    </div>
  );
};

const DashboardLayout = ({ 
  children, 
  state, 
  setState,
  onLogout 
}: { 
  children: React.ReactNode, 
  state: AppState, 
  setState: (s: AppState) => void,
  onLogout: () => void 
}) => {
  const t = TRANSLATIONS[state.lang];
  const isRTL = state.lang === 'ar';
  
  const menuItems = state.role === 'admin' 
    ? [
        { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
        { id: 'offers', icon: Briefcase, label: t.offers },
        { id: 'users', icon: Users, label: t.users },
        { id: 'reports', icon: BarChart3, label: t.reports },
        { id: 'payouts', icon: CreditCard, label: t.payouts },
        { id: 'settings', icon: Settings, label: t.settings },
      ]
    : [
        { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
        { id: 'marketplace', icon: Briefcase, label: t.marketplace },
        { id: 'reports', icon: BarChart3, label: t.reports },
        { id: 'payouts', icon: CreditCard, label: t.payouts },
        { id: 'settings', icon: Settings, label: t.settings },
      ];

  return (
    <div className={`min-h-screen bg-slate-50 flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-40 bg-white border-slate-200 h-screen transition-all duration-300
          ${isRTL ? 'border-l' : 'border-r'}
          ${state.sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}
        `}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-100 overflow-hidden">
          {state.sidebarOpen ? <Logo /> : <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white"><TrendingUp className="w-5 h-5" /></div>}
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setState({ ...state, currentPage: item.id as Page })}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all
                ${state.currentPage === item.id 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
              title={item.label}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {state.sidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button 
            onClick={onLogout}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {state.sidebarOpen && <span className="font-medium">{t.logout}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setState({ ...state, sidebarOpen: !state.sidebarOpen })}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className={`text-xl font-bold text-slate-800 ${isRTL ? 'font-arabic' : ''}`}>
              {menuItems.find(i => i.id === state.currentPage)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <LanguageToggle lang={state.lang} setLang={(l) => setState({...state, lang: l})} />
            <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 font-bold text-sm">
              {state.role === 'admin' ? 'A' : 'U'}
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// --- Dashboard Widgets ---

const StatCard = ({ title, value, icon: Icon, trend, color, isRTL }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
          {trend > 0 ? '+' : ''}{trend}%
          <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const AffiliateDashboard = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t.totalEarnings} 
          value={`$${MOCK_STATS.affiliate.earnings.toLocaleString()}`} 
          icon={DollarSign} 
          trend={12.5}
          color="bg-green-100 text-green-600"
          isRTL={isRTL}
        />
        <StatCard 
          title={t.availableBalance} 
          value={`$${MOCK_STATS.affiliate.balance.toLocaleString()}`} 
          icon={CreditCard} 
          color="bg-blue-100 text-blue-600"
          isRTL={isRTL}
        />
        <StatCard 
          title={t.totalConversions} 
          value={MOCK_STATS.affiliate.conversions} 
          icon={CheckCircle} 
          trend={8.2}
          color="bg-purple-100 text-purple-600"
          isRTL={isRTL}
        />
        <StatCard 
          title="EPC (Avg)" 
          value={`$${MOCK_STATS.affiliate.epc}`} 
          icon={BarChart3} 
          trend={-2.1}
          color="bg-amber-100 text-amber-600"
          isRTL={isRTL}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className={`text-lg font-bold text-slate-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>{t.recentActivity}</h3>
          <div className="h-72 w-full min-w-0">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_STATS.affiliate.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#9333ea" strokeWidth={3} dot={{ fill: '#9333ea', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
             </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <h3 className={`text-lg font-bold text-slate-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>{t.topOffers}</h3>
           <div className="space-y-4">
              {MOCK_OFFERS.slice(0, 4).map(offer => (
                <div key={offer.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden">
                      {offer.image ? (
                        <img src={offer.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        offer.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{offer.name}</p>
                      <p className="text-xs text-slate-500">{offer.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm">{offer.payout}</p>
                    <p className="text-xs text-slate-400">{offer.type}</p>
                  </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
             View All Offers
           </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t.revenue} 
          value={`$${MOCK_STATS.admin.revenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend={15.3}
          color="bg-blue-100 text-blue-600"
          isRTL={isRTL}
        />
        <StatCard 
          title={t.activeOffers} 
          value={MOCK_STATS.admin.activeOffers} 
          icon={Briefcase} 
          color="bg-indigo-100 text-indigo-600"
          isRTL={isRTL}
        />
        <StatCard 
          title={t.activeAffiliates} 
          value={MOCK_STATS.admin.activeAffiliates} 
          icon={Users} 
          trend={5.7}
          color="bg-emerald-100 text-emerald-600"
          isRTL={isRTL}
        />
        <StatCard 
          title={t.pendingPayouts} 
          value={`$${MOCK_STATS.admin.pendingPayouts.toLocaleString()}`} 
          icon={AlertTriangle} 
          color="bg-amber-100 text-amber-600"
          isRTL={isRTL}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-w-0">
           <h3 className={`text-lg font-bold text-slate-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>Revenue Overview</h3>
           <div className="h-72 w-full min-w-0 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_STATS.admin.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
           </div>
         </div>
         
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-w-0">
           <div className="flex justify-between items-center mb-6">
             <h3 className={`text-lg font-bold text-slate-900 ${isRTL ? 'font-arabic' : ''}`}>{t.users}</h3>
             <button className="text-sm text-purple-600 font-medium hover:underline">View All</button>
           </div>
           <table className="w-full text-sm text-left rtl:text-right">
             <thead className="text-xs text-slate-500 uppercase bg-slate-50">
               <tr>
                 <th className="px-4 py-3 rounded-s-lg">User</th>
                 <th className="px-4 py-3">Status</th>
                 <th className="px-4 py-3 rounded-e-lg text-right">Earnings</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {[1,2,3,4,5].map((i) => (
                 <tr key={i} className="hover:bg-slate-50">
                   <td className="px-4 py-3 font-medium text-slate-900">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200" />
                       <div>User {i}</div>
                     </div>
                   </td>
                   <td className="px-4 py-3">
                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                       Active
                     </span>
                   </td>
                   <td className="px-4 py-3 text-right font-medium text-slate-900">
                     ${(Math.random() * 1000).toFixed(2)}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

const Marketplace = ({ lang, onOfferClick }: { lang: Language, onOfferClick: (id: number) => void }) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className={`text-2xl font-bold text-slate-900 ${isRTL ? 'font-arabic' : ''}`}>{t.marketplace}</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRTL ? 'left-3' : 'right-3'}`} />
            <input 
              type="text" 
              placeholder={t.searchOffers} 
              className={`w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isRTL ? 'text-right' : ''}`}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            <span>{t.filter}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Offer Name</th>
                <th className="px-6 py-4">{t.category}</th>
                <th className="px-6 py-4">{t.geo}</th>
                <th className="px-6 py-4">{t.payout}</th>
                <th className="px-6 py-4">CR</th>
                <th className="px-6 py-4">{t.status}</th>
                <th className="px-6 py-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_OFFERS.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => onOfferClick(offer.id)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 font-bold shrink-0 overflow-hidden">
                         {offer.image ? (
                           <img src={offer.image} alt="" className="w-full h-full object-cover" />
                         ) : (
                           offer.name.charAt(0)
                         )}
                      </div>
                      <span className="font-medium text-slate-900">{offer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{offer.category}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      {offer.geo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">{offer.payout}</span>
                    <span className="text-xs text-slate-400 ml-1">{offer.type}</span>
                  </td>
                   <td className="px-6 py-4 text-slate-600">{offer.conversionRate}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      offer.status === 'Active' ? "bg-green-100 text-green-800" :
                      offer.status === 'Paused' ? "bg-amber-100 text-amber-800" :
                      "bg-slate-100 text-slate-800"
                    )}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onOfferClick(offer.id); }}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Get Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [state, setState] = useState<AppState>({
    lang: 'en',
    role: null,
    currentPage: 'landing',
    sidebarOpen: true,
    selectedOfferId: null
  });

  const handleLogin = (role: UserRole) => {
    if (!role) {
      // Navigate to login page
      setState({ ...state, currentPage: 'login' });
    } else {
      // Simulate login
      setState({ ...state, role, currentPage: 'dashboard' });
    }
  };

  const handleLogout = () => {
    setState({ ...state, role: null, currentPage: 'landing', selectedOfferId: null });
  };

  // Inject Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const style = document.createElement('style');
    style.textContent = `
      .font-arabic { font-family: 'Cairo', sans-serif; }
      body { font-family: 'Inter', sans-serif; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const isPublicPage = ['landing', 'advertisers', 'affiliates'].includes(state.currentPage);

  return (
    <>
      {isPublicPage && (
        <PublicLayout 
          onLogin={handleLogin} 
          lang={state.lang} 
          setLang={(l) => setState({...state, lang: l})}
          currentPage={state.currentPage}
          onNavigate={(page) => setState({...state, currentPage: page as Page})}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {state.currentPage === 'landing' && (
                <HomePage 
                  lang={state.lang} 
                  onRegister={() => handleLogin('affiliate')} 
                  featuredOffers={MOCK_OFFERS}
                />
              )}
              {state.currentPage === 'advertisers' && <AdvertisersPage lang={state.lang} />}
              {state.currentPage === 'affiliates' && <AffiliatesPage lang={state.lang} onRegister={() => handleLogin('affiliate')} />}
            </motion.div>
          </AnimatePresence>
        </PublicLayout>
      )}
      
      {state.currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} lang={state.lang} setLang={(l) => setState({...state, lang: l})} />
      )}
      
      {(!isPublicPage && state.currentPage !== 'login') && (
        <DashboardLayout state={state} setState={setState} onLogout={handleLogout}>
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {state.currentPage === 'dashboard' && state.role === 'affiliate' && <AffiliateDashboard lang={state.lang} />}
              {state.currentPage === 'dashboard' && state.role === 'admin' && <AdminDashboard lang={state.lang} />}
              {state.currentPage === 'marketplace' && (
                <Marketplace 
                  lang={state.lang} 
                  onOfferClick={(id) => setState({...state, selectedOfferId: id})} 
                />
              )}
              {state.currentPage === 'offers' && <AdminOfferManager offers={MOCK_OFFERS} lang={state.lang} />}
              {state.currentPage === 'reports' && <div className="text-center p-12 text-slate-500">Analytics Module</div>}
            </motion.div>
          </AnimatePresence>
        </DashboardLayout>
      )}

      {/* Modals */}
      <AnimatePresence>
        {state.selectedOfferId && (
          <OfferDetailsModal 
            offer={MOCK_OFFERS.find(o => o.id === state.selectedOfferId)!}
            onClose={() => setState({...state, selectedOfferId: null})}
            lang={state.lang}
          />
        )}
      </AnimatePresence>
    </>
  );
}