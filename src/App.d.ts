export type worksItem = {
  title: string;
  desc: string;
  url: string;
  icon?: string;
  cover?: string;
};

export type ArticleItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  url: string; // Markdown 文件的 URL，例如："/articles/article1.md" 或远程 URL
};

export type InstanceItem = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url: string;
  icon?: string;
  status:
    | "online"
    | "offline"
    | "development"
    | "updated"
    | "upcoming"
    | "application";
  winDownloadUrl?: string;
  macDownloadUrl?: string;
};

export type linksItem = {
  name: string;
  url: string;
  icon: string;
};
