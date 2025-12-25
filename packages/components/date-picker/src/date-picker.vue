<template>
  <div
    :class="[
      'amu-date-picker',
      `amu-date-picker--${size}`,
      {
        'amu-date-picker--disabled': disabled,
        'amu-date-picker--open': open,
        'amu-date-picker--focused': inputFocused,
        'amu-date-picker--range': isRange,
        [`amu-date-picker--status-${status}`]: status !== 'normal',
      },
    ]"
    ref="rootRef"
  >
    <div class="amu-date-picker__trigger" @mousedown="onTriggerMouseDown" @keydown.capture="onInputKeydown">
      <div v-if="isRange" class="amu-date-picker__range-trigger" :data-disabled="disabled ? 'true' : 'false'">
        <AmuInput
          class="amu-date-picker__range-input"
          :model-value="rangeStartText"
          :placeholder="rangeStartPlaceholder"
          :size="size"
          :status="status"
          :disabled="disabled"
          :readonly="readonly"
          :borderless="true"
          @focus="onRangeStartFocus"
          @blur="onBlur"
          @input="onRangeStartInput"
          @enter="onEnter"
          @update:modelValue="onRangeStartUpdate"
        />

        <span class="amu-date-picker__range-sep">-</span>

        <AmuInput
          class="amu-date-picker__range-input"
          :model-value="rangeEndText"
          :placeholder="rangeEndPlaceholder"
          :size="size"
          :status="status"
          :disabled="disabled"
          :readonly="readonly"
          :borderless="true"
          @focus="onRangeEndFocus"
          @blur="onBlur"
          @input="onRangeEndInput"
          @enter="onEnter"
          @update:modelValue="onRangeEndUpdate"
        />

        <span class="amu-date-picker__range-suffix">
          <AmuButton
            v-if="showClear"
            class="amu-date-picker__suffix-btn"
            type="text"
            size="mini"
            shape="circle"
            :disabled="disabled"
            @mousedown.prevent
            @click="onClear"
          >
            <template #icon>
              <AmuIcon>
                <IconX />
              </AmuIcon>
            </template>
          </AmuButton>

          <AmuButton
            v-else
            class="amu-date-picker__suffix-btn"
            type="text"
            size="mini"
            shape="circle"
            :disabled="disabled"
            @mousedown.prevent
            @click="toggleOpen"
          >
            <template #icon>
              <AmuIcon>
                <IconCalendar />
              </AmuIcon>
            </template>
          </AmuButton>
        </span>
      </div>

      <AmuInput
        v-else
        :model-value="inputText"
        :placeholder="placeholderComputed"
        :size="size"
        :status="status"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable && !!model"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @enter="onEnter"
        @clear="onClear"
        @update:modelValue="onUpdateInput"
      >
        <template #suffix>
          <AmuButton
            class="amu-date-picker__suffix-btn"
            type="text"
            size="mini"
            shape="circle"
            :disabled="disabled"
            @mousedown.prevent
            @click="toggleOpen"
          >
            <template #icon>
              <AmuIcon>
                <IconCalendar />
              </AmuIcon>
            </template>
          </AmuButton>
        </template>
      </AmuInput>
    </div>

    <Teleport to="body">
      <transition name="amu-zoom-in-top">
        <div
          v-if="open"
          class="amu-date-picker__panel"
          :style="panelStyle"
          ref="panelRef"
          role="dialog"
          aria-modal="false"
          @mousedown.stop
        >
          <div :class="['amu-date-picker__panel-inner', { 'amu-date-picker__panel-inner--with-time': showTimeComputed }]">
          <div v-if="shortcutsComputed.length" class="amu-date-picker__shortcuts">
            <AmuButton
              v-for="s in shortcutsComputed"
              :key="s.label"
              class="amu-date-picker__shortcut"
              type="text"
              size="mini"
              :disabled="disabled"
              @click="onShortcut(s)"
            >
              {{ s.label }}
            </AmuButton>
          </div>

          <div class="amu-date-picker__body">
            <div v-if="isRange" class="amu-date-picker__calendars">
              <div class="amu-date-picker__calendar">
                <div class="amu-date-picker__header">
                  <div class="amu-date-picker__nav">
                    <AmuButton
                      class="amu-date-picker__nav-btn"
                      type="text"
                      size="mini"
                      shape="circle"
                      @click="goPrevYear"
                      :disabled="disabled"
                      :aria-label="t('el.datepicker.prevYear')"
                    >
                      <template #icon>
                        <AmuIcon>
                          <IconChevronsLeft />
                        </AmuIcon>
                      </template>
                    </AmuButton>
                    <AmuButton
                      class="amu-date-picker__nav-btn"
                      type="text"
                      size="mini"
                      shape="circle"
                      @click="goPrevMonth"
                      :disabled="disabled"
                      :aria-label="t('el.datepicker.prevMonth')"
                    >
                      <template #icon>
                        <AmuIcon>
                          <IconChevronLeft />
                        </AmuIcon>
                      </template>
                    </AmuButton>
                  </div>

                  <div class="amu-date-picker__title">
                    <div class="amu-date-picker__header-controls">
                      <AmuSelect
                        class="amu-date-picker__header-select amu-date-picker__header-select--month"
                        :disabled="disabled"
                        :size="headerSelectSize"
                        :options="monthOptions"
                        :model-value="leftMonthValue"
                        placeholder=""
                        @update:modelValue="onLeftMonthChange"
                      />
                      <AmuSelect
                        class="amu-date-picker__header-select amu-date-picker__header-select--year"
                        :disabled="disabled"
                        :size="headerSelectSize"
                        :options="leftYearOptions"
                        :model-value="leftYearValue"
                        placeholder=""
                        @update:modelValue="onLeftYearChange"
                      />
                    </div>
                  </div>

                  <div class="amu-date-picker__nav" />
                </div>

                <div class="amu-date-picker__week" role="row">
                  <div v-for="w in weekLabels" :key="w" class="amu-date-picker__week-item">{{ w }}</div>
                </div>

                <div class="amu-date-picker__grid" role="grid" aria-label="calendar" @mouseleave="onHoverLeave">
                  <div
                    v-for="cell in leftCells"
                    :key="cell.key"
                    @mouseover="onHoverCell(cell.date, cell.outside, cell.disabled)"
                    :class="[
                      'amu-date-picker__cell',
                      {
                        'amu-date-picker__cell--outside': cell.outside,
                        'amu-date-picker__cell--disabled': cell.disabled,
                        'amu-date-picker__cell--today': cell.today,
                        'amu-date-picker__cell--selected': cell.selected,
                        'amu-date-picker__cell--in-range': cell.inRange,
                        'amu-date-picker__cell--range-start': cell.rangeStart,
                        'amu-date-picker__cell--range-end': cell.rangeEnd,
                      },
                    ]"
                    role="gridcell"
                    :aria-selected="cell.selected ? 'true' : 'false'"
                  >
                    <AmuButton
                      class="amu-date-picker__cell-btn"
                      type="text"
                      size="mini"
                      :disabled="cell.disabled"
                      @click="onSelectCell(cell.date, 'left')"
                      :data-date="cell.key"
                    >
                      {{ cell.text }}
                    </AmuButton>
                  </div>
                </div>
              </div>

              <div class="amu-date-picker__calendar">
                <div class="amu-date-picker__header">
                  <div class="amu-date-picker__nav" />

                  <div class="amu-date-picker__title">
                    <div class="amu-date-picker__header-controls">
                      <AmuSelect
                        class="amu-date-picker__header-select amu-date-picker__header-select--month"
                        :disabled="disabled"
                        :size="headerSelectSize"
                        :options="monthOptions"
                        :model-value="rightMonthValue"
                        placeholder=""
                        @update:modelValue="onRightMonthChange"
                      />
                      <AmuSelect
                        class="amu-date-picker__header-select amu-date-picker__header-select--year"
                        :disabled="disabled"
                        :size="headerSelectSize"
                        :options="rightYearOptions"
                        :model-value="rightYearValue"
                        placeholder=""
                        @update:modelValue="onRightYearChange"
                      />
                    </div>
                  </div>

                  <div class="amu-date-picker__nav">
                    <AmuButton
                      class="amu-date-picker__nav-btn"
                      type="text"
                      size="mini"
                      shape="circle"
                      @click="goNextMonth"
                      :disabled="disabled"
                      :aria-label="t('el.datepicker.nextMonth')"
                    >
                      <template #icon>
                        <AmuIcon>
                          <IconChevronRight />
                        </AmuIcon>
                      </template>
                    </AmuButton>
                    <AmuButton
                      class="amu-date-picker__nav-btn"
                      type="text"
                      size="mini"
                      shape="circle"
                      @click="goNextYear"
                      :disabled="disabled"
                      :aria-label="t('el.datepicker.nextYear')"
                    >
                      <template #icon>
                        <AmuIcon>
                          <IconChevronsRight />
                        </AmuIcon>
                      </template>
                    </AmuButton>
                  </div>
                </div>

                <div class="amu-date-picker__week" role="row">
                  <div v-for="w in weekLabels" :key="w" class="amu-date-picker__week-item">{{ w }}</div>
                </div>

                <div class="amu-date-picker__grid" role="grid" aria-label="calendar" @mouseleave="onHoverLeave">
                  <div
                    v-for="cell in rightCells"
                    :key="cell.key"
                    @mouseover="onHoverCell(cell.date, cell.outside, cell.disabled)"
                    :class="[
                      'amu-date-picker__cell',
                      {
                        'amu-date-picker__cell--outside': cell.outside,
                        'amu-date-picker__cell--disabled': cell.disabled,
                        'amu-date-picker__cell--today': cell.today,
                        'amu-date-picker__cell--selected': cell.selected,
                        'amu-date-picker__cell--in-range': cell.inRange,
                        'amu-date-picker__cell--range-start': cell.rangeStart,
                        'amu-date-picker__cell--range-end': cell.rangeEnd,
                      },
                    ]"
                    role="gridcell"
                    :aria-selected="cell.selected ? 'true' : 'false'"
                  >
                    <AmuButton
                      class="amu-date-picker__cell-btn"
                      type="text"
                      size="mini"
                      :disabled="cell.disabled"
                      @click="onSelectCell(cell.date, 'right')"
                      :data-date="cell.key"
                    >
                      {{ cell.text }}
                    </AmuButton>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="amu-date-picker__calendar">
              <div class="amu-date-picker__header">
                <div class="amu-date-picker__nav">
                  <AmuButton
                    class="amu-date-picker__nav-btn"
                    type="text"
                    size="mini"
                    shape="circle"
                    @click="goPrevMonth"
                    :disabled="disabled"
                    :aria-label="t('el.datepicker.prevMonth')"
                  >
                    <template #icon>
                      <AmuIcon>
                        <IconChevronLeft />
                      </AmuIcon>
                    </template>
                  </AmuButton>
                  <AmuButton
                    class="amu-date-picker__nav-btn"
                    type="text"
                    size="mini"
                    shape="circle"
                    @click="goNextMonth"
                    :disabled="disabled"
                    :aria-label="t('el.datepicker.nextMonth')"
                  >
                    <template #icon>
                      <AmuIcon>
                        <IconChevronRight />
                      </AmuIcon>
                    </template>
                  </AmuButton>
                </div>

                <div class="amu-date-picker__title">
                  <div class="amu-date-picker__header-controls">
                    <AmuSelect
                      class="amu-date-picker__header-select amu-date-picker__header-select--month"
                      :disabled="disabled"
                      :size="headerSelectSize"
                      :options="monthOptions"
                      :model-value="headerMonthValue"
                      placeholder=""
                      @update:modelValue="onHeaderMonthChange"
                    />
                    <AmuSelect
                      class="amu-date-picker__header-select amu-date-picker__header-select--year"
                      :disabled="disabled"
                      :size="headerSelectSize"
                      :options="yearOptions"
                      :model-value="headerYearValue"
                      placeholder=""
                      @update:modelValue="onHeaderYearChange"
                    />
                  </div>
                </div>

                <div class="amu-date-picker__nav">
                  <AmuButton
                    class="amu-date-picker__nav-btn"
                    type="text"
                    size="mini"
                    shape="circle"
                    @click="goPrevYear"
                    :disabled="disabled"
                    :aria-label="t('el.datepicker.prevYear')"
                  >
                    <template #icon>
                      <AmuIcon>
                        <IconChevronsLeft />
                      </AmuIcon>
                    </template>
                  </AmuButton>
                  <AmuButton
                    class="amu-date-picker__nav-btn"
                    type="text"
                    size="mini"
                    shape="circle"
                    @click="goNextYear"
                    :disabled="disabled"
                    :aria-label="t('el.datepicker.nextYear')"
                  >
                    <template #icon>
                      <AmuIcon>
                        <IconChevronsRight />
                      </AmuIcon>
                    </template>
                  </AmuButton>
                </div>
              </div>

              <div class="amu-date-picker__week" role="row">
                <div v-for="w in weekLabels" :key="w" class="amu-date-picker__week-item">{{ w }}</div>
              </div>

              <div class="amu-date-picker__grid" role="grid" aria-label="calendar" @mouseleave="onHoverLeave">
                <div
                  v-for="cell in cells"
                  :key="cell.key"
                  @mouseover="onHoverCell(cell.date, cell.outside, cell.disabled)"
                  :class="[
                    'amu-date-picker__cell',
                    {
                      'amu-date-picker__cell--outside': cell.outside,
                      'amu-date-picker__cell--disabled': cell.disabled,
                      'amu-date-picker__cell--today': cell.today,
                      'amu-date-picker__cell--selected': cell.selected,
                      'amu-date-picker__cell--in-range': cell.inRange,
                      'amu-date-picker__cell--range-start': cell.rangeStart,
                      'amu-date-picker__cell--range-end': cell.rangeEnd,
                    },
                  ]"
                  role="gridcell"
                  :aria-selected="cell.selected ? 'true' : 'false'"
                >
                  <AmuButton
                    class="amu-date-picker__cell-btn"
                    type="text"
                    size="mini"
                    :disabled="cell.disabled"
                    @click="onSelectCell(cell.date)"
                    :data-date="cell.key"
                  >
                    {{ cell.text }}
                  </AmuButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="amu-date-picker__time-bar" v-if="showTimeComputed">
          <div class="amu-date-picker__time-left">
            <AmuButton size="mini" class="amu-date-picker__btn" @click="onToday" :disabled="disabled">
              {{ t('el.datepicker.today') }}
            </AmuButton>
          </div>

          <div class="amu-date-picker__time-main">
            <template v-if="isRange">
              <div class="amu-date-picker__time-row">
                <span class="amu-date-picker__time-label">{{ t('el.datepicker.startTime') }}</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftStart.h" :options="hourSelectOptions" />
                <span class="amu-date-picker__time-sep">:</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftStart.m" :options="minuteSelectOptions" />
                <span class="amu-date-picker__time-sep">:</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftStart.s" :options="secondSelectOptions" />
              </div>

              <div class="amu-date-picker__time-row">
                <span class="amu-date-picker__time-label">{{ t('el.datepicker.endTime') }}</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftEnd.h" :options="hourSelectOptions" />
                <span class="amu-date-picker__time-sep">:</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftEnd.m" :options="minuteSelectOptions" />
                <span class="amu-date-picker__time-sep">:</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftEnd.s" :options="secondSelectOptions" />
              </div>
            </template>

            <template v-else>
              <div class="amu-date-picker__time-row">
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftStart.h" :options="hourSelectOptions" />
                <span class="amu-date-picker__time-sep">:</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftStart.m" :options="minuteSelectOptions" />
                <span class="amu-date-picker__time-sep">:</span>
                <AmuSelect class="amu-date-picker__time-select" v-model="timeDraftStart.s" :options="secondSelectOptions" />
              </div>
            </template>
          </div>

          <div class="amu-date-picker__time-right">
            <AmuButton
              v-if="needsConfirm"
              class="amu-date-picker__btn"
              type="primary"
              size="mini"
              @click="onConfirm"
              :disabled="disabled || !canConfirm"
            >
              {{ t('el.datepicker.confirm') }}
            </AmuButton>
          </div>
        </div>

        <div class="amu-date-picker__footer" v-if="showFooter">
          <div class="amu-date-picker__footer-left">
            <AmuButton
              v-if="!showTimeComputed"
              size="mini"
              class="amu-date-picker__btn"
              @click="onToday"
              :disabled="disabled"
            >
              {{ t('el.datepicker.today') }}
            </AmuButton>
            <AmuButton v-if="clearable" size="mini" class="amu-date-picker__btn" @click="onClear" :disabled="disabled">
              {{ t('el.datepicker.clear') }}
            </AmuButton>
          </div>

          <div>
            <slot name="footer" />
          </div>
        </div>

        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs, useSlots, watch } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { datePickerEmits, datePickerProps, type DatePickerModelValue, type DatePickerShortcut } from './props'
