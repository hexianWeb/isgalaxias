<script setup>
import { onMounted, ref } from 'vue'
import TechCursor from './components/TechCursor.vue'
import Experience from './js/experience.js'

const threeCanvas = ref(null)

// Header 导航处理函数
function handleNavigation(section, event) {
  // 添加点击反馈动效
  if (event) {
    const button = event.target.closest('.nav-button')
    if (button) {
      button.style.transform = 'scale(0.95)'
      setTimeout(() => {
        button.style.transform = ''
      }, 150)
    }
  }
}

onMounted(() => {
  // 初始化 three.js 场景
  const _experience = new Experience(threeCanvas.value)
  // 存储实例供后续使用
  window._threeExperience = _experience
})
</script>

<template>
  <div class=" w-full bg-black overflow-hidden h-screen" style="pointer-events: none;">
    <!-- 科技风鼠标光标 -->
    <TechCursor />

    <!-- three.js 渲染的 canvas -->
    <canvas ref="threeCanvas" class="three-canvas relative inset-0 " style="pointer-events: auto; z-index: 0;" />

    <!-- Indigo Cosmos Background with Top Glow -->
    <div
      class="fixed inset-0 z-[1]"
      style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), rgba(0, 0, 0, 0.1) ;pointer-events: none;"
    />

    <!-- Header 导航栏 -->
    <header class="header-container">
      <!-- 背景装饰线条 -->
      <!-- <div class="header-decoration" /> -->

      <div class="header-content">
        <!-- 左侧标题 -->
        <div class="header-logo">
          <h1 class="logo-text">
            MAESTROM
          </h1>
        </div>

        <!-- 右侧导航按钮 -->
        <nav class="header-nav">
          <button class="nav-button" data-text="ABOUT" @click="(event) => handleNavigation('ABOUT', event)">
            <span class="nav-text">ABOUT</span>
          </button>
          <button class="nav-button" data-text="WORK" @click="(event) => handleNavigation('WORK', event)">
            <span class="nav-text">WORK</span>
          </button>
          <button class="nav-button" data-text="LAB" @click="(event) => handleNavigation('LAB', event)">
            <span class="nav-text">LAB</span>
          </button>
          <button class="nav-button contact-special" data-text="CONTACT" @click="(event) => handleNavigation('CONTACT', event)">
            <span class="nav-text">CONTACT</span>
            <div class="contact-flow-light" />
          </button>
        </nav>
      </div>
    </header>

    <!-- 标题区域 - 底部呼吸灯之上 -->
    <div class="title-container">
      <!-- 科技感装饰元素 -->
      <div class="tech-decorations">
        <!-- 左侧电路线 -->
        <div class="tech-line tech-line-left" />
        <!-- 右侧电路线 -->
        <div class="tech-line tech-line-right" />
      </div>

      <h1 class="main-title">
        MAESTROM
      </h1>
      <h2 class="sub-title">
        Explorateur Cosmique
      </h2>
    </div>

    <!-- 右侧社交媒体导航栏 -->
    <div class="social-nav-container">
      <div class="social-nav-buttons">
        <!-- Twitter/X 按钮 -->
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          class="social-button twitter-button"
          title="Follow on Twitter"
        >
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <!-- GitHub 按钮 -->
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="social-button github-button"
          title="View on GitHub"
        >
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        <!-- LinkedIn 按钮 -->
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          class="social-button linkedin-button"
          title="Connect on LinkedIn"
        >
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>

    <!-- 呼吸灯效果 - 底部10%位置 -->
    <div class="breathing-container">
      <!-- 环境光晕 -->
      <div class="ambient-glow" />

      <!-- 主呼吸灯 -->
      <div class="breathing-light" />
    </div>

    <!-- 纹理版权脚注 -->
    <footer class="texture-credit">
      <p class="credit-text">
        行星纹理由 <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer" class="credit-link">Solar System Scope</a> 提供，基于 <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" class="credit-link">CC BY 4.0</a> 许可证。
      </p>
    </footer>
  </div>
</template>

<style scoped>
.three-canvas {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  transform: translateY(-252px);
}

/* ===== Header 样式 ===== */
.header-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  pointer-events: auto;
  padding: 1.5rem 2rem;
}

.header-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(168, 85, 247, 0.3) 10%,
    rgba(178, 107, 245, 0.8) 50%,
    rgba(168, 85, 247, 0.3) 90%,
    transparent 100%);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
  animation: headerGlow 4s ease-in-out infinite;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 90vw;
  margin: 0 auto;
  position: relative;
}

