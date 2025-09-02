import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * TestimonialCard: Einheitliche Kundenstimme.
 * Props: { name, location, text, image, verified, metaLeft, metaRight }
 */
export function TestimonialCard({ name, location, text, image, verified, savings, date }) {
  return (
    <Card variant="glass" elevation="sm" className="p-6 relative">
      <div className="flex items-start gap-4">
        {image && <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50" />}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-neutral-900">{name}</h4>
            {verified && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            {location && <span className="text-xs text-neutral-500">{location}</span>}
          </div>
          <blockquote className="text-neutral-600 text-sm leading-relaxed">“{text}”</blockquote>
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-150">
            {date && <span>{date}</span>}
            {savings && <span className="font-medium text-emerald-600">{savings}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TestimonialCard;