import { useHover, useLocale, useTriggerPopup } from '@amu-ui/hooks'
import { AmuButton } from '../../button'
import { AmuIcon } from '../../icon'
import { AmuInput } from '../../input'
import { AmuSelect } from '../../select'
import { IconCalendar, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconX } from '@amu-ui/icons'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

defineOptions({
  name: 'AmuDatePicker',
})

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const { clearable, disabled, readonly, size, status } = toRefs(props)

const { t } = useLocale()
const slots = useSlots()

const rootRef = ref<HTMLElement>()
function focusTriggerInput() {
  nextTick(() => {
    const el = rootRef.value?.querySelector('input') as HTMLInputElement | null
    el?.focus()
  })
}
const panelRef = ref<HTMLElement>()

const open = ref(false)
const inputFocused = ref(false)
const { hovered } = useHover(rootRef)

const panelStyle = ref<Record<string, string | number>>({ left: '0px', top: '0px' })

const isRange = computed(() => props.type === 'daterange' || props.type === 'datetimerange')
const hasTimeByType = computed(() => props.type === 'datetime' || props.type === 'datetimerange')
const showTimeComputed = computed(() => props.showTime || hasTimeByType.value)

const needsConfirm = computed(() => showTimeComputed.value)

const showFooter = computed(() => {
  // 默认只展示日历网格；当有清空按钮或自定义 footer 时再展示底部
  if (showTimeComputed.value) return !!clearable.value || !!slots.footer
  return !!slots.footer
})

