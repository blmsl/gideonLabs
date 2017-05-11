export interface Picture {
  date: number;
  slug: string;
  link: string;
  title: string;
  author: string;
  caption: string;
  altText: string;
  type: string;
  storageUrl: string;
  featured: boolean;
  mediaDetails?: {
    width: number;
    height: number;
    file: string;
    sizes: {
      thumbnail: {
        file: string;
        width: number;
        height: string;
        mimeType: string;
        storageUrl: string;
      };
      full: {
        file: string;
        width: number;
        height: string;
        mimeType: string;
        storageUrl: string;
      };
    };
    metadata?: {
      aperture: string;
      credit?: string;
      camera: string;
      caption?: string;
      createdTimestamp: number;
      copyright?: string;
      focalLength: number;
      iso: number;
      shutterSpeed: number;
      title: string;
      orientation?: string;
    };
  };
}
