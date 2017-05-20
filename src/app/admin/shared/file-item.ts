import { SafeUrl } from "@angular/platform-browser";

export interface FileItem {
  lastModifiedDate: Date;
  objectURL: SafeUrl;
  name: string;
  size: number;
  type: string;
}
