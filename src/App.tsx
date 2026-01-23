import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import {
  type worksItem,
  type ArticleItem,
  type InstanceItem,
  type linksItem,
} from "./App.d";
import ArticleList from "./components/articles/ArticleList";

const me = config?.me || {};

const works: worksItem[] = config?.works || [];

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
  const [isInstancesDrawerOpen, setIsInstancesDrawerOpen] = useState(false);
  const navigate = useNavigate();

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

  const openArticle = (article: ArticleItem) => {
    navigate(`/article/${article.id}`);
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
          <div className="avatar-border" />
          <img src={me.avatar} alt={me.name} className="avatar" />
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
      <ArticleList onOpenArticle={openArticle} />

      {/* 子路由出口 */}
      <Outlet />
    </div>
  );
};

export default App;