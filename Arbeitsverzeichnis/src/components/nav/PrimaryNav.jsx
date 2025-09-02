import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MegaMenu from '@/components/nav/MegaMenu';
import { NAV_PRIMARY } from '@/config/siteNav';
import { createPageUrl } from '@/utils';
import { prefetchRoute } from '@/utils/routePrefetch';
import { trackNav } from '@/utils/tracking';

export function PrimaryNav({ t, onCloseMobile }) {
  const location = useLocation();
  const isActivePath = (route) => location.pathname === createPageUrl(route);

  return (
    <nav className="hidden md:flex nav-shell nav-compact" role="navigation" aria-label="Haupt Navigation">
      {NAV_PRIMARY.map(item => {
        if (item.type === 'megamenu') {
          const active = item.items.some(i => isActivePath(i.to)) || (item.leftRail?.items||[]).some(i=>isActivePath(i.to));
          return (
            <MegaMenu
              key={item.id}
              label={t ? t('nav.why', 'Warum ZOE') : 'Warum ZOE'}
              active={active}
              items={item.items.map(i=> ({ ...i, to: createPageUrl(i.to) }))}
              leftRail={{ ...item.leftRail, items: item.leftRail.items.map(i=> ({ ...i, to: createPageUrl(i.to) })) }}
              highlight={{ ...item.highlight, to: createPageUrl(item.highlight.to) }}
              image={item.image}
              onLinkClick={onCloseMobile}
            />
          );
        }
        if (item.type === 'link') {
          return (
            <Link
              key={item.id}
              to={createPageUrl(item.to)}
              onMouseEnter={() => prefetchRoute(item.to)}
              onClick={() => { trackNav(item.label); onCloseMobile?.(); }}
              className={`nav-item ${isActivePath(item.to) ? 'is-active' : ''}`}
            >{item.label}</Link>
          );
        }
        return null;
      })}
    </nav>
  );
}