/* Logo 样式 */
.header-logo {
  position: relative;
}

.logo-text {
  font-family: "Orbitron", sans-serif;
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  margin: 0;
  color: transparent;
  -webkit-text-stroke: 2px #e9adfa;
  text-shadow:
    0 0 10px rgba(168, 85, 247, 0.6),
    0 0 20px rgba(139, 92, 246, 0.4),
    0 0 30px rgba(192, 132, 252, 0.2);
  animation: logoGlow 3s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo-text:hover {
  -webkit-text-stroke: 1px rgba(168, 85, 247, 1);
  text-shadow:
    0 0 15px rgba(168, 85, 247, 0.8),
    0 0 25px rgba(139, 92, 246, 0.6),
    0 0 35px rgba(192, 132, 252, 0.4);
  transform: scale(1.05);
}

/* 导航按钮样式 */
.header-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-button {
  position: relative;
  background: transparent;
  border: none;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  overflow: hidden;
  font-family: "Orbitron", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}

.nav-text {
  position: relative;
  z-index: 2;
  font-size: 1.5rem;
  color: #f0d9f7;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.3);
  transition: all 0.3s ease;
}

/* 按钮背景效果 */
.nav-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(168, 85, 247, 0.1) 50%,
    transparent 100%);
  transition: left 0.5s ease;
  z-index: 1;
}

/* 按钮边框效果 */
.nav-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  background: linear-gradient(45deg,
    rgba(168, 85, 247, 0.3),
    rgba(139, 92, 246, 0.2),
    rgba(192, 132, 252, 0.3)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

/* 悬停效果 */
.nav-button:hover::before {
  left: 0;
}

.nav-button:hover::after {
  opacity: 1;
}

.nav-button:hover .nav-text {
  background: linear-gradient(180deg, #fff, #f0d9f7 50%, #e785f5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 0 2px rgba(255, 255, 255, 0.8),
    0 0 4px rgba(255, 255, 255, 0.6),
    0 0 6px rgba(255, 255, 255, 0.4),
    0 0 8px rgba(200, 191, 211, 0.3);
  -webkit-text-stroke: 0.6px rgba(255, 255, 255, 0.8);
  transform: translateY(-1px);
}

/* 按钮激活效果 */
.nav-button:active {
  transform: scale(0.98);
}

.nav-button:active .nav-text {
  background: linear-gradient(180deg, #d8b4fe, #a855f7 50%, #9333ea);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 0 3px rgba(168, 85, 247, 0.8),
    0 0 6px rgba(139, 92, 246, 0.6),
    0 0 12px rgba(124, 58, 237, 0.4);
  -webkit-text-stroke: 0.8px rgba(168, 85, 247, 0.8);
}

/* ===== CONTACT 按钮特殊流光效果 ===== */
.contact-special {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 8px;
  background: linear-gradient(45deg,
    rgba(168, 85, 247, 0.05),
    rgba(139, 92, 246, 0.08),
    rgba(192, 132, 252, 0.05));
}

/* CONTACT 按钮的流光效果 */
.contact-flow-light {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(168, 85, 247, 0.3) 40%,
    rgba(192, 132, 252, 0.5) 50%,
    rgba(168, 85, 247, 0.3) 60%,
    rgba(255, 255, 255, 0.1) 80%,
    transparent 100%);
  animation: contactFlowLight 3s linear infinite;
  z-index: 1;
  pointer-events: none;
}

/* CONTACT 按钮边框流光 */
.contact-special::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg,
    rgba(168, 85, 247, 0.6),
    rgba(139, 92, 246, 0.8),
    rgba(192, 132, 252, 0.6),
    rgba(168, 85, 247, 0.4),
    rgba(139, 92, 246, 0.6));
  background-size: 300% 300%;
  border-radius: 10px;
  z-index: -1;
  animation: contactBorderFlow 4s linear infinite;
}

/* CONTACT 按钮内部背景 */
.contact-special::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  background: linear-gradient(45deg,
    rgba(0, 0, 0, 0.8),
    rgba(20, 20, 30, 0.9),
    rgba(0, 0, 0, 0.8));
  border-radius: 7px;
  z-index: 0;
}

