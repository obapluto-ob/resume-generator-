export type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  readingTime: string;
  featured?: boolean;
};
