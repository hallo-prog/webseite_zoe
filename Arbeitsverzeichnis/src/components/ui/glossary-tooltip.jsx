import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * GlossaryTooltip
 * Wrappt einen Fachbegriff und zeigt beim Hover/Fokus einen kompakten Tooltip.
 * Optional kann ein Link zu einer Detailseite angezeigt werden.
 */
export function GlossaryTooltip({ term, children, description, href }) {
	const [open, setOpen] = useState(false);
	return (
		<span className="relative inline-block">
			<Button
				variant="plain"
				type="button"
				className="underline decoration-dotted underline-offset-2 cursor-help text-amber-800 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
				aria-describedby={open ? `gltip-${term}` : undefined}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
			>
				{children || term}
			</Button>
			{open && (
				<div
					id={`gltip-${term}`}
					role="tooltip"
					className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-64 max-w-xs rounded-lg border border-amber-200 bg-white shadow-lg p-3 text-[13px] text-gray-800 animate-fadeIn"
				>
					<div className="font-semibold text-amber-900 mb-1 text-sm">{term}</div>
					<div className="leading-snug mb-1">{description}</div>
					{href && <a href={href} className="text-amber-700 hover:text-amber-800 text-xs font-medium inline-flex items-center gap-1 focus:outline-none focus-visible:focus-ring rounded">Mehr erfahren →</a>}
				</div>
			)}
		</span>
	);
}

export default GlossaryTooltip;