function getDefaultFormat() {
  if (showTimeComputed.value) return 'YYYY-MM-DD HH:mm:ss'
  return 'YYYY-MM-DD'
}

const placeholderComputed = computed(() => {
  if (props.placeholder) return props.placeholder
  if (isRange.value) return `${t('el.datepicker.startDate')} - ${t('el.datepicker.endDate')}`
  return t('el.datepicker.selectDate')
})

function toDayjs(d: Date): Dayjs {
  if (props.timezone === 'utc') return dayjs.utc(d)
  if (props.timezone && props.timezone !== 'local') return dayjs(d).tz(props.timezone)
  return dayjs(d)
}

function dayjsFromParts(base: Dayjs, h: number, m: number, s: number) {
  return base.hour(h).minute(m).second(s).millisecond(0)
}

function clampByMinMax(d: Dayjs) {
  if (props.minDate) {
    const min = toDayjs(props.minDate)
    if (d.isBefore(min)) return min
  }
  if (props.maxDate) {
    const max = toDayjs(props.maxDate)
    if (d.isAfter(max)) return max
  }
  return d
}

function isDisabledDate(d: Dayjs) {
  if (props.disabled) return true
  const dateObj = d.toDate()
  if (props.minDate && d.isBefore(toDayjs(props.minDate), 'day')) return true
  if (props.maxDate && d.isAfter(toDayjs(props.maxDate), 'day')) return true
  if (props.disabledDate && props.disabledDate(dateObj)) return true
  return false
}

