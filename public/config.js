const config = {
  // 个人信息
  me: {
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
        url: "mailto:zhengjialu8507@gmail.com",
        icon: "/icons/Gmail.svg",
      },
    ],
  },
  // 项目数据
  works: [
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
  ],
  // 实例数据
  instances: [
    {
      id: 1,
      title: "代码在线编辑器",
      description: "支持 Javascript、Python 实时代码编辑和运行",
      tags: ["Javascript", "Python", "Node.js"],
      url: "/Entry/CodePlayground/",
      icon: "/icons/JPCodePlayground.svg",
      status: "online",
    },
    {
      id: 2,
      title: "React 组件库",
      description: "展示各种可复用React UI组件示例",
      tags: ["React", "组件", "UI", "Typescript"],
      url: "/Entry/ExampleGalleryTR/",
      icon: "/icons/ExampleGalleryTR.svg",
      status: "updated",
    },
    {
      id: 3,
      title: "Vue 组件库",
      description: "展示各种可复用Vue UI组件示例",
      tags: ["Vue", "组件", "UI", "Typescript"],
      url: "/Entry/ExampleGalleryTV/",
      icon: "/icons/ExampleGalleryTV.svg",
      status: "updated",
    },
    {
      id: 4,
      title: "报表可视化分析工具",
      description: "交互式数据报表可视化分析工具",
      tags: ["数据可视化", "报表", "分析", "图表"],
      url: "",
      winDownloadUrl:
        "https://github.com/OFEXJS/FundTabelTools/releases/download/v1.0.0/fundtabeltools-Setup.exe",
      macDownloadUrl:
        "https://github.com/OFEXJS/FundTabelTools/releases/download/v1.0.0/fundtabeltools-mac-x64.zip",
      icon: "/icons/FundTabelTools.svg",
      status: "application",
    },
  ],
  // 文章数据
  articles: [
    {
      id: 1,
      title: "Never give up",
      excerpt: "不抛弃心中的梦想，不放弃脚下的坚持，不退缩于眼前的困难。",
      date: "2025-12-22",
      category: "励志",
      readTime: "8 min",
      url: "/blog/never-give-up.md",
    },
  ],
};
