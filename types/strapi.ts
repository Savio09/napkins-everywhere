export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  mime: string;
  size: number;
  ext?: string;
}

export interface Magazine {
  id: number;
  documentId: string;
  issue_number: string;
  issue_title: string;
  cover_img: StrapiMedia[];
  slug: string;
  entries: Entry[];
  pdf_link?: string;
  epub_link?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Entry {
  id: number;
  documentId: string;
  title: string;
  author?: string;
  content?: string;
  media_files: StrapiMedia[];
  magazine?: Magazine;
  slug: string;
  category?: string;
  content_type: 'text_only' | 'images_only' | 'images_and_text' | 'mixed_media';
  is_slide_show?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Event {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  description?: string;
  highlights?: unknown[];
  featured_image?: StrapiMedia;
  gallery: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}
