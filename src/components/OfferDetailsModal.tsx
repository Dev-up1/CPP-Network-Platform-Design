import React from 'react';
import { X, Copy, Globe, DollarSign, BarChart3, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface Offer {
  id: number;
  name: string;
  payout: string;
  type: string;
  geo: string;
  category: string;
  status: string;
  conversionRate: string;
  image?: string;
}

interface OfferDetailsModalProps {
  offer: Offer;
  onClose: () => void;
  lang: 'en' | 'ar';
}

export function OfferDetailsModal({ offer, onClose, lang }: OfferDetailsModalProps) {
  const isRTL = lang === 'ar';
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="relative h-48 bg-slate-900 shrink-0">
          {offer.image && (
            <>
              <img src={offer.image} alt={offer.name} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
            </>
          )}
          
          <button 
            onClick={onClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md z-10`}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-0 w-full p-6 flex items-end gap-4 text-white">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-purple-600 font-bold text-2xl shadow-lg shrink-0 overflow-hidden">
               {offer.image ? (
                 <img src={offer.image} alt="icon" className="w-full h-full object-cover" />
               ) : (
                 offer.name.charAt(0)
               )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold truncate">{offer.name}</h2>
              <div className="flex items-center gap-2 text-purple-100 text-sm">
                <span>{offer.category}</span>
                <span>•</span>
                <span>ID: #{offer.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
          {/* KPI Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Payout</span>
              </div>
              <p className="text-xl font-bold text-green-600">{offer.payout} <span className="text-sm text-slate-400 font-normal">{offer.type}</span></p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">GEOs</span>
              </div>
              <p className="text-lg font-bold text-slate-900 truncate" title={offer.geo}>{offer.geo}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Conv. Rate</span>
              </div>
              <p className="text-xl font-bold text-purple-600">{offer.conversionRate}</p>
            </div>
          </div>

          {/* Tracking Link Section */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900">Your Tracking Link</h3>
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-600 font-mono text-sm break-all">
                https://cpanetwork.com/click?offer_id={offer.id}&aff_id=1234
              </div>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Only use this link. Direct linking allowed. No incentivized traffic.
            </p>
          </div>

          {/* Description & Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Allowed Traffic
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Social Media (FB, TikTok, IG)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  SEO / Blog Content
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Email Marketing (Opt-in)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Restrictions
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  No Incentivized Traffic
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  No Adult Content
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  No Brand Bidding
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}