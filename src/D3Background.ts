import * as d3 from 'd3';

// 创建D3背景动画
const createD3Background = () => {
  // 创建全屏背景容器
  const background = d3.select('body')
    .append('div')
    .style('position', 'fixed')
    .style('top', 0)
    .style('left', 0)
    .style('width', '100vw')
    .style('height', '100vh')
    .style('z-index', -1)
    .style('background', '#0f172a');

  // 设置body和root背景透明
  d3.select('body').style('background', 'transparent');
  d3.select('#root').style('background', 'transparent');
  // 创建粒子系统
  const particleCount = 150;
  const particles = background.selectAll('div')
    .data(d3.range(particleCount))
    .enter()
    .append('div')
    .style('position', 'absolute')
    .style('width', d => `${Math.random() * 5 + 1}px`)
    .style('height', d => `${Math.random() * 5 + 1}px`)
    .style('background', d => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`)
    .style('border-radius', '50%')
    .style('left', d => `${Math.random() * 100}vw`)
    .style('top', d => `${Math.random() * 100}vh`)
    .style('box-shadow', d => `0 0 ${Math.random() * 10 + 5}px rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`);

  // 动画函数
  const animateParticles = () => {
    particles
      .transition()
      .duration(d => Math.random() * 3000 + 2000)
      .style('left', d => `${Math.random() * 100}vw`)
      .style('top', d => `${Math.random() * 100}vh`)
      .style('opacity', d => Math.random() * 0.8 + 0.2)
      .on('end', animateParticles);
  };

  // 启动动画
  animateParticles();

  // 窗口大小变化时调整背景
  window.addEventListener('resize', () => {
    background
      .style('width', '100vw')
      .style('height', '100vh');
  });
};

// 当DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createD3Background);
} else {
  createD3Background();
}