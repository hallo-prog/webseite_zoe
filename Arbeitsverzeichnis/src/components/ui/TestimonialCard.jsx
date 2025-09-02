import React from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';

/**
 * TestimonialCard: Einheitliche Kundenstimme.
 * Props:
 *  - name (string)
 *  - location (string?)
 *  - text (string)
 *  - image (string?)
 *  - verified (bool?) zeigt Check Icon
 *  - savings (string?) z.B. "€2.100/Jahr"
 *  - date (string?) Installations- oder Bewertungsdatum
 *  - rating (number? 1-5) Sternebewertung
 *  - tag (string?) kurzer Kontext (Paket/Service)
 *  - tagColor (UI color token, default 'neutral')
 *  - variant (Card variant, default 'glass')
 */
export function TestimonialCard({
  name,
  location,
  text,
  image,
  verified,
  savings,
  date,
  rating,
  tag,
  tagColor = 'neutral',
  variant = 'glass'
}) {
  return (
    <Card variant={variant} elevation="sm" className="p-6 relative">
      <div className="flex items-start gap-4">
        {image && <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50" />}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-neutral-900">{name}</h4>
            {verified && <CheckCircle className="w-4 h-4 text-emerald-600" aria-label="Verifiziert" />}
            {location && <span className="text-xs text-neutral-500">{location}</span>}
            {tag && <Pill variant="soft" color={tagColor} className="text-[10px] leading-tight">{tag}</Pill>}
            {typeof rating === 'number' && (
              <div className="flex items-center gap-0.5 ml-auto" aria-label={`Bewertung ${rating} von 5 Sternen`}>
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
            )}
          </div>
          <blockquote className="text-neutral-600 text-sm leading-relaxed">“{text}”</blockquote>
          {(date || savings) && (
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-150">
              {date && <span>{date}</span>}
              {savings && <span className="font-medium text-emerald-600">{savings}</span>}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default TestimonialCard;
