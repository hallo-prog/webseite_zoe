import React from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Standardized Testimonial Component
 * 
 * Unified testimonial layout with avatar, stars, source, and consistent styling.
 * Props: { name, location, text, image, verified, savings, date, rating, source, variant }
 */
export function TestimonialCard({ 
  name, 
  location, 
  text, 
  image, 
  verified = false, 
  savings, 
  date, 
  rating = 5,
  source,
  variant = 'default',
  className = '',
  ...props 
}) {
  // Avatar fallback with initials
  const avatarFallback = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?';

  // Variant styles
  const variantStyles = {
    default: 'p-6',
    compact: 'p-4',
    featured: 'p-8',
  };

  const cardVariant = variant === 'featured' ? 'solid' : 'glass';
  const cardElevation = variant === 'featured' ? 'md' : 'sm';

  return (
    <Card 
      variant={cardVariant} 
      elevation={cardElevation} 
      className={`${variantStyles[variant]} relative ${className}`.trim()}
      {...props}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50" 
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {avatarFallback}
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-3">
          {/* Header with name, verification, and rating */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold text-neutral-900">{name}</h4>
              {verified && (
                <CheckCircle 
                  className="w-4 h-4 text-emerald-600" 
                  aria-label="Verifiziert"
                />
              )}
              {location && (
                <span className="text-xs text-neutral-500">{location}</span>
              )}
            </div>
            
            {/* Star Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-1" aria-label={`${rating} von 5 Sternen`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Testimonial Text */}
          <blockquote className="text-neutral-600 text-sm leading-relaxed">
            "{text}"
          </blockquote>
          
          {/* Footer with meta information */}
          {(date || savings || source) && (
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-150 gap-4">
              <div className="flex items-center gap-2">
                {date && <span>{date}</span>}
                {source && (
                  <>
                    {date && <span>•</span>}
                    <span className="font-medium">{source}</span>
                  </>
                )}
              </div>
              {savings && (
                <span className="font-medium text-emerald-600 tabular-nums">
                  {savings}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default TestimonialCard;