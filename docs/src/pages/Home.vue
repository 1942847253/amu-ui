<template>
  <div class="home-container">
    <div class="hero">
      <div class="hero-content">
        <h1 class="title">Amu UI</h1>
        <p class="subtitle">{{ t.home.subtitle }}</p>
        <p class="desc">
          {{ t.home.desc }}
        </p>

        <div class="actions">
          <RouterLink class="btn btn-primary" to="/guide/quick-start"
            >{{ t.home.getStarted }}</RouterLink
          >
          <a class="btn btn-outline" href="https://github.com" target="_blank"
            >GitHub</a
          >
        </div>
      </div>
      <div class="hero-image">
        <div class="logo-bg">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M100 20L180 180H135L120 145H80L65 180H20L100 20ZM100 65L88 115H112L100 65Z"
              fill="url(#paint0_linear_home)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_home"
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
      </div>
    </div>

    <div class="features">
      <div class="card">
        <div class="card-icon">⚡️</div>
        <h3>{{ t.home.features.performance }}</h3>
        <p>
          {{ t.home.features.performanceDesc }}
        </p>
      </div>

      <div class="card">
        <div class="card-icon">🎨</div>
        <h3>{{ t.home.features.themeable }}</h3>
        <p>
          {{ t.home.features.themeableDesc }}
        </p>
      </div>

      <div class="card">
        <div class="card-icon">📘</div>
        <h3>{{ t.home.features.typescript }}</h3>
        <p>
          {{ t.home.features.typescriptDesc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { messages } from "../locales";

const { lang } = useLanguage();
const t = computed(() => messages[lang.value]);
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0 100px;
}

.hero-content {
  max-width: 600px;
}

.title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 24px;
  background: linear-gradient(120deg, var(--amu-brand), var(--amu-brand-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 24px;
  font-weight: 600;
  color: var(--amu-text-1);
  margin: 0 0 16px;
}

.desc {
  font-size: 18px;
  color: var(--amu-text-2);
  margin: 0 0 40px;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 32px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
}

.btn-primary {
  background: var(--amu-brand);
  color: #fff;
  border: 1px solid var(--amu-brand);
}

.btn-primary:hover {
  background: var(--amu-brand-light);
  border-color: var(--amu-brand-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--amu-text-1);
  border: 1px solid var(--amu-border);
}

.btn-outline:hover {
  border-color: var(--amu-text-1);
  background: var(--amu-bg-demo-ctrl);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-bg {
  filter: drop-shadow(0 0 40px rgba(22, 93, 255, 0.2));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  padding: 32px;
  border: 1px solid var(--amu-border);
  border-radius: 12px;
  background: var(--amu-bg-demo);
  transition: all 0.3s;
}

.card:hover {
  border-color: transparent;
  box-shadow: var(--amu-shadow-2);
  transform: translateY(-4px);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 20px;
}

.card h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--amu-text-1);
}

.card p {
  font-size: 14px;
  color: var(--amu-text-2);
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    padding: 40px 0 60px;
  }

  .hero-content {
    margin-top: 40px;
  }

  .actions {
    justify-content: center;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
</style>
