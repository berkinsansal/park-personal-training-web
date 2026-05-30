'use client';

import { useEffect } from 'react';

export default function LocaleUpdater() {
  useEffect(() => {
    function updateLang() {
      const match = document.cookie.match(/locale=([^;]+)/);
      const locale = match ? match[1] : 'tr';
      document.documentElement.lang = locale;
    }

    // Update on mount
    updateLang();

    // Watch for cookie changes by polling (simple but effective)
    const interval = setInterval(updateLang, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
}
