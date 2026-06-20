const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';

export const createLocalImageURL = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${STRAPI_BASE_URL}${path}`;
};
