import { useQuery } from '@tanstack/react-query';
import type { Entry, Event, Magazine, StrapiListResponse } from '@/types/strapi';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';

async function strapiGet<T>(path: string): Promise<StrapiListResponse<T>> {
  const res = await fetch(`${STRAPI_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<StrapiListResponse<T>>;
}

export function useMagazines(params = 'populate=*') {
  return useQuery({
    queryKey: ['magazines', params],
    queryFn: () => strapiGet<Magazine>(`/api/magazines?${params}`),
  });
}

export function useMagazine(slug: string) {
  return useQuery({
    queryKey: ['magazine', slug],
    queryFn: () =>
      strapiGet<Magazine>(
        `/api/magazines?filters[slug][$eq]=${slug}&populate=cover_img&populate=entries.media_files`,
      ),
    enabled: !!slug,
  });
}

export function useEvents(params = 'populate=featured_image&sort=createdAt:desc') {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => strapiGet<Event>(`/api/events?${params}`),
  });
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: ['event', slug],
    queryFn: () =>
      strapiGet<Event>(
        `/api/events?filters[slug][$eq]=${slug}&populate=featured_image&populate=gallery`,
      ),
    enabled: !!slug,
  });
}

export function useEntries(params = 'pagination[limit]=15&populate=magazine') {
  return useQuery({
    queryKey: ['entries', params],
    queryFn: () => strapiGet<Entry>(`/api/entries?${params}`),
  });
}

export function useEntry(slug: string) {
  return useQuery({
    queryKey: ['entry', slug],
    queryFn: () =>
      strapiGet<Entry>(
        `/api/entries?filters[slug][$eq]=${slug}&populate=media_files&populate=magazine`,
      ),
    enabled: !!slug,
  });
}

export function useRelatedEntries(magazineId: number | undefined, excludeEntryId: number | undefined) {
  return useQuery({
    queryKey: ['related-entries', magazineId, excludeEntryId],
    queryFn: () =>
      strapiGet<Entry>(
        `/api/entries?filters[magazine][id][$eq]=${magazineId}&filters[id][$ne]=${excludeEntryId}&populate=media_files&populate=magazine`,
      ),
    enabled: !!magazineId && !!excludeEntryId,
  });
}