/* CONTACT 按钮文字层级调整 */
.contact-special .nav-text {
  position: relative;
  z-index: 3;
  background: linear-gradient(180deg, #fff, #f0d9f7 50%, #e785f5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 0 2px rgba(255, 255, 255, 0.8),
    0 0 4px rgba(255, 255, 255, 0.6),
    0 0 6px rgba(255, 255, 255, 0.4),
    0 0 8px rgba(168, 85, 247, 0.4);
  -webkit-text-stroke: 0.8px rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* CONTACT 流光动画 */
@keyframes contactFlowLight {
  0% {
    left: -100%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

@keyframes contactBorderFlow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 300% 300%;
  }
}

/* Header 动画 */
@keyframes headerGlow {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
  }
}

@keyframes logoGlow {
  0%, 100% {
    text-shadow:
      0 0 10px rgba(168, 85, 247, 0.6),
      0 0 20px rgba(139, 92, 246, 0.4),
      0 0 30px rgba(192, 132, 252, 0.2);
  }
  50% {
    text-shadow:
      0 0 15px rgba(168, 85, 247, 0.8),
      0 0 25px rgba(139, 92, 246, 0.6),
      0 0 35px rgba(192, 132, 252, 0.4);
  }
}

/* 响应式设计 - Header */
@media (max-width: 1024px) {
  .header-container {
    padding: 1.2rem 1.5rem;
  }

  .header-nav {
    gap: 1.5rem;
  }

    .nav-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  .contact-special {
    border-radius: 6px;
  }

  .logo-text {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }

  .header-nav {
    gap: 1rem;
  }

    .nav-button {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .contact-special {
    border-radius: 5px;
  }

  .contact-special::before {
    border-radius: 7px;
  }

  .contact-special::after {
    border-radius: 4px;
  }

  .logo-text {
    font-size: 1.4rem;
    letter-spacing: 0.1em;
  }
}

@media (max-width: 640px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .header-nav {
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
  }

    .nav-button {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .contact-special {
    border-radius: 4px;
  }

  .contact-special::before {
    border-radius: 6px;
  }

  .contact-special::after {
    border-radius: 3px;
  }

  .logo-text {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0.8rem;
  }

  .header-nav {
    gap: 0.5rem;
  }

    .nav-button {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  .contact-special {
    border-radius: 3px;
  }

  .contact-special::before {
    border-radius: 5px;
  }

  .contact-special::after {
    border-radius: 2px;
  }

  .logo-text {
    font-size: 1rem;
    letter-spacing: 0.08em;
  }
}

/* ===== 右侧社交媒体导航栏样式 ===== */
.social-nav-container {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 25;
  pointer-events: auto;
}

.social-nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

/* 社交媒体按钮基础样式 */
.social-button {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,
    rgba(20, 20, 30, 0.9),
    rgba(40, 40, 60, 0.8),
    rgba(20, 20, 30, 0.9));
  border: 1px solid rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-decoration: none;
  overflow: hidden;
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 85, 247, 0.1);
}

/* 社交媒体图标样式 */
.social-icon {
  width: 24px;
  height: 24px;
  color: rgba(240, 217, 247, 0.8);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

/* 按钮悬停背景效果 */
.social-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(168, 85, 247, 0.1) 0%,
    rgba(139, 92, 246, 0.15) 50%,
    rgba(192, 132, 252, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
  z-index: 1;
}

/* 按钮边框流光效果 */
.social-button::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg,
    rgba(168, 85, 247, 0.6),
    rgba(139, 92, 246, 0.8),
    rgba(192, 132, 252, 0.6),
    rgba(168, 85, 247, 0.4));
  background-size: 300% 300%;
  border-radius: 13px;
  z-index: -1;
  opacity: 0;
  animation: socialBorderFlow 3s linear infinite;
  transition: opacity 0.3s ease;
}

/* 悬停效果 */
.social-button:hover {
  transform: translateY(-2px) scale(1.05);
  border-color: rgba(168, 85, 247, 0.6);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(168, 85, 247, 0.3);
}

.social-button:hover::before {
  opacity: 1;
}

.social-button:hover::after {
  opacity: 1;
}

.social-button:hover .social-icon {
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6));
}

/* 按钮激活效果 */
.social-button:active {
  transform: translateY(0) scale(0.98);
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.5),
    0 0 15px rgba(168, 85, 247, 0.4);
}

/* 各平台特定悬停颜色 */
.twitter-button:hover {
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(29, 161, 242, 0.3);
}

.twitter-button:hover .social-icon {
  filter: drop-shadow(0 0 8px rgba(29, 161, 242, 0.6));
}