function normalizeModelValue(val: DatePickerModelValue) {
  if (!val) return null
  if (Array.isArray(val)) {
    const [a, b] = val
    if (!(a instanceof Date) || !(b instanceof Date)) return null
    return [a, b] as [Date, Date]
  }
  if (!(val instanceof Date)) return null
  return val
}

const model = computed(() => normalizeModelValue(props.modelValue))

const viewMonth = ref<Dayjs>(dayjs().startOf('month'))

// daterange 始终显示相邻两个月（左 + 右=左+1），与主流组件库保持一致
const rangeLeftMonth = ref<Dayjs>(dayjs().startOf('month'))

const rangeDraft = reactive<{ start: Dayjs | null; end: Dayjs | null }>({ start: null, end: null })
const hoverDate = ref<Dayjs | null>(null)
const rangeActivePart = ref<'start' | 'end'>('end')

function syncRangeViewMonthForActivePart() {
  if (!isRange.value) return

  const mv = model.value
  const committedStart = Array.isArray(mv) ? toDayjs(mv[0]).startOf('day') : null
  const committedEnd = Array.isArray(mv) ? toDayjs(mv[1]).startOf('day') : null

  const start = (rangeDraft.start?.startOf('day') || committedStart) ?? null
  const end = (rangeDraft.end?.startOf('day') || committedEnd) ?? null
  if (!start) return

  const startMonth = start.startOf('month')
  const endMonth = (end || start).startOf('month')

  if (rangeActivePart.value === 'start') {
    rangeLeftMonth.value = startMonth
    return
  }

  // 默认编辑 end：对齐到结束月份，展示 endMonth-1 / endMonth
  rangeLeftMonth.value = endMonth.subtract(1, 'month').startOf('month')
}

const timeDraftStart = reactive({ h: 0, m: 0, s: 0 })
const timeDraftEnd = reactive({ h: 0, m: 0, s: 0 })

function syncDraftFromModel() {
  const val = model.value

  if (!val) {
    rangeDraft.start = null
    rangeDraft.end = null
    hoverDate.value = null

    const now = dayjs()
    timeDraftStart.h = now.hour()
    timeDraftStart.m = now.minute()
    timeDraftStart.s = now.second()
    timeDraftEnd.h = now.hour()
    timeDraftEnd.m = now.minute()
    timeDraftEnd.s = now.second()
    return
  }

  if (Array.isArray(val)) {
    const a = toDayjs(val[0])
    const b = toDayjs(val[1])
    rangeDraft.start = a
    rangeDraft.end = b
    rangeLeftMonth.value = a.startOf('month')

    timeDraftStart.h = a.hour()
    timeDraftStart.m = a.minute()
    timeDraftStart.s = a.second()
    timeDraftEnd.h = b.hour()
    timeDraftEnd.m = b.minute()
    timeDraftEnd.s = b.second()
    return
  }

  const d = toDayjs(val)
  viewMonth.value = d.startOf('month')
  timeDraftStart.h = d.hour()
  timeDraftStart.m = d.minute()
  timeDraftStart.s = d.second()
}

const inputText = ref('')

const rangeStartText = ref('')
const rangeEndText = ref('')

const rangeStartPlaceholder = computed(() => {
  if (!isRange.value) return ''
  if (props.placeholder) {
    const parts = props.placeholder.split(/\s+-\s+/).map((s) => s.trim())
    if (parts.length === 2) return parts[0]
  }
  return t('el.datepicker.startDate')
})

const rangeEndPlaceholder = computed(() => {
  if (!isRange.value) return ''
  if (props.placeholder) {
    const parts = props.placeholder.split(/\s+-\s+/).map((s) => s.trim())
    if (parts.length === 2) return parts[1]
  }
  return t('el.datepicker.endDate')
})

function syncInputTextFromModel() {
  inputText.value = formatValue(model.value)
}

function syncRangeTextFromModel() {
  if (!isRange.value) return

  const mv = model.value
  if (Array.isArray(mv)) {
    rangeStartText.value = formatDate(toDayjs(mv[0]))
    rangeEndText.value = formatDate(toDayjs(mv[1]))
    return
  }

  // 没有已提交值时，交互中展示 draft，收起后展示空
  if (open.value || inputFocused.value) {
    rangeStartText.value = rangeDraft.start ? formatDate(rangeDraft.start) : ''
    rangeEndText.value = rangeDraft.end ? formatDate(rangeDraft.end) : ''
    return
  }

  rangeStartText.value = ''
  rangeEndText.value = ''
}

