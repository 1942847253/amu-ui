<template>
  <button
    class="amu-button"
    :class="[
      `amu-button--${type}`,
      `amu-button--size-${buttonSize}`,
      `amu-button--${shape}`,
      status ? `amu-button--status-${status}` : '',
      {
        'amu-wave': isWave,
        'amu-button--loading': loading,
        'amu-button--fill': fill,
      },
    ]"
    :disabled="buttonDisabled || loading"
    :aria-busy="loading ? 'true' : undefined"
    :type="htmlType"
    @click="handleClick"
    @animationend="handleAnimationEnd"
  >
    <span class="amu-button__loading-icon amu-button__spinner">
      <slot name="loading-icon">
        <AmuSpinner />
      </slot>
    </span>

    <span class="amu-button__icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>

    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, nextTick, inject, computed } from "vue";
import { buttonProps } from "./props";
import { AmuSpinner } from "../../spinner";
import { formContextKey } from "../../form/src/constants";

defineOptions({
  name: "AmuButton",
});

const props = defineProps(buttonProps);
const formContext = inject(formContextKey, undefined);

const buttonSize = computed(() => props.size || formContext?.props.size || 'medium');
const buttonDisabled = computed(() => props.disabled || formContext?.props.disabled || false);

const isWave = ref(false);

const handleClick = () => {
  if (buttonDisabled.value || props.loading || props.type === "text") return;

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
