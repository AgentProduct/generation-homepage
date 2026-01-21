import React, { useState, useMemo } from 'react';
import { type ArticleItem } from '../../App.d';
import { ArticleService } from './ArticleService';

interface ArticleListProps {
  onOpenArticle: (article: ArticleItem) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ onOpenArticle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 获取所有文章
  const articles = ArticleService.getArticles();
  
  // 获取分类列表
  const categories = ArticleService.getCategories();

  // 过滤和排序文章列表
  const filteredAndSortedArticles = useMemo(() => {
    return ArticleService.filterAndSortArticles(
      articles,
      selectedCategory,
      sortOrder,
      searchKeyword
    );
  }, [articles, selectedCategory, sortOrder, searchKeyword]);

  return (
    <section
      className={`articles-section ${isCollapsed ? 'collapsed' : ''}`}
    >
      <div className="articles-header">
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? '展开文章列表' : '收起文章列表'}
          title={isCollapsed ? '展开文章列表' : '收起文章列表'}
        >
          <span
            className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </span>
        </button>
        <h2
          className={`section-title ${isCollapsed ? 'hidden' : 'slow'}`}
        >
          最新文章
        </h2>
        <div
          className={`articles-filters ${isCollapsed ? 'hidden' : 'slow'}`}
        >
          {/* 分类筛选 */}
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* 排序选择 */}
          <select
            className="filter-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
          >
            <option value="desc">最新优先</option>
            <option value="asc">最早优先</option>
          </select>
        </div>
      </div>
      <div
        className={`articles-list ${isCollapsed ? 'collapsed' : ''}`}
      >
        {/* 搜索框 */}
        <div className="articles-search">
          <input
            type="text"
            className="search-input"
            placeholder="搜索文章标题..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className="articles-list-scroll">
          {filteredAndSortedArticles.length ? (
            filteredAndSortedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="article-item"
                style={{ cursor: 'pointer' }}
              >
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <span className="article-date">{article.date}</span>
                    <span className="article-category">
                      {article.category}
                    </span>
                    <span className="article-readtime">
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <div className="article-arrow">→</div>
              </div>
            ))
          ) : (
            <div className="no-articles">
              <div className="no-articles-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className="no-articles-content">
                <h3>暂无文章</h3>
                <p>精彩内容正在路上，敬请期待...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleList;