watch(
  () => props.modelValue,
  () => {
    syncDraftFromModel()
    syncInputTextFromModel()
    syncRangeTextFromModel()
  },
  { immediate: true },
)

function formatDate(d: Dayjs) {
  const raw = d.toDate()
  if (typeof props.format === 'function') return props.format(raw)
  const fmt = typeof props.format === 'string' && props.format ? props.format : getDefaultFormat()
  return d.format(fmt)
}

function formatValue(val: DatePickerModelValue) {
  if (!val) return ''
  if (Array.isArray(val)) {
    const a = toDayjs(val[0])
    const b = toDayjs(val[1])
    return `${formatDate(a)} - ${formatDate(b)}`
  }
  return formatDate(toDayjs(val))
}

const showClear = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    !!model.value &&
    (inputFocused.value || open.value || hovered.value)
  )
})

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function getWeekLabels() {
  const labels = [
    t('el.datepicker.weeks.sun'),
    t('el.datepicker.weeks.mon'),
    t('el.datepicker.weeks.tue'),
    t('el.datepicker.weeks.wed'),
    t('el.datepicker.weeks.thu'),
    t('el.datepicker.weeks.fri'),
    t('el.datepicker.weeks.sat'),
  ]
  if (props.weekStart === 1) {
    return [...labels.slice(1), labels[0]]
  }
  return labels
}

const weekLabels = computed(() => getWeekLabels())

const leftMonth = computed(() => (isRange.value ? rangeLeftMonth.value : viewMonth.value).startOf('month'))
const rightMonth = computed(() => leftMonth.value.add(1, 'month'))

const headerSelectSize = computed(() => {
  if (size.value === 'small') return 'small'
  if (size.value === 'large') return 'large'
  return 'default'
})

const monthOptions = computed(() => {
  const opts: Array<{ label: string; value: number }> = []
  for (let m = 1; m <= 12; m++) {
    const raw = t(`el.datepicker.month${m}`) || String(m)
    const label = /^[A-Za-z]+$/.test(raw) && raw.length > 3 ? raw.slice(0, 3) : raw
    opts.push({ label, value: m })
  }
  return opts
})

const yearBounds = computed(() => {
  const minYear = props.minDate ? toDayjs(props.minDate).year() : 1900
  const maxYear = props.maxDate ? toDayjs(props.maxDate).year() : 2100
  return {
    start: Math.min(minYear, maxYear),
    end: Math.max(minYear, maxYear),
  }
})

const yearOptions = computed(() => {
  const { start, end } = yearBounds.value
  const opts: Array<{ label: string; value: number }> = []
  for (let y = start; y <= end; y++) {
    opts.push({ label: String(y), value: y })
  }
  return opts
})

const leftYearOptions = yearOptions
const rightYearOptions = yearOptions

const headerMonthValue = computed(() => leftMonth.value.month() + 1)
const headerYearValue = computed(() => leftMonth.value.year())
const leftMonthValue = computed(() => leftMonth.value.month() + 1)
const leftYearValue = computed(() => leftMonth.value.year())
const rightMonthValue = computed(() => rightMonth.value.month() + 1)
const rightYearValue = computed(() => rightMonth.value.year())

function normalizeNumber(val: unknown) {
  if (typeof val === 'number') return val
  if (typeof val === 'string' && val.trim()) return Number(val)
  return NaN
}

function setLeftViewMonth(next: Dayjs) {
  if (isRange.value) {
    rangeLeftMonth.value = next.startOf('month')
    return
  }
  viewMonth.value = next.startOf('month')
}

function setRightViewMonth(nextRight: Dayjs) {
  if (isRange.value) {
    rangeLeftMonth.value = nextRight.subtract(1, 'month').startOf('month')
    return
  }
  viewMonth.value = nextRight.subtract(1, 'month').startOf('month')
}

function onHeaderMonthChange(val: unknown) {
  const m = normalizeNumber(val)
  if (!Number.isFinite(m) || m < 1 || m > 12) return
  setLeftViewMonth(leftMonth.value.month(m - 1))
}

function onHeaderYearChange(val: unknown) {
  const y = normalizeNumber(val)
  if (!Number.isFinite(y)) return
  setLeftViewMonth(leftMonth.value.year(y))
}

function onLeftMonthChange(val: unknown) {
  const m = normalizeNumber(val)
  if (!Number.isFinite(m) || m < 1 || m > 12) return
  setLeftViewMonth(leftMonth.value.month(m - 1))
}

function onLeftYearChange(val: unknown) {
  const y = normalizeNumber(val)
  if (!Number.isFinite(y)) return
  setLeftViewMonth(leftMonth.value.year(y))
}

function onRightMonthChange(val: unknown) {
  const m = normalizeNumber(val)
  if (!Number.isFinite(m) || m < 1 || m > 12) return
  setRightViewMonth(rightMonth.value.month(m - 1))
}

function onRightYearChange(val: unknown) {
  const y = normalizeNumber(val)
  if (!Number.isFinite(y)) return
  setRightViewMonth(rightMonth.value.year(y))
}

const hourOptions = computed(() => {
  const step = Math.max(1, props.step.hour || 1)
  const res: number[] = []
  for (let h = 0; h < 24; h += step) res.push(h)
  return res
})

const minuteOptions = computed(() => {
  const step = Math.max(1, props.step.minute || 1)
  const res: number[] = []
  for (let m = 0; m < 60; m += step) res.push(m)
  return res
})

const secondOptions = computed(() => {
  const step = Math.max(1, props.step.second || 1)
  const res: number[] = []
  for (let s = 0; s < 60; s += step) res.push(s)
  return res
})

const hourSelectOptions = computed(() => hourOptions.value.map((h) => ({ value: h, label: pad2(h) })))
const minuteSelectOptions = computed(() => minuteOptions.value.map((m) => ({ value: m, label: pad2(m) })))
const secondSelectOptions = computed(() => secondOptions.value.map((s) => ({ value: s, label: pad2(s) })))