.github-button:hover {
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(255, 255, 255, 0.2);
}

.github-button:hover .social-icon {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
}

.linkedin-button:hover {
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(0, 119, 181, 0.3);
}

.linkedin-button:hover .social-icon {
  filter: drop-shadow(0 0 8px rgba(0, 119, 181, 0.6));
}

/* 社交按钮边框流光动画 */
@keyframes socialBorderFlow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 300% 300%;
  }
}

/* 响应式设计 - 社交媒体导航栏 */
@media (max-width: 1024px) {
  .social-nav-container {
    right: 1.5rem;
  }

  .social-button {
    width: 45px;
    height: 45px;
  }

  .social-icon {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 768px) {
  .social-nav-container {
    right: 1rem;
    top: auto;
    bottom: 15%;
    transform: none;
  }

  .social-nav-buttons {
    flex-direction: row;
    gap: 0.8rem;
  }

  .social-button {
    width: 42px;
    height: 42px;
  }

  .social-icon {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 640px) {
  .social-nav-container {
    right: 0.8rem;
    bottom: 12%;
  }

  .social-nav-buttons {
    gap: 0.6rem;
  }

  .social-button {
    width: 38px;
    height: 38px;
    border-radius: 10px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .social-nav-container {
    right: 0.5rem;
    bottom: 10%;
  }

  .social-nav-buttons {
    gap: 0.5rem;
  }

  .social-button {
    width: 35px;
    height: 35px;
    border-radius: 8px;
  }

  .social-button::after {
    border-radius: 9px;
  }

  .social-icon {
    width: 16px;
    height: 16px;
  }
}

/* 标题容器 - 定位到呼吸灯之上 */
.title-container {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  pointer-events: none;
}

/* 科技感装饰容器 */
.tech-decorations {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 200px;
  pointer-events: none;
}

/* 科技线条 */
.tech-line {
  position: absolute;
  top: 115%;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(168, 85, 247, 0.8) 50%,
    transparent 100%);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
}

.tech-line-left {
  animation: techLineLeft 4s ease-in-out infinite;
}

.tech-line-right {
  right: 0px;
  animation: techLineRight 4s ease-in-out infinite;
}

/* 主标题样式 - 科技感动效 */
.main-title {
  font-family: "Orbitron", sans-serif;
  font-size: 6rem;
  font-weight: 550;
  letter-spacing: 0.25em;
  margin: 0 0 0.5rem 0;
  color: transparent;
  position: relative;
  -webkit-text-stroke: 2px rgba(168, 85, 247, 0.1);
  text-shadow:0 0 2px rgba(146,112,226,0),0 0 15px rgba(168, 82, 221, 0.59),0 0 14px rgba(0,0,0,.37),0 0 21px rgba(163,126,248,.19);
  animation:
    techGlow 4s ease-in-out infinite,
    techFlicker 6s linear infinite,
    techPulse 2s ease-in-out infinite alternate;
  overflow: hidden;
}

/* 主标题扫描线效果 */
.main-title::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -50px;
  right: -50px;
  height: 4px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(168, 85, 247, 0.3) 20%,
    rgba(168, 85, 247, 1) 50%,
    rgba(168, 85, 247, 0.3) 80%,
    transparent 100%);
  box-shadow:
    0 0 10px rgba(168, 85, 247, 0.8),
    0 0 20px rgba(139, 92, 246, 0.4),
    0 0 30px rgba(192, 132, 252, 0.2);
  animation: scanLine 3s linear infinite;
  z-index: 1;
}

/* 主标题外层白色描边 */
.main-title::after {
  content: 'MAESTROM';
  position: absolute;
  top: 0;
  left: 0;
  font-family: "Orbitron", sans-serif;
  font-size: 6rem;
  font-weight: 550;
  letter-spacing: 0.25em;
  color: transparent;
  -webkit-text-stroke: 6px rgba(255, 255, 255, 0.952);
  z-index: -2;
  animation: outerWhiteStroke 3s ease-in-out infinite;
}

/* 副标题样式 */
.sub-title {
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 3.5rem;
  letter-spacing: 0.05em;
  margin: 0;
  background: linear-gradient(180deg, #fff, #eccbf5 50%, #dc78f8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.6),
    0 0 2px rgba(255, 255, 255, 0.4),
    0 0 3px rgba(255, 255, 255, 0.2),
    0 0 4px rgba(200, 191, 211, 0.2);
  -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.6);
  animation: subtitleGlow 3s ease-in-out infinite;
}

