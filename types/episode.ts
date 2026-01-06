export interface Episode {
  id: string;
  title: string;
  description: string;
  image?: string;
  publishDate: string;
  duration: number | string;
  tags: string[];
  transcript?: string | null;
  audioUrl?: string;
  slug: string;
  featured?: boolean;
}

