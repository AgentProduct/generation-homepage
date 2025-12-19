import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 支持表格、删除线等 GFM 特性
import {
  type worksItem,
  type ArticleItem,
  type InstanceItem,
  type linksItem,
} from "./App.d";

const me = config?.me || {};

const works: worksItem[] = config?.works || [];

// 文章数据（新增测试数据，url 指向 Markdown 文件）
const articles: ArticleItem[] = config?.articles || [];

// 状态标签映射
const instanceStatusMap = {
  online: "在线",
  offline: "离线",
  development: "开发中",
  updated: "持续更新中",
  upcoming: "即将推出",
  application: "App",
};

// 实例数据
const instances: InstanceItem[] = config?.instances || [];

const App: React.FC = () => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const [isArticlesCollapsed, setIsArticlesCollapsed] = useState(false);
  const [isInstancesDrawerOpen, setIsInstancesDrawerOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(
    null
  );
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // 计算当前文章的上一章和下一章（用于预览标题）
  const currentIndex = selectedArticle
    ? articles.findIndex((a) => a.id === selectedArticle.id)
    : -1;

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  useEffect(() => {
    const container = starsContainerRef.current;
    if (!container) return;

    // 清空容器
    container.innerHTML = "";

    // 生成星星
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // 随机属性
      const size = Math.random() * 2 + 1; // 1-3px
      const left = Math.random() * 100; // 0-100%
      const top = Math.random() * 100; // 0-100%
      const duration = Math.random() * 3 + 2; // 2-5s
      const opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8

      // 设置样式
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.setProperty("--duration", `${duration}s`);
      star.style.setProperty("--opacity", `${opacity}`);

      container.appendChild(star);
    }
  }, []);

  // 新增：拖拽相关状态
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const openArticle = async (article: ArticleItem) => {
    setIsLoading(true); // 先设置 loading
    setMarkdownContent(""); // 清空旧内容，避免闪烁
    setSelectedArticle(article); // 然后设置新文章
    try {
      const response = await fetch(article.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      setMarkdownContent(text);
    } catch (error) {
      console.error("Fetch error:", error);
      setMarkdownContent(
        "# 加载失败\n\n文章内容加载出错，请检查网络或稍后重试。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setMarkdownContent("");
    setIsLoading(false); // 关闭时重置 loading
  };

  // 上一章 / 下一章 - 先设置 loading 和清空内容
  const goToPrev = () => {
    if (!selectedArticle || currentIndex <= 0) return;
    openArticle(articles[currentIndex - 1]);
  };

  const goToNext = () => {
    if (!selectedArticle || currentIndex >= articles.length - 1) return;
    openArticle(articles[currentIndex + 1]);
  };

  // 拖拽逻辑保持不变
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".modal-content")) return; // 内容区不触发拖拽
    setIsDragging(true);
    const modal = modalRef.current;
    if (!modal) return;
    const rect = modal.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !modalRef.current) return;
      modalRef.current.style.left = `${e.clientX - dragOffset.x}px`;
      modalRef.current.style.top = `${e.clientY - dragOffset.y}px`;
      modalRef.current.style.transform = "none"; // 拖拽时取消动画居中
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  // 重置位置（双击标题栏居中）
  const handleDoubleClick = () => {
    if (!modalRef.current) return;
    modalRef.current.style.left = "50%";
    modalRef.current.style.top = "50%";
    modalRef.current.style.transform = "translate(-50%, -50%)";
  };

  return (
    <div className="app">
      {/* 左侧实例抽屉 */}
      <aside
        className={`instances-drawer ${
          isInstancesDrawerOpen ? "open" : "closed"
        }`}
      >
        <div className="drawer-header">
          <button
            className="drawer-toggle"
            onClick={() => setIsInstancesDrawerOpen(!isInstancesDrawerOpen)}
            aria-label={isInstancesDrawerOpen ? "关闭实例列表" : "打开实例列表"}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              {isInstancesDrawerOpen ? (
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              ) : (
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
              )}
            </svg>
          </button>
          <h2
            className={`drawer-title ${isInstancesDrawerOpen ? "" : "hidden"}`}
          >
            实例列表
          </h2>
        </div>
        <div
          className={`instances-content ${
            isInstancesDrawerOpen ? "open" : "closed"
          }`}
        >
          <div className="instances-list">
            {instances.map((instance) =>
              instance.status === "application" ? (
                <div
                  key={instance.id}
                  className="instance-card application-card"
                >
                  <div className="instance-header">
                    {instance.icon && (
                      <img
                        src={instance.icon}
                        alt={instance.title}
                        className="instance-icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                    <h3 className="instance-title">{instance.title}</h3>
                    <span className={`instance-status ${instance.status}`}>
                      {instanceStatusMap[instance.status]}
                    </span>
                  </div>
                  <p className="instance-description">{instance.description}</p>
                  <div className="instance-tags">
                    {instance.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="application-actions">
                    {(instance.url ||
                      instance.winDownloadUrl ||
                      instance.macDownloadUrl) && (
                      <div className="download-buttons">
                        {instance.url && (
                          <button
                            className="download-btn primary"
                            onClick={() => window.open(instance.url, "_blank")}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                            通用下载
                          </button>
                        )}
                        {instance.winDownloadUrl && (
                          <button
                            className="download-btn windows"
                            onClick={() =>
                              window.open(instance.winDownloadUrl, "_blank")
                            }
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                            Windows
                          </button>
                        )}
                        {instance.macDownloadUrl && (
                          <button
                            className="download-btn macos"
                            onClick={() =>
                              window.open(instance.macDownloadUrl, "_blank")
                            }
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                            macOS
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : instance.url ? (
                <a
                  key={instance.id}
                  href={instance.url}
                  className="instance-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="instance-header">
                    {instance.icon && (
                      <img
                        src={instance.icon}
                        alt={instance.title}
                        className="instance-icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                    <h3 className="instance-title">{instance.title}</h3>
                    <span className={`instance-status ${instance.status}`}>
                      {instanceStatusMap[instance.status]}
                    </span>
                  </div>
                  <p className="instance-description">{instance.description}</p>
                  <div className="instance-tags">
                    {instance.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ) : null
            )}
          </div>
        </div>
      </aside>

      {/* 毛玻璃英雄区 */}
      <header className="hero" style={{ position: "relative" }}>
        <div ref={starsContainerRef} className="stars-container" />
        <div className="avatar-wrapper">
          <img src={me.avatar} alt={me.name} className="avatar" />
          <div className="avatar-glow" />
        </div>

        <h1 className="name">{me.name}</h1>
        <p className="title">{me.title}</p>
        <p className="bio">{me.bio}</p>

        <div className="social">
          {me?.links?.map((link: linksItem) => (
            <span className={`icon icon-${link.name}`} key={link.name}>
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  style={{ width: "45px" }}
                />
              </a>
            </span>
          ))}
        </div>
      </header>

      {/* 作品网格 */}
      <main className="works">
        {works.map((work, i) => (
          <a
            key={i}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card"
            style={{
              backgroundImage: work.cover
                ? `url(${work.cover})`
                : work.url.includes("github.com")
                ? "linear-gradient(135deg, #0d1117, #161b22)"
                : undefined,
            }}
          >
            {/* GitHub 项目自动图标 */}
            {work.url.includes("github.com") && !work.cover && (
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub"
                className="github-mark"
              />
            )}

            {/* 遮罩层 */}
            <div className="card-content">
              <h3>
                {work.icon && (
                  <img
                    src={`/icons/${work.icon}`}
                    alt={work.title}
                    style={{ width: "24px", marginRight: 10 }}
                  />
                )}
                {work.title}
              </h3>
              <p>{work.desc}</p>
              <span className="link-hint">查看项目 →</span>
            </div>

            {/* 毛玻璃标签（自定义封面才有） */}
            {work.cover && <div className="glass-tag">作品</div>}
          </a>
        ))}
      </main>

      {/* 文章列表 */}
      <section
        className={`articles-section ${isArticlesCollapsed ? "collapsed" : ""}`}
      >
        <div className="articles-header">
          <button
            className="toggle-btn"
            onClick={() => setIsArticlesCollapsed(!isArticlesCollapsed)}
            aria-label={isArticlesCollapsed ? "展开文章列表" : "收起文章列表"}
            title={isArticlesCollapsed ? "展开文章列表" : "收起文章列表"}
          >
            <span
              className={`toggle-icon ${
                isArticlesCollapsed ? "collapsed" : ""
              }`}
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
            className={`section-title ${isArticlesCollapsed ? "hidden" : "slow"}`}
          >
            最新文章
          </h2>
        </div>
        <div
          className={`articles-list ${isArticlesCollapsed ? "collapsed" : ""}`}
        >
          <div className="articles-list-scroll">
            {articles.length ? (
              articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className="article-item"
                  style={{ cursor: "pointer" }}
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

      {/* 新增：文章查看模态框 */}
      {selectedArticle && (
        <div className="article-modal-wrapper">
          <div
            ref={modalRef}
            className="article-modal draggable"
            onMouseDown={handleMouseDown}
          >
            {/* 标题栏 */}
            <div className="modal-header" onDoubleClick={handleDoubleClick}>
              <h2 className="modal-title">{selectedArticle.title}</h2>
              <button className="modal-close" onClick={closeModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>

            <div className="modal-meta">
              <span>{selectedArticle.date}</span> ·{" "}
              <span>{selectedArticle.category}</span> ·{" "}
              <span>{selectedArticle.readTime}</span>
            </div>

            {/* 上下章导航按钮 */}
            <div className="modal-nav-enhanced">
              <button
                onClick={goToPrev}
                disabled={!prevArticle || isLoading} // loading 中禁用，防止重复点击
                className="nav-btn-enhanced prev"
              >
                <div className="nav-arrow">{isLoading ? "⟳" : "←"}</div>
                <div className="nav-content">
                  <span className="nav-label">上一章</span>
                  <span className="nav-title-preview">
                    {prevArticle ? prevArticle.title : "没有了"}
                  </span>
                </div>
              </button>

              <button
                onClick={goToNext}
                disabled={!nextArticle || isLoading}
                className="nav-btn-enhanced next"
              >
                <div className="nav-content">
                  <span className="nav-label">下一章</span>
                  <span className="nav-title-preview">
                    {nextArticle ? nextArticle.title : "没有了"}
                  </span>
                </div>
                <div className="nav-arrow">{isLoading ? "⟳" : "→"}</div>
              </button>
            </div>

            {/* 内容区：loading 时显示动画 */}
            <div className={`modal-content ${isLoading ? "loading" : ""}`}>
              {isLoading ? (
                <div className="loading-spinner">加载中...</div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdownContent}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
