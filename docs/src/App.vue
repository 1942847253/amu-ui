<template>
  <AmuConfigProvider :locale="locale">
    <div class="layout" :class="{ dark: isDark }">
      <header class="header">
      <div class="header-container">
        <div class="header__left">
          <RouterLink class="brand" to="/">
            <div class="logo">
              <svg
                width="28"
                height="28"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M100 20L180 180H135L120 145H80L65 180H20L100 20ZM100 65L88 115H112L100 65Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="20"
                    y1="20"
                    x2="180"
                    y2="180"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#165DFF" />
                    <stop offset="1" stop-color="#4080FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="brand__name">Amu UI</span>
          </RouterLink>
        </div>

        <div class="header__center">
          <Search />
        </div>

        <div class="header__right">
          <nav class="nav">
            <div class="nav-item">{{ t.nav.design }}</div>
            <div class="nav-item">{{ t.nav.develop }}</div>
            <div class="nav-item">{{ t.nav.ecosystem }}</div>
          </nav>

          <div class="divider"></div>

          <div class="actions">
            <button class="action-btn" @click="toggleLang" :title="lang === 'zh-CN' ? 'Switch to English' : '切换到中文'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
            </button>
            <a href="https://github.com" target="_blank" class="action-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            </a>
            <div class="theme-switch" @click="toggleTheme" role="button" tabindex="0" :title="isDark ? 'Switch to Light' : '切换到暗色模式'">
              <div class="theme-switch__track" :class="{ 'theme-switch__track--dark': isDark }">
                <div class="theme-switch__icon sun">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line></svg>
                </div>
                <div class="theme-switch__icon moon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </div>
                <div class="theme-switch__thumb" :class="{ 'theme-switch__thumb--dark': isDark }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="main-container">
      <aside class="sidebar" v-if="!isHome">
        <div class="sidebar__inner">
          <div class="sidebar__group">
            <div class="sidebar__title">{{ t.nav.guide }}</div>
            <RouterLink
              class="sidebar__link"
              active-class="active"
              to="/guide/quick-start"
              >{{ t.nav.quickStart }}</RouterLink
            >
            <RouterLink
              class="sidebar__link"
              active-class="active"
              to="/guide/i18n"
              >{{ t.nav.i18n }}</RouterLink
            >
          </div>

          <div class="sidebar__group" v-for="group in nav.groups" :key="group.title">
            <div class="sidebar__title">{{ (t.nav as Record<string, string>)[group.title] || group.title }}</div>
            <RouterLink
              v-for="c in group.items"
              :key="c.name"
              class="sidebar__link"
              active-class="active"
              :to="c.route"
            >
              {{ (t.components as Record<string, string>)[c.name] || c.title }}
            </RouterLink>
          </div>
        </div>
      </aside>

      <main class="content" :class="{ 'content--home': isHome }">
        <div class="content__inner">
          <div ref="docRoot" class="doc-root">
            <RouterView />
          </div>
        </div>
      </main>

      <aside class="toc-sidebar" v-if="!isHome">
        <Toc :root="docRoot" />
      </aside>
    </div>
  </div>
  </AmuConfigProvider>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import nav from "virtual:amu-docs-nav";
import Toc from "./components/Toc.vue";
import Search from "./components/Search.vue";
import { useLanguage } from "./composables/useLanguage";
import { messages } from "./locales";
import { en, zhCn } from "@amu-ui/locale";

const route = useRoute();
const isHome = computed(() => route.path === "/");

const { lang, setLanguage, initLanguage } = useLanguage();
const t = computed(() => messages[lang.value]);

const locale = computed(() => {
  return lang.value === "zh-CN" ? zhCn : en;
});

const toggleLang = () => {
  setLanguage(lang.value === "zh-CN" ? "en-US" : "zh-CN");
};

const isDark = ref(false);
const docRoot = ref<HTMLElement | null>(null);

const toggleTheme = (event: MouseEvent) => {
  const isAppearanceTransition =
    // @ts-expect-error: Transition API
    document.startViewTransition &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value;
    const theme = isDark.value ? "dark" : "light";
    document.documentElement.setAttribute("data-amu-theme", theme);
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return;
  }

  const x = !isDark.value ? event.clientX : 0;
  const y = !isDark.value ? event.clientY : window.innerHeight;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    isDark.value = !isDark.value;
    const theme = isDark.value ? "dark" : "light";
    document.documentElement.setAttribute("data-amu-theme", theme);
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 400,
        easing: "ease-in",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
};

onMounted(() => {
  initLanguage();
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-amu-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-amu-theme", "light");
  }
});
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--amu-nav-height);
  background-color: var(--amu-bg-nav);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--amu-border);
  z-index: 100;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
}

