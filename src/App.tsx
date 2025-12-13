// App.tsx（直接替换之前的）
import React, { useEffect, useRef } from "react";
import "./App.css";

const me = {
  name: "Will/ZX",
  title: "全栈开发者 · 独立创作者",
  bio: "把疯狂的想法写成代码，把代码变成现实",
  avatar: "https://avatars.githubusercontent.com/u/20078022?v=4",
  links: [
    {
      name: "GitHub",
      url: "https://github.com/zhengjialux",
      icon: "/icons/Github.svg",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/kunsile16",
      icon: "/icons/Twitter.svg",
    },
    {
      name: "Email",
      url: "15879398507@163.com",
      icon: "/icons/Gmail.svg",
    },
  ],
};

const works = [
  {
    title: "JPCodePlayground",
    desc: "代码在线调试。支持 JavaScript And Python",
    url: "https://github.com/OFEXJS/JPCodePlayground.git",
    icon: "JPCodePlayground.svg",
  },
  {
    title: "FundTabelTools",
    desc: "简单的报表统计可视化工具",
    url: "https://github.com/OFEXJS/FundTabelTools.git",
    icon: "FundTabelTools.svg",
  },
  {
    title: "dailyUI",
    desc: "日常开箱即用的UI组件",
    url: "https://github.com/OFEXJS/dailyUI.git",
  },
  {
    title: "Utility",
    desc: "日常使用的工具方法集合",
    url: "https://github.com/OFEXJS/Utility.git",
    cover: "",
  },
  {
    title: "lineage-datahub",
    desc: "抽离开源项目 DataHub 的血缘交互组件",
    url: "https://github.com/IDEADEMOX/lineage-datahub.git",
  },
  {
    title: "data-lineage-ui",
    desc: "抽离开源项目 open-mate-data 的数据血缘呈现组件",
    url: "https://github.com/IDEADEMOX/data-lineage-ui.git",
  },
];

type articlesItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  url: string;
}
// 文章数据（测试数据）
const articles = [] as articlesItem[];

type instanceItem = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url: string;
  icon?: string;
  status: 'online' | 'offline' | 'development' | 'updated' | 'upcoming';
}
// 状态标签映射
const instanceStatusMap = {
  'online': '在线',
  'offline': '离线', 
  'development': '开发中',
  'updated': '持续更新中',
  'upcoming': '即将推出'
};

// 实例数据（测试数据）
const instances = [
  {
    id: 1,
    title: '代码在线编辑器',
    description: '支持 Javascript、Python 实时代码编辑和运行',
    tags: ['Javascript', 'Python', 'Node.js'],
    url: 'https://zhengjialux.github.io/Entry/CodePlayground/index.html',
    icon: '/icons/JPCodePlayground.svg',
    status: 'online' as const
  },
  {
    id: 2,
    title: 'React 组件库',
    description: '展示各种可复用UI组件示例',
    tags: ['React', '组件', 'UI', 'Typescript'],
    url: 'https://zhengjialux.github.io/Entry/ExampleGalleryTR/index.html',
    icon: '/icons/ExampleGalleryTR.svg',
    status: 'updated' as const
  },
] as instanceItem[];

const App: React.FC = () => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const [isArticlesCollapsed, setIsArticlesCollapsed] = React.useState(false);
  const [isInstancesDrawerOpen, setIsInstancesDrawerOpen] = React.useState(false);

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

  return (
    <div className="app">
      {/* 左侧实例抽屉 */}
      <aside className={`instances-drawer ${isInstancesDrawerOpen ? 'open' : 'closed'}`}>
        <div className="drawer-header">
          <button 
            className="drawer-toggle"
            onClick={() => setIsInstancesDrawerOpen(!isInstancesDrawerOpen)}
            aria-label={isInstancesDrawerOpen ? "关闭实例列表" : "打开实例列表"}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              {isInstancesDrawerOpen ? (
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              ) : (
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
              )}
            </svg>
          </button>
          <h2 className={`drawer-title ${isInstancesDrawerOpen ? '' : 'hidden'}`}>实例列表</h2>
        </div>
        <div className={`instances-content ${isInstancesDrawerOpen ? 'open' : 'closed'}`}>
          <div className="instances-list">
            {instances.map((instance) => (
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
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
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
          {me.links.map((link) => (
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
      <section className={`articles-section ${isArticlesCollapsed ? 'collapsed' : ''}`}>
        <div className="articles-header">
          <button 
            className="toggle-btn"
            onClick={() => setIsArticlesCollapsed(!isArticlesCollapsed)}
            aria-label={isArticlesCollapsed ? "展开文章列表" : "收起文章列表"}
            title={isArticlesCollapsed ? "展开文章列表" : "收起文章列表"}
          >
            <span className={`toggle-icon ${isArticlesCollapsed ? 'collapsed' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </span>
          </button>
          <h2 className={`section-title ${isArticlesCollapsed ? 'hidden' : ''}`}>最新文章</h2>
        </div>
        <div className={`articles-list ${isArticlesCollapsed ? 'collapsed' : ''}`}>
          <div className="articles-list-scroll">
            {articles.length ? articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                className="article-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <span className="article-date">{article.date}</span>
                    <span className="article-category">{article.category}</span>
                    <span className="article-readtime">{article.readTime}</span>
                  </div>
                </div>
                <div className="article-arrow">→</div>
              </a>
            )): (
              <div className="no-articles">
                <div className="no-articles-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    <path d="M9 12l2 2 4-4"/>
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
    </div>
  );
};

export default App;
