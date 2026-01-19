<template>
  <AmuPopup
    v-model="visible"
    trigger="click"
    :placement="column.filterPlacement || 'bottom-start'"
    popper-class="amu-table-filter__popper"
    :show-arrow="false"
  >
    <template #reference>
      <span class="amu-table__column-filter-trigger" :class="{ 'is-active': hasFilter }">
        <AmuIcon class="amu-table__filter-icon">
          <IconFilter />
        </AmuIcon>
      </span>
    </template>
    <div class="amu-table-filter__content">
      <div class="amu-table-filter__list">
        <AmuCheckbox
          v-for="filter in column.filters"
          :key="filter.value"
          :model-value="isChecked(filter.value)"
          @change="handleCheck(filter.value)"
          class="amu-table-filter__item"
        >
          {{ filter.text }}
        </AmuCheckbox>
      </div>
      <div class="amu-table-filter__bottom">
        <button class="amu-table-filter__reset" @click="handleReset" :disabled="tempValues.length === 0">重置</button>
        <button class="amu-table-filter__confirm" @click="handleConfirm">确定</button>
      </div>
    </div>
  </AmuPopup>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { AmuPopup } from '../../../popup'
import { AmuIcon } from '../../../icon'
import { AmuCheckbox } from '../../../checkbox'
import { IconFilter } from '@amu-ui/icons'
import { TABLE_INJECTION_KEY } from '../store'

const props = defineProps({
  column: {
    type: Object,
    required: true
  }
})

const store = inject(TABLE_INJECTION_KEY) as any
const visible = ref(false)

// 临时选中的值（未点确定前）
const tempValues = ref<any[]>([])

const columnId = computed(() => props.column.id || props.column.prop)

const hasFilter = computed(() => {
   const values = store.filters.value[columnId.value]
   return values && values.length > 0
})

// 初始化 tempValues
const initTempValues = () => {
   const values = store.filters.value[columnId.value]
   tempValues.value = values ? [...values] : []
}

watch(visible, (val) => {
  if (val) {
    initTempValues()
  }
})

const isChecked = (val: any) => tempValues.value.includes(val)

const handleCheck = (val: any) => {
  const index = tempValues.value.indexOf(val)
  if (index > -1) {
    tempValues.value.splice(index, 1)
  } else {
    tempValues.value.push(val)
  }
}

const handleConfirm = () => {
  store.handleFilterChange(columnId.value, tempValues.value)
  visible.value = false
}

const handleReset = () => {
  tempValues.value = []
  handleConfirm()
}
</script>

<style>
.amu-table__column-filter-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: var(--amu-table-text-secondary);
  transition: color 0.2s;
}
.amu-table__column-filter-trigger.is-active,
.amu-table__column-filter-trigger:hover {
  color: var(--amu-color-primary);
}

.amu-table-filter__content {
  background: var(--amu-color-bg);
  min-width: 120px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  border-radius: 4px;
  font-size: 14px;
}
.amu-table-filter__list {
  padding: 8px 0;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.amu-table-filter__item {
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  margin-right: 0; /* Reset global checkbox margin if any */
  width: 100%;
  box-sizing: border-box;
}
.amu-table-filter__item:hover {
  background-color: var(--amu-fill-color-light);
}
.amu-table-filter__bottom {
  padding: 8px;
  border-top: 1px solid var(--amu-border-color);
  display: flex;
  justify-content: space-between;
}
.amu-table-filter__reset {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: var(--amu-color-text-description);
}
.amu-table-filter__reset:disabled {
  color: var(--amu-color-text-disabled);
  cursor: not-allowed;
}
.amu-table-filter__confirm {
  background: var(--amu-color-primary);
  border: none;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  padding: 2px 8px;
}
.amu-table-filter__popper {
    padding: 0 !important;
}
</style>
