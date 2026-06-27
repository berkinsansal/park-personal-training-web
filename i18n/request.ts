import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await Promise.resolve(requestLocale)) as string;

  if (!locale || ![...(routing.locales as unknown as string[])].includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
