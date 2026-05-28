import { tr } from './tr';
import { en } from './en';

export type Locale = 'tr' | 'en';
export type Dict = typeof tr;

export function getDict(locale: Locale): Dict {
  return locale === 'en' ? en : tr;
}