type Cell = {
  key: string
  date: Dayjs
  text: number
  outside: boolean
  today: boolean
  disabled: boolean
  selected: boolean
  inRange: boolean
  rangeStart: boolean
  rangeEnd: boolean
}

function getSelectedRangeForRender() {
  if (!isRange.value) return { start: null as Dayjs | null, end: null as Dayjs | null }

  const mv = model.value

  const committedStart = Array.isArray(mv) ? toDayjs(mv[0]).startOf('day') : null
  const committedEnd = Array.isArray(mv) ? toDayjs(mv[1]).startOf('day') : null

  const start = (rangeDraft.start?.startOf('day') || committedStart) ?? null
  const endCommittedOrDraft = (rangeDraft.end?.startOf('day') || committedEnd) ?? null

  // 面板打开时允许 hover 预览：hoverDate 作为临时 end（不修改已选值）
  if (open.value && hoverDate.value && start) {
    return { start, end: hoverDate.value.startOf('day') }
  }

  return { start, end: endCommittedOrDraft }
}

function buildCells(month: Dayjs): Cell[] {
  const startOfMonth = month.startOf('month')
  const weekStart = props.weekStart
  const startDay = startOfMonth.day()
  const offset = weekStart === 1 ? (startDay === 0 ? 6 : startDay - 1) : startDay
  const gridStart = startOfMonth.subtract(offset, 'day')

  const today = dayjs()

  const selected = model.value
  const selectedSingle = !Array.isArray(selected) && selected ? toDayjs(selected).startOf('day') : null

  const { start, end } = getSelectedRangeForRender()

  // daterange 固定渲染两个月：左 + 右。
  // outside 日期如果属于另一侧正在显示的月份，会在两个面板里重复出现；这些 outside 只保留“本月面板”的高亮。
  const otherPanelMonth = isRange.value ? (month.isSame(leftMonth.value, 'month') ? rightMonth.value : leftMonth.value) : null

  const res: Cell[] = []
  for (let i = 0; i < 42; i++) {
    const d = gridStart.add(i, 'day')
    const outside = d.month() !== startOfMonth.month()
    const disabled = isDisabledDate(d)

    const suppressOutsideHighlight = isRange.value && outside && otherPanelMonth && d.isSame(otherPanelMonth, 'month')

    let selectedFlag = false
    let inRange = false
    let rangeStart = false
    let rangeEnd = false

    // outside 日期允许作为交互端点（hover/点击），但如果它属于另一侧面板正在展示的月份，为避免重复高亮则在本面板抑制。
    if (!suppressOutsideHighlight) {
      if (!isRange.value && selectedSingle) {
        selectedFlag = d.isSame(selectedSingle, 'day')
      }

      if (isRange.value && start && end) {
        const a = start.isBefore(end) ? start : end
        const b = start.isBefore(end) ? end : start
        rangeStart = d.isSame(a, 'day')
        rangeEnd = d.isSame(b, 'day')
        // 预览态：hover 端点也应是选中样式
        selectedFlag = rangeStart || rangeEnd
        inRange = d.isAfter(a, 'day') && d.isBefore(b, 'day')
      } else if (isRange.value && start && !end) {
        rangeStart = d.isSame(start, 'day')
        selectedFlag = rangeStart
      }
    }

    res.push({
      key: d.format('YYYY-MM-DD'),
      date: d,
      text: d.date(),
      outside,
      today: d.isSame(today, 'day'),
      disabled,
      selected: selectedFlag,
      inRange,
      rangeStart,
      rangeEnd,
    })
  }

  return res
}

const cells = computed<Cell[]>(() => buildCells(leftMonth.value))
const leftCells = computed<Cell[]>(() => buildCells(leftMonth.value))
const rightCells = computed<Cell[]>(() => buildCells(rightMonth.value))

const { updatePosition: updatePanelPosition } = useTriggerPopup(rootRef, panelRef, open, panelStyle, {
  strategy: 'fixed',
  outsideEvent: 'mousedown',
  placement: 'bottom-start',
  offset: 6,
  boundaryPadding: 8,
  zIndex: 2000,
  matchWidth: false,
  autoFlip: true,
  clamp: true,
  useTransformTop: false,
  outsideIgnoreSelectors: ['.amu-select__popper'],
  onClose: () => {
    closePanel()
  },
})

const canConfirm = computed(() => {
  if (!needsConfirm.value) return true
  if (!model.value && !rangeDraft.start) return false
  if (isRange.value) {
    const mv = model.value
    if (Array.isArray(mv)) return true
    return !!(rangeDraft.start && rangeDraft.end)
  }
  return !!model.value
})

function openPanel() {
  if (props.disabled) return
  if (open.value) return
  open.value = true
  emit('open')
  syncRangeTextFromModel()
  if (isRange.value) {
    // 默认优先编辑结束日期；仅在还没有起点时编辑起点
    rangeActivePart.value = rangeDraft.start ? 'end' : 'start'
    syncRangeViewMonthForActivePart()
  }
  nextTick(() => {
    focusActiveCell()
  })
}

function closePanel() {
  if (!open.value) return
  open.value = false
  emit('close')
  hoverDate.value = null
  syncRangeTextFromModel()
}

function toggleOpen() {
  if (props.disabled) return
  if (open.value) {
    closePanel()
    return
  }
  openPanel()
}

function onTriggerMouseDown(e: MouseEvent) {
  if (props.disabled) return
  const target = e.target as HTMLElement
  if (target.closest('button')) return
  openPanel()
}

function focusActiveCell() {
  nextTick(() => {
    const panel = panelRef.value
    if (!panel) return
    const selectedKey = (() => {
      const mv = model.value
      if (!mv) return ''
      if (Array.isArray(mv)) return toDayjs(mv[0]).format('YYYY-MM-DD')
      return toDayjs(mv).format('YYYY-MM-DD')
    })()

    const btn = selectedKey
      ? (panel.querySelector(`[data-date="${selectedKey}"]`) as HTMLButtonElement | null)
      : (panel.querySelector('.amu-date-picker__cell-btn') as HTMLButtonElement | null)

    btn?.focus()
  })
}