.header__left {
  display: flex;
  align-items: center;
  width: var(--amu-sidebar-width);
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 18px;
  color: var(--amu-text-1);
}

.logo {
  display: flex;
  align-items: center;

  margin-top: -5px;
}

.header__center {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding-left: 40px;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--amu-bg-code);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 8px 0 12px;
  width: 240px;
  height: 36px;
  color: var(--amu-text-2);
  transition: var(--amu-transition);
}

.search-box:hover {
  background: var(--amu-bg-demo-ctrl);
  border-color: var(--amu-border-hover);
}

.search-box:focus-within {
  border-color: var(--amu-brand);
  background: var(--amu-bg-body);
}

.search__input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--amu-text-1);
  margin: 0 8px;
  height: 100%;
}

.search__key {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 6px;
  font-size: 12px;
  font-family: inherit;
  color: var(--amu-text-3);
  background: var(--amu-bg-body);
  border: 1px solid var(--amu-border);
  border-radius: 4px;
  white-space: nowrap;
  user-select: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.header__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav-item {
  font-size: 14px;
  color: var(--amu-text-1);
  cursor: pointer;
  transition: color 0.2s;
}

.nav-item:hover {
  color: var(--amu-brand);
}

.divider {
  width: 1px;
  height: 16px;
  background-color: var(--amu-border);
}

.actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: var(--amu-text-2);
  background: transparent;
  border: 1px solid var(--amu-border);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  color: var(--amu-text-1);
  border-color: var(--amu-text-2);
}

/* Main Layout */
.main-container {
  display: flex;
  padding-top: var(--amu-nav-height);
  width: 100%;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: var(--amu-nav-height);
  bottom: 0;
  left: 0;
  width: var(--amu-sidebar-width);
  overflow-y: auto;
  border-right: 1px solid var(--amu-border);
  background-color: var(--amu-bg-sidebar);
  padding: 24px 0;
  z-index: 10;
}

.sidebar__inner {
  padding: 0 12px;
}

.sidebar__group {
  margin-bottom: 24px;
}

.sidebar__title {
  font-size: 12px;
  font-weight: 500;
  color: var(--amu-text-3);
  margin-bottom: 8px;
  padding-left: 12px;
}

.sidebar__link {
  display: block;
  padding: 9px 12px;
  margin: 4px 0;
  font-size: 14px;
  color: var(--amu-text-1);
  border-radius: 4px;
  transition: var(--amu-transition);
}

.sidebar__link:hover {
  background-color: var(--amu-bg-demo-ctrl);
}

.sidebar__link.active {
  color: var(--amu-brand);
  background-color: #e8f3ff; /* Light blue bg for active state */
  font-weight: 500;
}

.dark .sidebar__link.active {
  background-color: var(--amu-bg-code);
}

/* Content */
.content {
  flex: 1;
  margin-left: var(--amu-sidebar-width);
  margin-right: var(--amu-toc-width);
  min-width: 0;
  padding: 0 48px;
}

.content--home {
  margin-left: 0;
  margin-right: 0;
}

.content__inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0 64px;
}

/* TOC Sidebar */
.toc-sidebar {
  position: fixed;
  top: var(--amu-nav-height);
  bottom: 0;
  right: 0;
  width: var(--amu-toc-width);
  padding: 40px 24px;
  overflow-y: auto;
}

@media (max-width: 1200px) {
  .toc-sidebar {
    display: none;
  }
  .content {
    margin-right: 0;
  }
}

@media (max-width: 960px) {
  .sidebar {
    display: none;
  }
  .content {
    margin-left: 0;
    padding: 0 24px;
  }
  .header__left {
    width: auto;
  }
}

/* Theme Switch */
.theme-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.theme-switch__track {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 44px;
  height: 24px;
  padding: 0 4px;
  background-color: var(--amu-bg-code);
  border: 1px solid var(--amu-border);
  border-radius: 12px;
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box;
}

.theme-switch__track--dark {
  background-color: #2c2c2c;
  border-color: #3c3c3c;
}

.theme-switch__track:hover {
  border-color: var(--amu-text-2);
}

.theme-switch__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--amu-text-2);
  z-index: 2;
  transition: color 0.3s;
}

.theme-switch__icon.sun {
  color: #f59e0b;
}

.theme-switch__icon.moon {
  color: var(--amu-text-2);
}

.dark .theme-switch__icon.sun {
  color: var(--amu-text-2);
}

.dark .theme-switch__icon.moon {
  color: #fcd34d;
}

.theme-switch__thumb {
  position: absolute;
  top: 1px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: var(--amu-bg-body);
  border: 1px solid var(--amu-border);
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, background-color 0.3s, border-color 0.3s;
  z-index: 1;
}

.theme-switch__thumb--dark {
  transform: translateX(18px);
}
</style>
