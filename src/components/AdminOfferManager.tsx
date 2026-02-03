import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  PauseCircle, 
  PlayCircle 
} from 'lucide-react';

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

interface AdminOfferManagerProps {
  offers: Offer[];
  lang: 'en' | 'ar';
}

export function AdminOfferManager({ offers, lang }: AdminOfferManagerProps) {
  const isRTL = lang === 'ar';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOffers = offers.filter(offer => 
    offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className={`text-2xl font-bold text-slate-900 ${isRTL ? 'font-arabic' : ''}`}>
          {lang === 'ar' ? 'إدارة العروض' : 'Manage Offers'}
        </h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRTL ? 'left-3' : 'right-3'}`} />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'بحث...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isRTL ? 'text-right' : ''}`}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20">
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إضافة عرض' : 'Add Offer'}</span>
          </button>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Offer Name</th>
                <th className="px-6 py-4">Payout</th>
                <th className="px-6 py-4">GEO</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-slate-500 font-mono">#{offer.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs overflow-hidden shrink-0">
                        {offer.image ? (
                          <img src={offer.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          offer.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{offer.name}</div>
                        <div className="text-xs text-slate-500">{offer.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">{offer.payout}</span>
                    <span className="ml-1 text-xs text-slate-500 uppercase">{offer.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex max-w-[100px] truncate" title={offer.geo}>
                      {offer.geo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`
                        inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                        ${offer.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : ''}
                        ${offer.status === 'Paused' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''}
                        ${offer.status === 'Private' ? 'bg-purple-50 text-purple-700 border-purple-100' : ''}
                     `}>
                        {offer.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />}
                        {offer.status}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Pause">
                        <PauseCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}