function onFocus(e: FocusEvent) {
  inputFocused.value = true
  emit('focus', e)
  if (isRange.value) {
    syncRangeTextFromModel()
    return
  }
  syncInputTextFromModel()
}

function onRangeStartFocus(e: FocusEvent) {
  rangeActivePart.value = 'start'
  syncRangeViewMonthForActivePart()
  onFocus(e)
}

function onRangeEndFocus(e: FocusEvent) {
  rangeActivePart.value = 'end'
  syncRangeViewMonthForActivePart()
  onFocus(e)
}

function onBlur(e: FocusEvent) {
  inputFocused.value = false
  emit('blur', e)

  nextTick(() => {
    // 如果面板打开，避免输入 blur 立即触发解析造成跳动
    if (open.value) return
    if (isRange.value) {
      parseAndCommitRangeInput()
      return
    }
    parseAndCommitInput()
  })
}

function onUpdateInput(value: string | number) {
  inputText.value = String(value)
}

function onInput(value: string) {
  inputText.value = value
}

function onRangeStartUpdate(value: string | number) {
  rangeStartText.value = String(value)
}

function onRangeEndUpdate(value: string | number) {
  rangeEndText.value = String(value)
}

function onRangeStartInput(value: string) {
  rangeStartText.value = value
}

function onRangeEndInput(value: string) {
  rangeEndText.value = value
}

function onEnter(e: KeyboardEvent) {
  if (e.key !== 'Enter') return
  if (!open.value) {
    openPanel()
    return
  }
  if (!needsConfirm.value) {
    if (isRange.value) {
      parseAndCommitRangeInput()
    } else {
      parseAndCommitInput()
    }
    closePanel()
    return
  }
  onConfirm()
}

function onInputKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    openPanel()
    return
  }
  if (e.key === 'Escape') {
    if (open.value) {
      e.preventDefault()
      closePanel()
    }
    return
  }
}

function parseAndCommitInput() {
  if (props.disabled || props.readonly) {
    syncInputTextFromModel()
    return
  }

  const text = inputText.value.trim()
  if (!text) {
    if (props.clearable) {
      commitValue(null, 'input')
      return
    }
    syncInputTextFromModel()
    return
  }

  const fmt = typeof props.format === 'string' && props.format ? props.format : getDefaultFormat()

  if (isRange.value) {
    const parts = text.split(/\s+-\s+/).map((s) => s.trim())
    if (parts.length !== 2) {
      syncInputTextFromModel()
      return
    }
    const a = dayjs(parts[0], fmt, true)
    const b = dayjs(parts[1], fmt, true)
    if (!a.isValid() || !b.isValid()) {
      syncInputTextFromModel()
      return
    }

    const da = clampByMinMax(a)
    const db = clampByMinMax(b)
    if (isDisabledDate(da) || isDisabledDate(db)) {
      syncInputTextFromModel()
      return
    }

    commitValue([da.toDate(), db.toDate()], 'input')
    return
  }

  const d = dayjs(text, fmt, true)
  if (!d.isValid()) {
    syncInputTextFromModel()
    return
  }

  const clamped = clampByMinMax(d)
  if (isDisabledDate(clamped)) {
    syncInputTextFromModel()
    return
  }

  commitValue(clamped.toDate(), 'input')
}

function parseAndCommitRangeInput() {
  if (props.disabled || props.readonly) {
    syncRangeTextFromModel()
    return
  }

  const startText = rangeStartText.value.trim()
  const endText = rangeEndText.value.trim()

  if (!startText && !endText) {
    if (props.clearable) {
      commitValue(null, 'input')
      return
    }
    syncRangeTextFromModel()
    return
  }

  const fmt = typeof props.format === 'string' && props.format ? props.format : getDefaultFormat()

  const parseOne = (text: string) => {
    if (!text) return null
    const parsed = dayjs(text, fmt, true)
    if (!parsed.isValid()) return null
    let d = parsed
    if (!showTimeComputed.value) d = d.startOf('day')
    d = clampByMinMax(d)
    if (isDisabledDate(d)) return null
    return d
  }

  const start = parseOne(startText)
  const end = parseOne(endText)

  if ((startText && !start) || (endText && !end)) {
    syncRangeTextFromModel()
    return
  }

  rangeDraft.start = start
  rangeDraft.end = end
  hoverDate.value = null

  if (!needsConfirm.value && start && end) {
    commitValue([start.toDate(), end.toDate()], 'input')
    return
  }

  // 仅更新 draft，等待进一步选择/确认
  syncRangeTextFromModel()
}

function commitValue(val: DatePickerModelValue, source: 'panel' | 'input' | 'shortcut' | 'clear' | 'today' | 'confirm') {
  emit('update:modelValue', val)
  emit('change', val)
  if (source === 'clear') emit('clear')
  syncInputTextFromModel()
  syncRangeTextFromModel()
}

function onClear() {
  if (props.disabled || props.readonly) return
  rangeDraft.start = null
  rangeDraft.end = null
  hoverDate.value = null
  rangeStartText.value = ''
  rangeEndText.value = ''
  commitValue(null, 'clear')
  closePanel()
  focusTriggerInput()
}

function onToday() {
  if (props.disabled) return
  const now = dayjs()
  if (!showTimeComputed.value) {
    const v = clampByMinMax(now.startOf('day'))
    if (!isDisabledDate(v)) {
      commitValue(v.toDate(), 'today')
      closePanel()
    }
    return
  }

  const base = clampByMinMax(now)
  if (isRange.value) {
    const a = base
    const b = base
    commitValue([a.toDate(), b.toDate()], 'today')
  } else {
    commitValue(base.toDate(), 'today')
  }
}

function onShortcut(s: DatePickerShortcut) {
  if (props.disabled) return
  const v = s.value()
  if (Array.isArray(v)) {
    const a = toDayjs(v[0])
    const b = toDayjs(v[1])
    if (isDisabledDate(a) || isDisabledDate(b)) return
    commitValue([a.toDate(), b.toDate()], 'shortcut')
    emit('selectShortcut', s)
    closePanel()
    return
  }
  const d = toDayjs(v)
  if (isDisabledDate(d)) return
  commitValue(d.toDate(), 'shortcut')
  emit('selectShortcut', s)
  closePanel()
}

