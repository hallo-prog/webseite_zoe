import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Team() {
  const { t } = useTranslation();
  const members = t('team.members', { returnObjects: true }) || [];
  const stats = t('team.stats', { returnObjects: true }) || [];
  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50" id="team">
  <div className="pro-container">
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 tracking-wide uppercase">{t('team.badge')}</span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {t('team.title')}
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg leading-relaxed">{t('team.subtitle')}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {members.map((m, i) => (
            <div key={i} className="group relative rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="p-5">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-semibold text-lg mb-4">
                  {m.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{m.name}</h3>
                <p className="text-sm text-emerald-600 font-medium mt-0.5">{m.role}</p>
                <p className="mt-2 text-sm text-gray-500">{m.exp}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-3xl">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{s.kpi}</div>
              <div className="mt-1 text-sm font-medium text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href="#cta" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-sm md:text-base font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition">
            {t('team.cta_contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
