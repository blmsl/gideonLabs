export interface Post {
  published: number;
  created: number;
  modified?: number;
  modifier?: string;
  slug: string;
  status?: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  featured_media?: string;
  comment_status?: string;
  sticky?: boolean;
  category: string;
}