import { type ArticleItem } from '../../App.d';

// 文章服务类，处理文章相关的逻辑
export class ArticleService {
  // 获取所有文章
  static getArticles(): ArticleItem[] {
    return config?.articles || [];
  }

  // 根据ID获取文章
  static getArticleById(id: number): ArticleItem | undefined {
    return this.getArticles().find(article => article.id === id);
  }

  // 获取文章分类列表
  static getCategories(): string[] {
    const articles = this.getArticles();
    const categories = Array.from(new Set(articles.map(article => article.category)));
    return ['全部', ...categories];
  }

  // 将 readTime (HH:MM) 转换为总分钟数以便比较
  static convertReadTimeToMinutes(readTime: string): number {
    const [hours, minutes] = readTime.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // 过滤和排序文章
  static filterAndSortArticles(
    articles: ArticleItem[],
    category: string,
    sortOrder: 'desc' | 'asc',
    searchKeyword: string
  ): ArticleItem[] {
    // 筛选
    let result = articles;

    // 分类筛选
    if (category !== '全部') {
      result = result.filter(
        (article) => article.category === category
      );
    }

    // 搜索关键词筛选
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      result = result.filter((article) =>
        article.title.toLowerCase().includes(keyword)
      );
    }

    // 排序
    return [...result].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const timeDiff = dateB.getTime() - dateA.getTime();

      // 如果日期相同，则根据 readTime 排序
      if (timeDiff === 0) {
        const readTimeA = this.convertReadTimeToMinutes(a.readTime);
        const readTimeB = this.convertReadTimeToMinutes(b.readTime);
        return sortOrder === 'desc'
          ? readTimeB - readTimeA
          : readTimeA - readTimeB;
      }

      return sortOrder === 'desc' ? timeDiff : -timeDiff;
    });
  }

  // 获取上一篇和下一篇文章
  static getAdjacentArticles(currentId: number): { prev: ArticleItem | null; next: ArticleItem | null } {
    const articles = this.getArticles();
    const currentIndex = articles.findIndex(article => article.id === currentId);
    
    const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
    const next = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
    
    return { prev, next };
  }

  // 获取文章内容（Markdown）
  static async getArticleContent(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.text();
    } catch (error) {
      console.error('Fetch error:', error);
      return '# 加载失败\n\n文章内容加载出错，请检查网络或稍后重试。';
    }
  }
}
