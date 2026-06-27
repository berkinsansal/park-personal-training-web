import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/about': {
      tr: '/hakkimizda'
    },
    '/services': {
      tr: '/hizmetler'
    },
    '/trainers': {
      tr: '/egitmenler'
    },
    '/contact': {
      tr: '/iletisim'
    },
    '/music': {
      tr: '/muzik'
    },
    '/admin': '/admin'
  }
});

export type Locale = (typeof routing.locales)[number];
