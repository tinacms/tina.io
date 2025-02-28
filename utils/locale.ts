import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../middleware';

export function saveLocaleToCookie(locale: string) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Attempted to save unsupported locale: ${locale}`);
    locale = DEFAULT_LOCALE;
  }

  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  document.cookie = `NEXT_LOCALE=${locale}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  console.log(`Saved locale to cookie: ${locale}`);
}
