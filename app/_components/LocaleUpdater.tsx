'use client';

import { useEffect } from 'react';

export default function LocaleUpdater() {
  useEffect(() => {
    const match = document.cookie.match(/locale=([^;]+)/);
    document.documentElement.lang = match ? match[1] : 'tr';
  }, []);

  return null;
}
