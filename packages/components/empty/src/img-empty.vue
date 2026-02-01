<template>
  <svg
    viewBox="0 0 160 120"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g fill="none" fill-rule="evenodd">
      <rect x="30" y="36" width="72" height="52" rx="6" fill="var(--amu-color-bg-fill)" />
      <rect x="30" y="36" width="72" height="52" rx="6" stroke="var(--amu-color-border)" stroke-width="1.5" />

      <rect x="42" y="52" width="34" height="4" rx="2" fill="var(--amu-color-text-disabled)" />
      <rect x="42" y="62" width="22" height="4" rx="2" fill="var(--amu-color-text-disabled)" />

      <circle cx="110" cy="66" r="14" fill="var(--amu-color-bg-fill)" stroke="var(--amu-color-border)" stroke-width="1.5" />
      <circle cx="110" cy="66" r="7" stroke="var(--amu-color-text-disabled)" stroke-width="1.5" />
      <path d="M121 77 L132 88" stroke="var(--amu-color-text-disabled)" stroke-width="3" stroke-linecap="round" />

      <circle cx="48" cy="32" r="2" fill="var(--amu-color-border)" />
      <circle cx="58" cy="28" r="1.5" fill="var(--amu-color-border)" />
    </g>
  </svg>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'ImgEmpty',
})
</script>
