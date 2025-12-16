<template>
  <button
    class="amu-button"
    :class="[
      `amu-button--${type}`,
      `amu-button--size-${size}`,
      `amu-button--${shape}`,
      status ? `amu-button--status-${status}` : '',
      {
        'amu-wave': isWave,
        'amu-button--loading': loading,
        'amu-button--fill': fill,
      },
    ]"
    :disabled="disabled || loading"
    :aria-busy="loading ? 'true' : undefined"
    :type="htmlType"
    @click="handleClick"
    @animationend="handleAnimationEnd"
  >
    <template v-if="loading">
      <slot name="loading-icon">
        <span class="amu-button__spinner" aria-hidden="true"></span>
      </slot>
    </template>
    <template v-else-if="$slots.icon">
      <span class="amu-button__icon">
        <slot name="icon" />
      </span>
    </template>

    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { buttonProps } from "./props";

defineOptions({
  name: "AmuButton",
});

const props = defineProps(buttonProps);

const isWave = ref(false);

const handleClick = () => {
  if (props.disabled || props.loading || props.type === "text") return;

  if (isWave.value) {
    isWave.value = false;
  }

  nextTick(() => {
    // 使用 requestAnimationFrame 确保浏览器有时间重绘
    requestAnimationFrame(() => {
      isWave.value = true;
    });
  });
};

const handleAnimationEnd = () => {
  isWave.value = false;
};
</script>
