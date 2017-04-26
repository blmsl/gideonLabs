export interface Category {
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  children?: Category[];
}
