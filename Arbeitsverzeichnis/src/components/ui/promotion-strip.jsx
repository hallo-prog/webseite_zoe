import React from 'react';
import { X, Clock, Euro, Zap, AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';

/**
 * Unified Promotion Strip Component
 * 
 * Replaces multiple improvised banner components with a consistent,
 * configurable promotion banner system.
 */

const VARIANT_STYLES = {
  primary: 'bg-gradient-to-r from-blue-600 to-green-600 text-white',
  urgent: 'bg-gradient-to-r from-red-600 to-orange-600 text-white',
  success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
  info: 'bg-blue-50 text-blue-900 border-t border-b border-blue-200',
  warning: 'bg-amber-50 text-amber-900 border-t border-b border-amber-200',
  dark: 'bg-gray-900 text-white',
};

const ICON_MAP = {
  clock: Clock,
  euro: Euro, 
  zap: Zap,
  alert: AlertTriangle,
};

/**
 * Promotion Strip Component
 */
export function PromotionStrip({
  variant = 'primary',
  title,
  message,
  countdown,
  badge,
  cta,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
  size = 'default', // 'compact' | 'default' | 'large'
  ...props
}) {
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const IconComponent = icon && ICON_MAP[icon];
  
  const sizeStyles = {
    compact: 'py-3',
    default: 'py-4',
    large: 'py-6'
  };
  
  const containerSize = sizeStyles[size] || sizeStyles.default;

  return (
    <div 
      className={`${variantStyle} ${containerSize} ${className}`.trim()}
      role="banner"
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Icon */}
            {IconComponent && (
              <div className="flex-shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                {/* Title and Message */}
                <div className="flex-1">
                  {badge && (
                    <Badge 
                      variant="invert" 
                      className="mb-2 sm:mb-0 sm:mr-3 inline-block"
                    >
                      {badge}
                    </Badge>
                  )}
                  
                  {title && (
                    <span className="font-semibold text-sm sm:text-base block sm:inline">
                      {title}
                    </span>
                  )}
                  
                  {message && (
                    <span className={`text-sm sm:text-base ${title ? 'ml-2' : ''} block sm:inline`}>
                      {message}
                    </span>
                  )}
                </div>
                
                {/* Countdown */}
                {countdown && (
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium tabular-nums">
                      {countdown.days > 0 && `${countdown.days}d `}
                      {countdown.hours.toString().padStart(2, '0')}:
                      {countdown.minutes.toString().padStart(2, '0')}:
                      {countdown.seconds.toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* CTA */}
            {cta && (
              <div className="flex-shrink-0 mt-3 sm:mt-0 sm:ml-4">
                <Button
                  variant={variant === 'info' || variant === 'warning' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={cta.onClick}
                  className={
                    variant === 'primary' || variant === 'urgent' || variant === 'success' 
                      ? 'bg-white text-gray-900 hover:bg-gray-100 border-white' 
                      : ''
                  }
                >
                  {cta.text}
                </Button>
              </div>
            )}
          </div>
          
          {/* Dismiss Button */}
          {dismissible && (
            <div className="flex-shrink-0 ml-4">
              <button
                onClick={onDismiss}
                className="p-1 rounded-lg hover:bg-black/10 transition-colors"
                aria-label="Banner schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Pre-configured promotion variants
 */
export const PROMOTION_VARIANTS = {
  urgentOffer: (props) => (
    <PromotionStrip
      variant="urgent"
      icon="clock"
      badge="Limitiert"
      {...props}
    />
  ),
  
  savingsHighlight: (props) => (
    <PromotionStrip
      variant="success"
      icon="euro"
      {...props}
    />
  ),
  
  announcementBar: (props) => (
    <PromotionStrip
      variant="info"
      size="compact"
      {...props}
    />
  ),
  
  criticalAlert: (props) => (
    <PromotionStrip
      variant="warning"
      icon="alert"
      {...props}
    />
  ),
};

/**
 * React hook for managing promotion strip state
 */
export function usePromotionStrip(key = 'default') {
  const [dismissed, setDismissed] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(`promotion_dismissed_${key}`) === 'true';
  });

  const dismiss = React.useCallback(() => {
    setDismissed(true);
    localStorage.setItem(`promotion_dismissed_${key}`, 'true');
  }, [key]);

  const reset = React.useCallback(() => {
    setDismissed(false);
    localStorage.removeItem(`promotion_dismissed_${key}`);
  }, [key]);

  return {
    dismissed,
    dismiss,
    reset,
  };
}

export default PromotionStrip;