import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useLoaderData, useNavigate } from "react-router-dom";
import { type ArticleItem } from "../App.d";
import { ArticleService } from "../components/articles/ArticleService";

interface LoaderData {
  article: ArticleItem;
  content: string;
}

const ArticleDetail: React.FC = () => {
  const { article, content } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  
  // 获取上一篇和下一篇文章
  const { prev, next } = ArticleService.getAdjacentArticles(article.id);

  const handleBack = () => {
    navigate('/');
  };

  const handlePrev = () => {
    if (prev) {
      navigate(`/article/${prev.id}`);
    }
  };

  const handleNext = () => {
    if (next) {
      navigate(`/article/${next.id}`);
    }
  };

  return (
    <div className="article-detail-page">
      {/* 面包屑导航 */}
      <div className="breadcrumb">
        <span 
          className="breadcrumb-item home"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        >
          首页
        </span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item category">{article.category}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item title" style={{ marginBottom: 0 }}>{article.title}</span>
      </div>

      {/* 文章内容 */}
      <div className="article-content-wrapper">
        {/* 文章标题 */}
        <div className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-date">{article.date}</span> ·
            <span className="article-category">{article.category}</span> ·
            <span className="article-readtime">{article.readTime}</span>
          </div>
        </div>

        {/* 上下章导航按钮 */}
        <div className="article-nav">
          <button
            onClick={handlePrev}
            disabled={!prev}
            className="nav-btn prev"
          >
            <span className="nav-arrow">←</span>
            <span className="nav-content">
              <span className="nav-label">上一章</span>
              <span className="nav-title">{prev?.title || "没有了"}</span>
            </span>
          </button>

          <button
            onClick={handleNext}
            disabled={!next}
            className="nav-btn next"
          >
            <span className="nav-content">
              <span className="nav-label">下一章</span>
              <span className="nav-title">{next?.title || "没有了"}</span>
            </span>
            <span className="nav-arrow">→</span>
          </button>
        </div>

        {/* 内容区 */}
        <div className="article-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: "heading-link",
                  },
                },
              ],
            ]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;