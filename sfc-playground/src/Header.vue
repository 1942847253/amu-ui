<script setup lang="ts">
import Sun from './icons/Sun.vue'
import Moon from './icons/Moon.vue'
import Share from './icons/Share.vue'
import GitHub from './icons/GitHub.vue'
import NpmVersionSwitch from './components/npm-version-switch/index.vue'
import { npmVersionSwitchList } from './components/npm-version-switch/helps'

const { store } = defineProps(['store'])

async function copyLink() {
  await navigator.clipboard.writeText(location.href)
  alert('Sharable URL has been copied to clipboard.')
}

function toggleDark() {
  const cls = document.documentElement.classList
  cls.toggle('dark')
  const theme = document.documentElement.getAttribute('class')
  const dateNow = String(Date.now)
  localStorage.setItem(
    'vue-sfc-playground-prefer-dark',
    String(cls.contains('dark'))
  )
  localStorage.setItem( dateNow, theme + '')
  localStorage.removeItem(dateNow)
}

</script>

<template>
  <nav>
    <h1>
      <img alt="logo" src="https://yjjanmusang.gitee.io/amu-ui/logo.PNG">
      <span style="margin-left: 60px;color: #3073dd;">SFC Playground</span>
    </h1>
    <div class="links">
      <NpmVersionSwitch v-for="data of npmVersionSwitchList" :key="data.npm" :store="store" :npm="data.npm"
        :fetch-versions="data.fetchVersions" :current-commit="data.currentCommit"
        :history-deployments="data.historyDeployments" />
      <button title="Toggle dark mode" class="toggle-dark" @click="toggleDark">
        <Sun class="light" />
        <Moon class="dark" />
      </button>
      <button title="Copy sharable URL" class="share" @click="copyLink">
        <Share />
      </button>
      <button title="View on GitHub" class="github">
        <a href="https://github.com/1942847253/amu-ui" target="_blank">
          <GitHub />
        </a>
      </button>
    </div>
  </nav>
</template>

<style>
nav {
  --bg: var(--a-bg-color);
  --bg-light: #fff;
  --border: #ddd;
  user-select: none;
  color: var(--base);
  height: var(--nav-height);
  box-sizing: border-box;
  padding: 0 1em;
  background-color: var(--a-bg-color);
  border-bottom: 1px solid var(--a-border-weak-color);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}

h1 {
  margin: 0;
  line-height: var(--nav-height);
  font-weight: 500;
  display: inline-block;
  vertical-align: middle;
}

h1 img {
  user-select: none;
  height: 24px;
  vertical-align: middle;
  margin-right: 10px;
  position: relative;
  top: -2px;
  left: 30px;
  transform: scale(4.5);
  pointer-events: none;
}

@media (max-width: 560px) {
  h1 span {
    font-size: 0.9em;
  }
}

@media (max-width: 520px) {
  h1 span {
    display: none;
  }
}

.links {
  display: flex;
}

.version {
  display: inline-block;
  margin-right: 12px;
  position: relative;
}

.active-version {
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  line-height: var(--nav-height);
  padding-right: 15px;
  color: var(--a-text-color);
}

.active-version:after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #aaa;
  position: absolute;
  right: 0;
  top: 22px;
}

.toggle-dark svg {
  width: 18px;
  height: 18px;
  fill: #666;
}

.toggle-dark .dark,
.dark .toggle-dark .light {
  display: none;
}

.dark .toggle-dark .dark {
  display: inline-block;
}

.version:hover .active-version:after {
  border-top-color: var(--base);
}

.dark .version:hover .active-version:after {
  border-top-color: #fff;
}

.versions {
  display: none;
  position: absolute;
  left: -50%;
  top: 40px;
  background-color: var(--a-bg-color);
  border: 1px solid var(--a-border-color);
  border-radius: 4px;
  list-style-type: none;
  padding: 8px;
  margin: 0;
  width: 200px;
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.versions a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
  cursor: pointer;
  color: var(--a-text-color);
}

.versions a:hover {
  color: var(--a-primary-color);
}

.versions.expanded {
  display: block;
}

.share,
.download,
.github {
  margin: 0 2px;
}
</style>
