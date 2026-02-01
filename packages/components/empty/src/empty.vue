<template>
  <div class="amu-empty">
    <div class="amu-empty__image" :style="imageStyle">
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          :alt="imageAltText"
          draggable="false"
          loading="lazy"
        />
        <img-empty v-else />
      </slot>
    </div>
    <div class="amu-empty__description">
      <slot name="description">
        <p>{{ descriptionText }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" class="amu-empty__bottom">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '@amu-ui/hooks'
import ImgEmpty from './img-empty.vue'
import { emptyProps } from './props'
import './style.css'

defineOptions({
  name: 'AmuEmpty',
})

const props = defineProps(emptyProps)
const { t } = useLocale()

const descriptionText = computed(() => {
  return props.description || t('el.empty.description')
})

const imageAltText = computed(() => {
  return props.imageAlt || descriptionText.value
})

const imageStyle = computed(() => {
  const size = props.imageSize
  if (size === undefined || size === null || size === '') {
    return {}
  }
  const normalized = typeof size === 'number' ? `${size}px` : size
  return {
    width: normalized,
    height: normalized,
  }
})
</script>
