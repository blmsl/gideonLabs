export interface Category {
  count: number;
  description?: string;
  link: string;
  name: string;
  slug: string;
  parent?: string;
  children?: Category[];
  level?: number;
  $key?: string;
}
