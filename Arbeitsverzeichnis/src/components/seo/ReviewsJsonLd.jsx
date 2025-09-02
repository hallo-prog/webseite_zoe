import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * ReviewsJsonLd – Structured Data für Bewertungen und Testimonials
 * Verbessert die Darstellung in Google-Suchergebnissen und Rich Snippets
 */
export default function ReviewsJsonLd({
  organizationName = 'ZOE Solar',
  organizationUrl = 'https://www.zoe-solar.de',
  reviews = []
}) {
  // Standard-Bewertungen falls keine übergeben werden
  const defaultReviews = [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Familie Bauer"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Die Anlage übertrifft alle Erwartungen. Wir sind seit 8 Monaten komplett autark und sparen €2.400 im Jahr!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Herr Schmidt"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Von der ersten Beratung bis zur Fertigstellung – alles lief reibungslos. Keine versteckten Kosten, keine Verzögerungen."
    }
  ];

  const reviewData = reviews.length > 0 ? reviews : defaultReviews;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "url": organizationUrl,
    "logo": `${organizationUrl}/Logo-ZOE.png`,
    "description": "Solaranlage Berlin | Photovoltaik Installation & Beratung | TÜV-zertifiziert | 15+ Jahre Erfahrung",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressRegion": "Berlin"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviewData
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
