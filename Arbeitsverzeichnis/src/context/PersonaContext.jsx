import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Zentraler Context für Persona (privat/gewerbe) & Memory (Dialog Historie, einfache Präferenzen)
const PersonaContext = createContext(null);

export function PersonaProvider({ children }) {
	const [persona, setPersona] = useState('privat');
	const [preferences, setPreferences] = useState({}); // z.B. { speicher: true }
	const [history, setHistory] = useState([]); // Chat/Memory Dialog Turns [{role:'user'|'assistant', content:string, ts:number}]

	// Laden aus localStorage
	useEffect(() => {
		try {
			const p = localStorage.getItem('zoe_persona');
			if (p === 'privat' || p === 'gewerbe') setPersona(p);
			const prefRaw = localStorage.getItem('zoe_prefs');
			if (prefRaw) setPreferences(JSON.parse(prefRaw));
			const hRaw = localStorage.getItem('zoe_memory');
			if (hRaw) setHistory(JSON.parse(hRaw));
		} catch {}
	}, []);

	// Persistieren
	useEffect(() => {
		try { localStorage.setItem('zoe_persona', persona); } catch {}
	}, [persona]);
	useEffect(() => {
		try { localStorage.setItem('zoe_prefs', JSON.stringify(preferences)); } catch {}
	}, [preferences]);
	useEffect(() => {
		try { localStorage.setItem('zoe_memory', JSON.stringify(history.slice(-50))); } catch {}
	}, [history]);

	const addTurn = useCallback((role, content) => {
		setHistory(h => [...h, { role, content, ts: Date.now() }].slice(-100));
	}, []);

	const value = {
		persona,
		setPersona,
		preferences,
		setPreferences,
		history,
		addTurn
	};
	return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
}

export function usePersona() {
	const ctx = useContext(PersonaContext);
	if (!ctx) {
		// Fail-safe: statt Throw (würde ganze App crashen) geben wir leeres Objekt zurück
		// eslint-disable-next-line no-console
		console.warn('[PersonaContext] außerhalb Provider verwendet – Fallback leerer Context');
		return {};
	}
	return ctx;
}