/* 呼吸灯容器 - 定位到底部10% */
.breathing-container {
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 60px;
  z-index: 10;
  pointer-events: none;
}

/* 主呼吸灯 */
.breathing-light {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 2px;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(139, 92, 246, 0.3) 15%,
      rgba(139, 92, 246, 0.8) 25%,
      rgba(168, 85, 247, 1) 40%,
      rgba(192, 132, 252, 1) 50%,
      rgba(168, 85, 247, 1) 60%,
      rgba(139, 92, 246, 0.8) 75%,
      rgba(139, 92, 246, 0.3) 85%,
      transparent 100%);
  animation: breathe 3s ease-in-out infinite;
  clip-path: ellipse(200px 2px at center);
}

/* 外层光晕 */
.breathing-light::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 20px;
  background: radial-gradient(ellipse,
      rgba(168, 85, 247, 0.4) 0%,
      rgba(139, 92, 246, 0.25) 30%,
      rgba(124, 58, 237, 0.1) 60%,
      transparent 100%);
  border-radius: 50px;
  animation: breatheGlow 3s ease-in-out infinite;
  filter: blur(8px);
}

/* 内层高光 */
.breathing-light::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 15%,
      rgba(255, 255, 255, 0.6) 25%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0.6) 75%,
      rgba(255, 255, 255, 0.2) 85%,
      transparent 100%);
  border-radius: 1px;
  animation: breatheCore 3s ease-in-out infinite;
  filter: blur(1px);
  clip-path: ellipse(100px 1px at center);
}

/* 环境光晕 */
.ambient-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 40px;
  background: radial-gradient(ellipse,
      rgba(139, 92, 246, 0.08) 0%,
      rgba(159, 61, 250, 0.15) 10%,
      rgba(88, 28, 135, 0.02) 70%,
      transparent 100%);
  border-radius: 50%;
  animation: ambientBreathe 3s ease-in-out infinite;
  filter: blur(20px);
}

/* 科技感动画定义 */
@keyframes techGlow {
  0%, 100% {
    text-shadow:
      0 0 2px rgba(146,112,226,0),
      0 0 15px rgba(168, 82, 221, 0.59),
      0 0 14px rgba(0,0,0,.37),
      0 0 21px rgba(163,126,248,.19);
    filter: drop-shadow(0 0 3px rgba(168, 85, 247, 0.4));
  }
  25% {
    text-shadow:
      0 0 5px rgba(192, 132, 252, 0.3),
      0 0 20px rgba(168, 82, 221, 0.8),
      0 0 14px rgba(0,0,0,.37),
      0 0 30px rgba(139, 92, 246, 0.4);
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6));
  }
  50% {
    text-shadow:
      0 0 8px rgba(192, 132, 252, 0.5),
      0 0 25px rgba(168, 82, 221, 1),
      0 0 14px rgba(0,0,0,.37),
      0 0 40px rgba(139, 92, 246, 0.6);
    filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.8));
  }
  75% {
    text-shadow:
      0 0 5px rgba(192, 132, 252, 0.3),
      0 0 20px rgba(168, 82, 221, 0.8),
      0 0 14px rgba(0,0,0,.37),
      0 0 30px rgba(139, 92, 246, 0.4);
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6));
  }
}

@keyframes techFlicker {
  0%, 90%, 100% { opacity: 1; }
  91%, 94%, 96%, 98% { opacity: 0.7; }
  92%, 95%, 97%, 99% { opacity: 1; }
}

@keyframes techPulse {
  0% {
    -webkit-text-stroke-width: 2px;
    letter-spacing: 0.25em;
  }
  100% {
    -webkit-text-stroke-width: 3px;
    letter-spacing: 0.28em;
  }
}

@keyframes scanLine {
  0% {
    top: -10px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 120px;
    opacity: 0;
  }
}

@keyframes techLineLeft {
  0%, 100% {
    transform: translateX(-100px);
    opacity: 0.3;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes techLineRight {
  0%, 100% {
    transform: translateX(100px);
    opacity: 0.3;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 动画定义 */
@keyframes breathe {

  0%,
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scaleX(0.8) scaleY(1.0);
    filter: brightness(0.7);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1.2) scaleY(1.5);
    filter: brightness(1.3);
  }
}

@keyframes breatheGlow {

  0%,
  100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(0.8);
  }

  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.3);
  }
}

