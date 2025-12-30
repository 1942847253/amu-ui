<template>
  <amu-popup
    ref="popupRef"
    :model-value="visible"
    :trigger="trigger"
    :placement="placement"
    :offset="offset"
    :disabled="disabled"
    :close-on-click-outside="closeOnClickOutside"
    :close-on-esc="closeOnEsc"
    :teleport-to="teleportTo"
    :z-index="zIndex"
    :show-arrow="true"
    v-bind="popupProps"
    class="amu-popconfirm-popup"
    @update:model-value="handleUpdateModelValue"
    @show="handleShow"
    @hide="handleHide"
  >
    <template #default>
      <div class="amu-popconfirm" :class="{ 'amu-popconfirm--has-icon': icon || $slots.icon }">
        <div class="amu-popconfirm__content">
          <div class="amu-popconfirm__header">
            <div v-if="icon || $slots.icon" class="amu-popconfirm__icon">
              <slot name="icon">
                <amu-icon v-if="icon" :color="iconColor" size="20">
                  <component :is="iconComponent" />
                </amu-icon>
              </slot>
            </div>
            <div class="amu-popconfirm__title">
              <slot>{{ title }}</slot>
            </div>
          </div>
          <div v-if="description" class="amu-popconfirm__description">
            {{ description }}
          </div>
          <div class="amu-popconfirm__footer">
            <slot name="cancelBtn">
              <amu-button
                v-bind="cancelBtnProps"
                size="mini"
                @click="handleCancel"
              >
                {{ cancelBtnText }}
              </amu-button>
            </slot>
            <slot name="confirmBtn">
              <amu-button
                type="primary"
                v-bind="confirmBtnProps"
                size="mini"
                @click="handleConfirm"
              >
                {{ confirmBtnText }}
              </amu-button>
            </slot>
          </div>
        </div>
      </div>
    </template>
    <template #reference>
      <slot name="reference" />
    </template>
  </amu-popup>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { AmuPopup } from '../../popup'
import { AmuButton } from '../../button'
import { AmuIcon } from '../../icon'
import { IconInfo } from '@amu-ui/icons'
import { useLocale } from '@amu-ui/hooks'
import { popconfirmProps, popconfirmEmits } from './props'
import type { ButtonProps } from '../../button/src/props'

defineOptions({
  name: 'AmuPopconfirm'
})

const props = defineProps(popconfirmProps)
const emit = defineEmits(popconfirmEmits)

const { t } = useLocale()

const visible = ref(props.modelValue ?? false)
const popupRef = ref()
const confirmLoading = ref(false)

watch(() => props.modelValue, (val) => {
  if (val !== undefined) {
    visible.value = val
  }
})

const handleUpdateModelValue = (val: boolean) => {
  visible.value = val
  emit('update:modelValue', val)
}

const handleShow = () => {
  emit('show')
}

const handleHide = () => {
  emit('hide')
}

const handleCancel = () => {
  emit('cancel')
  handleUpdateModelValue(false)
}

const handleConfirm = async () => {
  if (props.onBeforeConfirm) {
    confirmLoading.value = true
    try {
      const result = await props.onBeforeConfirm()
      if (result !== false) {
        emit('confirm')
        handleUpdateModelValue(false)
      }
    } catch (e) {
      // prevent close
    } finally {
      confirmLoading.value = false
    }
  } else {
    emit('confirm')
    handleUpdateModelValue(false)
  }
}

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'info':
    case 'warning':
    case 'error':
      return IconInfo
    default: return null
  }
})

const iconColor = computed(() => {
  if (props.iconColor) return props.iconColor
  switch (props.icon) {
    case 'info': return 'var(--amu-color-primary)'
    case 'warning': return 'var(--amu-color-status-warning)'
    case 'error': return 'var(--amu-color-status-danger)'
    default: return undefined
  }
})

const cancelBtnProps = computed(() => {
  if (typeof props.cancelBtn === 'string') {
    return {}
  }
  return props.cancelBtn as Partial<ButtonProps>
})

const confirmBtnProps = computed(() => {
  const btnProps = typeof props.confirmBtn === 'string' ? {} : (props.confirmBtn || {})
  return {
    ...btnProps,
    loading: confirmLoading.value || btnProps.loading
  }
})

const cancelBtnText = computed(() => {
  if (typeof props.cancelBtn === 'string') {
    return props.cancelBtn
  }
  return t('amu.popconfirm.cancel')
})

const confirmBtnText = computed(() => {
  if (typeof props.confirmBtn === 'string') {
    return props.confirmBtn
  }
  return t('amu.popconfirm.confirm')
})

</script>

<style scoped>
@import './style.css';
</style>
