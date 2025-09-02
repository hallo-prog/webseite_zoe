# Tracking Schema v4 (Warm Solar Pivot)

Events (neue Module):
- hero_v4_view { variant, fps }
- metrics_bar_view { items }
- bundle_card_view { bundle_id }
- bundle_select { bundle_id, position }
- pricing_view { variant }
- financing_teaser_view { option_count }
- financing_option_click { option_id }
- journey_step_view { step, total }
- impact_section_view { metric_count }
- testimonial_carousel_interact { action: 'next'|'prev'|'auto', index }
- footer_cluster_click { cluster, label }

Konvention: alle Events durch trackVariant → variant context.

CTA Erweiterungen:
- cta_click erweitert um { module: 'hero'|'bundles'|'financing'|'journey'|'impact'|'pricing'|'final_cta' }

Funnel Kennzahlen:
- page_engagement_start (erstes Scroll Event > 100px)
- page_engagement_complete (Scroll 75%)

Experimente Flags:
- exp_tokens_v4 (true/false)
- exp_nav_v4 (true/false)