@keyframes breatheCore {

  0%,
  100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scaleX(0.7) scaleY(0.5);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1.1) scaleY(1.2);
  }
}

@keyframes ambientBreathe {

  0%,
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(0.9);
  }

  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes float {

  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }

  50% {
    opacity: 0.6;
    transform: translateY(-20px) scale(1);
  }
}

/* 副标题发光动画 */
@keyframes subtitleGlow {

  0%,
  100% {
    text-shadow:
      0 0 2px rgba(242, 135, 252, 0.2),
      0 0 4px rgba(242, 255, 255, 0.4),
      0 0 6px rgba(255, 255, 255, 0.2),
      0 0 8px rgba(200, 191, 211, 0.2);
    filter: brightness(1);
  }

  50% {
    text-shadow:
      0 0 2px rgba(255, 255, 255, 0.8),
      0 0 4px rgba(255, 255, 255, 0.6),
      0 0 6px rgba(255, 255, 255, 0.4),
      0 0 8px rgba(200, 191, 211, 0.3);
    filter: brightness(1.1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title-container {
    bottom: 12%;
  }

  .main-title {
    font-size: 2.5rem;
    letter-spacing: 0.15em;
    -webkit-text-stroke: 0.8px rgba(255, 255, 255, 0.8);
  }

  .tech-decorations {
    width: 100%;
    height: 150px;
    top: -60px;
  }

  .tech-line {
    width: 150px;
  }

  .tech-line-left {
    left: -180px;
  }

  .tech-line-right {
    right: -180px;
  }

  .sub-title {
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    -webkit-text-stroke: 0.4px rgba(255, 255, 255, 0.6);
  }

  .breathing-container {
    width: 300px;
    bottom: 8%;
  }

  .breathing-light {
    width: 300px;
    height: 2px;
  }

  .breathing-light::before {
    width: 250px;
    height: 16px;
  }

  .breathing-light::after {
    width: 150px;
    height: 1px;
  }

  .ambient-glow {
    width: 300px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .title-container {
    bottom: 10%;
  }

  .main-title {
    font-size: 2rem;
    letter-spacing: 0.1em;
    margin: 0 0 0.3rem 0;
    -webkit-text-stroke: 0.6px rgba(255, 255, 255, 0.8);
  }

  .tech-decorations {
    width: 90%;
    height: 120px;
    top: -50px;
  }

  .tech-line {
    width: 120px;
  }

  .tech-line-left {
    left: -150px;
  }

  .tech-line-right {
    right: -150px;
  }

  .sub-title {
    font-size: 1rem;
    letter-spacing: 0.08em;
    -webkit-text-stroke: 0.3px rgba(255, 255, 255, 0.6);
  }

  .breathing-container {
    width: 250px;
    bottom: 6%;
  }

  .breathing-light {
    width: 250px;
  }

  .breathing-light::before {
    width: 200px;
    height: 14px;
  }

  .breathing-light::after {
    width: 120px;
  }

  .ambient-glow {
    width: 250px;
    height: 25px;
  }
}

/* 纹理版权脚注样式 */
.texture-credit {
  position: absolute;
  bottom: 1%;
  right: 2rem;
  z-index: 15;
  pointer-events: auto;
  max-width: 300px;
}

.credit-text {
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
  color: rgba(240, 217, 247, 0.7);
  text-align: right;
  line-height: 1.3;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.3);
  background: rgba(20, 20, 30, 0.6);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(168, 85, 247, 0.2);
  backdrop-filter: blur(10px);
  animation: creditBreathe 3s ease-in-out infinite;
}

.credit-link {
  color: rgba(168, 85, 247, 0.9);
  text-decoration: none;
  border-bottom: 1px dotted rgba(168, 85, 247, 0.4);
  transition: all 0.3s ease;
}

.credit-link:hover {
  color: #e9adfa;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.6);
  border-bottom-color: rgba(168, 85, 247, 0.6);
}

@keyframes creditBreathe {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
}

/* 响应式设计 - 纹理版权 */
@media (max-width: 768px) {
  .texture-credit {
    right: 1rem;
    bottom: 0.5%;
    left: 1rem;
    max-width: none;
  }

  .credit-text {
    font-size: 0.65rem;
    text-align: center;
    padding: 0.4rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .texture-credit {
    right: 0.5rem;
    left: 0.5rem;
  }

  .credit-text {
    font-size: 0.6rem;
    padding: 0.3rem 0.5rem;
  }
}
</style>