function goPrevMonth() {
  if (isRange.value) {
    rangeLeftMonth.value = rangeLeftMonth.value.subtract(1, 'month').startOf('month')
  } else {
    viewMonth.value = viewMonth.value.subtract(1, 'month')
  }
  focusActiveCell()
}

function goNextMonth() {
  if (isRange.value) {
    rangeLeftMonth.value = rangeLeftMonth.value.add(1, 'month').startOf('month')
  } else {
    viewMonth.value = viewMonth.value.add(1, 'month')
  }
  focusActiveCell()
}

function goPrevYear() {
  if (isRange.value) {
    rangeLeftMonth.value = rangeLeftMonth.value.subtract(1, 'year').startOf('month')
  } else {
    viewMonth.value = viewMonth.value.subtract(1, 'year')
  }
  focusActiveCell()
}

function goNextYear() {
  if (isRange.value) {
    rangeLeftMonth.value = rangeLeftMonth.value.add(1, 'year').startOf('month')
  } else {
    viewMonth.value = viewMonth.value.add(1, 'year')
  }
  focusActiveCell()
}

function onHoverCell(d: Dayjs, outside?: boolean, disabled?: boolean) {
  if (!isRange.value) return
  if (!open.value) return
  if (props.disabled || props.readonly) return
  if (!rangeDraft.start && !Array.isArray(model.value)) return
  if (disabled) return
  if (hoverDate.value && hoverDate.value.isSame(d, 'day')) return
  hoverDate.value = d
}

function onHoverLeave() {
  if (!isRange.value) return
  if (!open.value) return
  if (props.disabled || props.readonly) return
  if (!rangeDraft.start && !Array.isArray(model.value)) return
  hoverDate.value = null
}

function onSelectCell(d: Dayjs, panel?: 'left' | 'right') {
  if (props.disabled || props.readonly) return
  if (isDisabledDate(d)) return

  if (!isRange.value) {
    viewMonth.value = d.startOf('month')
  } else {
    const monthStart = d.startOf('month')
    if (panel === 'left') {
      if (!monthStart.isSame(leftMonth.value, 'month')) {
        rangeLeftMonth.value = monthStart
      }
    } else if (panel === 'right') {
      if (!monthStart.isSame(rightMonth.value, 'month')) {
        rangeLeftMonth.value = monthStart.subtract(1, 'month').startOf('month')
      }
    }
  }

  if (!isRange.value) {
    let picked = d
    if (!showTimeComputed.value) {
      picked = picked.startOf('day')
    } else {
      picked = dayjsFromParts(picked, timeDraftStart.h, timeDraftStart.m, timeDraftStart.s)
    }
    picked = clampByMinMax(picked)
    commitValue(picked.toDate(), 'panel')

    if (!needsConfirm.value) closePanel()
    return
  }

  // 范围选择
  const pickedDay = d.startOf('day')

  // 还没有起点：设置起点，进入选择终点阶段
  if (!rangeDraft.start && !Array.isArray(model.value)) {
    rangeDraft.start = pickedDay
    rangeDraft.end = null
    rangeActivePart.value = 'end'
    hoverDate.value = null
    syncRangeTextFromModel()
    return
  }

  // 已选完整范围：根据当前激活输入更新对应端点（默认 end）
  if (rangeDraft.start && rangeDraft.end) {
    if (rangeActivePart.value === 'start') {
      rangeDraft.start = pickedDay
    } else {
      rangeDraft.end = pickedDay
    }

    // 归一化：保证 start <= end
    if (rangeDraft.start && rangeDraft.end && rangeDraft.start.isAfter(rangeDraft.end, 'day')) {
      const tmp = rangeDraft.start
      rangeDraft.start = rangeDraft.end
      rangeDraft.end = tmp
    }

    hoverDate.value = null
    syncRangeTextFromModel()

    if (!needsConfirm.value) {
      const a = rangeDraft.start
      const b = rangeDraft.end
      if (a && b) {
        commitValue([a.toDate(), b.toDate()], 'panel')
        closePanel()
      }
    }

    return
  }

  // 已有起点但还没选终点：设置终点
  rangeDraft.end = pickedDay

  // 归一化：保证 start <= end
  if (rangeDraft.start && rangeDraft.end && rangeDraft.start.isAfter(rangeDraft.end, 'day')) {
    const tmp = rangeDraft.start
    rangeDraft.start = rangeDraft.end
    rangeDraft.end = tmp
  }

  hoverDate.value = null
  syncRangeTextFromModel()

  if (!needsConfirm.value) {
    const a = rangeDraft.start
    const b = rangeDraft.end
    if (a && b) {
      commitValue([a.toDate(), b.toDate()], 'panel')
      closePanel()
    }
  }
}

function onConfirm() {
  if (props.disabled || props.readonly) return
  if (!canConfirm.value) return

  if (isRange.value) {
    const a = rangeDraft.start
    const b = rangeDraft.end
    if (!a || !b) return

    let start = a
    let end = b

    if (showTimeComputed.value) {
      start = dayjsFromParts(start, timeDraftStart.h, timeDraftStart.m, timeDraftStart.s)
      end = dayjsFromParts(end, timeDraftEnd.h, timeDraftEnd.m, timeDraftEnd.s)
    }

    start = clampByMinMax(start)
    end = clampByMinMax(end)

    if (isDisabledDate(start) || isDisabledDate(end)) return

    commitValue([start.toDate(), end.toDate()], 'confirm')
    closePanel()
    return
  }

  const mv = model.value
  if (!mv || Array.isArray(mv)) return
  let d = toDayjs(mv)

  if (showTimeComputed.value) {
    d = dayjsFromParts(d, timeDraftStart.h, timeDraftStart.m, timeDraftStart.s)
  } else {
    d = d.startOf('day')
  }

  d = clampByMinMax(d)
  if (isDisabledDate(d)) return
  commitValue(d.toDate(), 'confirm')
  closePanel()
}

const shortcutsComputed = computed<DatePickerShortcut[]>(() => {
  return props.shortcuts ?? []
})

onMounted(() => {
  // 避免 SSR 警告，这里不做额外事情
})
</script>
