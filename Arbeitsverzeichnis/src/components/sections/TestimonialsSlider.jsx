import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Quote, Star, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function TestimonialsSlider() {
  const { t } = useTranslation();
  const items = useMemo(() => t('testimonials.items', { returnObjects: true }), [t]);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const pageSize = 2;
  const totalPages = Math.ceil(items.length / pageSize);
  const visible = items.slice(page * pageSize, page * pageSize + pageSize);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((tItem,i)=>({
      '@type':'ListItem',
      position: i+1,
      item: { '@type':'Review', reviewBody: tItem.quote, author: { '@type':'Person', name: tItem.name } }
    }))
  };
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(()=>{
    clearInterval(timerRef.current);
    if (!paused) {
      timerRef.current = setInterval(()=> setPage(p => (p+1)%totalPages), 6000);
    }
    return ()=> clearInterval(timerRef.current);
  }, [paused, totalPages]);

  return (
    <div className="mt-8" role="region" aria-label={t('testimonials.aria')} ref={containerRef}>
      <div className="mx-auto max-w-5xl">
        <div className="sr-only">{t('testimonials.status', { count: items.length, page: page+1, pages: totalPages, state: paused ? t('testimonials.paused') : t('testimonials.running') })}</div>
        <div className="flex items-center justify-end mb-3 gap-2">
          <Button variant="plain" onClick={()=> setPaused(p=>!p)} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-amber-200 bg-white text-amber-800 hover:bg-amber-50">
            {paused ? <Play className="w-3.5 h-3.5"/> : <Pause className="w-3.5 h-3.5"/>}
            {paused ? t('testimonials.play_label') : t('testimonials.pause_label')}
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((tItem,i)=>(
            <div key={i} className="relative rounded-2xl border border-amber-200 bg-white/90 backdrop-blur p-6 shadow-sm animate-fadeIn" style={{animationDelay: `${i*120}ms`}}>
              <span className="absolute top-3 right-4 flex items-center gap-1 text-[11px] font-medium text-amber-700"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>{t('testimonials.rating_value','5.0')}</span>
              <Quote className="w-6 h-6 text-amber-600 absolute -top-3 -left-3 bg-amber-50 border border-amber-200 rounded-full p-1"/>
              <p className="text-base text-gray-800 leading-relaxed">“{tItem.quote}”</p>
              <div className="mt-3 text-sm font-semibold text-gray-900">{tItem.name}</div>
              <div className="text-xs sm:text-sm text-gray-600">{tItem.meta}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-2">
          <Button variant="plain" onClick={()=> setPage(p=> Math.max(0,p-1))} disabled={page===0} className="px-3 py-1.5 text-sm rounded-full border border-amber-200 bg-white text-amber-800 disabled:opacity-40" aria-label={t('testimonials.prev')}>‹</Button>
          {Array.from({length: totalPages}).map((_,i)=>(
            <Button variant="plain" key={i} aria-label={t('testimonials.page',{ page: i+1 })} onClick={()=> setPage(i)} className={`h-2.5 w-6 rounded-full ${i===page?'bg-amber-600':'bg-amber-200'} transition p-0`}></Button>
          ))}
          <Button variant="plain" onClick={()=> setPage(p=> Math.min(totalPages-1,p+1))} disabled={page===totalPages-1} className="px-3 py-1.5 text-sm rounded-full border border-amber-200 bg-white text-amber-800 disabled:opacity-40" aria-label={t('testimonials.next')}>›</Button>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      </div>
    </div>
  );
}
