export interface Post {
  published: number;
  created: number;
  modified?: number;
  modifier?: string;
  slug: string;
  status?: string;
  permaLink?: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  featuredImage?: {
    storageURL: string;
    webp: string;
  };
  comment_status?: string;
  sticky?: boolean;
  categories?: string[];
  $key?: string;
}
