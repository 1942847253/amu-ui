<template>
  <AmuPopup
    v-model="open"
    trigger="manual"
    placement="bottom-start"
    :offset="4"
    transition="amu-zoom-in-top"
    class="amu-date-picker__panel"
    role="dialog"
    aria-modal="false"
    @mousedown.stop
    @hide="onPopupHide"
  >
    <template #reference>
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
        v-bind="$attrs"
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
      </div>
    </template>

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
                      @click="goLeftPrevYear"
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
                      @click="goLeftPrevMonth"
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

                  <div class="amu-date-picker__nav">
                    <AmuButton
                      class="amu-date-picker__nav-btn"
                      type="text"
                      size="mini"
                      shape="circle"
                      @click="goLeftNextMonth"
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
                      @click="goLeftNextYear"
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
                  <div class="amu-date-picker__nav">
                    <AmuButton
                      class="amu-date-picker__nav-btn"
                      type="text"
                      size="mini"
                      shape="circle"
                      @click="goRightPrevYear"
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
                      @click="goRightPrevMonth"
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
                      @click="goRightNextMonth"
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
                      @click="goRightNextYear"
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

  </AmuPopup>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, toRefs, useSlots, watch, type Slots } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { datePickerEmits, datePickerProps, type DatePickerModelValue, type DatePickerShortcut } from './props'
import { useHover, useLocale } from '@amu-ui/hooks'
import { AmuButton } from '../../button'
import { AmuIcon } from '../../icon'
import { AmuInput } from '../../input'
import { AmuPopup } from '../../popup'
import { AmuSelect } from '../../select'
import { IconCalendar, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconX } from '@amu-ui/icons'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

defineOptions({
  name: 'AmuDatePicker',
  inheritAttrs: false,
})

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const { clearable, disabled, readonly, size, status } = toRefs(props)
const { t } = useLocale()
const componentSlots = useSlots() as Slots

const rootRef = ref<HTMLElement>()
const { hovered } = useHover(rootRef)

const open = ref(false)
const inputFocused = ref(false)

const isRange = computed(() => props.type === 'daterange' || props.type === 'datetimerange')
const hasTimeByType = computed(() => props.type === 'datetime' || props.type === 'datetimerange')
const showTimeComputed = computed(() => props.showTime || hasTimeByType.value)
const needsConfirm = computed(() => showTimeComputed.value)

// --- State ---
const leftViewMonth = ref<Dayjs>(dayjs().startOf('month'))
const rightViewMonth = ref<Dayjs>(dayjs().startOf('month').add(1, 'month'))
const rangeActivePart = ref<'start' | 'end'>('start') // Which input is active

// Draft values (what is currently selected in the panel/inputs)
const singleDraft = ref<Dayjs | null>(null)
const rangeDraft = reactive<{ start: Dayjs | null; end: Dayjs | null }>({ start: null, end: null })
const timeDraftStart = reactive({ h: 0, m: 0, s: 0 })
const timeDraftEnd = reactive({ h: 0, m: 0, s: 0 })

// Selection State
const isSelecting = ref(false)
const hoverDate = ref<Dayjs | null>(null)

// Input Text
const inputText = ref('')
const rangeStartText = ref('')
const rangeEndText = ref('')

// --- Helpers ---
function toDayjs(d: any): Dayjs {
  if (props.timezone === 'utc') return dayjs.utc(d)
  if (props.timezone && props.timezone !== 'local') return dayjs(d).tz(props.timezone)
  return dayjs(d)
}

function clampDate(d: Dayjs) {
  if (props.minDate && d.isBefore(toDayjs(props.minDate))) return toDayjs(props.minDate)
  if (props.maxDate && d.isAfter(toDayjs(props.maxDate))) return toDayjs(props.maxDate)
  return d
}

function isDisabledDate(d: Dayjs) {
  if (props.disabled) return true
  if (props.minDate && d.isBefore(toDayjs(props.minDate), 'day')) return true
  if (props.maxDate && d.isAfter(toDayjs(props.maxDate), 'day')) return true
  if (props.disabledDate && props.disabledDate(d.toDate())) return true
  return false
}

function getDefaultFormat() {
  if (props.format) return props.format as string
  return showTimeComputed.value ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
}

function formatDate(d: Dayjs | null) {
  if (!d) return ''
  const fmt = getDefaultFormat()
  if (typeof props.format === 'function') return props.format(d.toDate())
  return d.format(fmt)
}

// --- Sync Logic ---
function syncFromProps() {
  const val = props.modelValue
  if (!val) {
    singleDraft.value = null
    rangeDraft.start = null
    rangeDraft.end = null
    const now = dayjs()
    timeDraftStart.h = now.hour(); timeDraftStart.m = now.minute(); timeDraftStart.s = now.second()
    timeDraftEnd.h = now.hour(); timeDraftEnd.m = now.minute(); timeDraftEnd.s = now.second()
  } else if (Array.isArray(val)) {
    const s = toDayjs(val[0])
    const e = toDayjs(val[1])
    rangeDraft.start = s
    rangeDraft.end = e
    timeDraftStart.h = s.hour(); timeDraftStart.m = s.minute(); timeDraftStart.s = s.second()
    timeDraftEnd.h = e.hour(); timeDraftEnd.m = e.minute(); timeDraftEnd.s = e.second()
  } else {
    const d = toDayjs(val)
    singleDraft.value = d
    timeDraftStart.h = d.hour(); timeDraftStart.m = d.minute(); timeDraftStart.s = d.second()
  }
  syncInputText()
}

function syncInputText() {
  if (isRange.value) {
    rangeStartText.value = formatDate(rangeDraft.start)
    rangeEndText.value = formatDate(rangeDraft.end)
  } else {
    inputText.value = formatDate(singleDraft.value)
  }
}

watch(() => props.modelValue, syncFromProps, { immediate: true })

// --- Computed for Template ---
const model = computed(() => props.modelValue) // For compatibility with some template checks
const placeholderComputed = computed(() => {
  if (props.placeholder) return props.placeholder
  if (isRange.value) return `${t('el.datepicker.startDate')} - ${t('el.datepicker.endDate')}`
  return t('el.datepicker.selectDate')
})
const rangeStartPlaceholder = computed(() => isRange.value ? t('el.datepicker.startDate') : '')
const rangeEndPlaceholder = computed(() => isRange.value ? t('el.datepicker.endDate') : '')

const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && !!props.modelValue && (inputFocused.value || open.value || hovered.value)
})

const showFooter = computed<boolean>(() => !!componentSlots.footer || (showTimeComputed.value && !!props.clearable))

// Calendar Views
const leftMonth = computed(() => leftViewMonth.value)
const rightMonth = computed(() => rightViewMonth.value)

// Header Selects
const headerSelectSize = computed(() => size.value === 'small' ? 'small' : (size.value === 'large' ? 'large' : 'default'))
const monthOptions = computed(() => Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1), value: i + 1 })))

const leftYearOptions = computed(() => {
  const y = leftViewMonth.value.year()
  return Array.from({ length: 20 }, (_, i) => ({ label: String(y - 10 + i), value: y - 10 + i }))
})
const rightYearOptions = computed(() => {
  const y = rightViewMonth.value.year()
  return Array.from({ length: 20 }, (_, i) => ({ label: String(y - 10 + i), value: y - 10 + i }))
})
const yearOptions = leftYearOptions

const headerMonthValue = computed(() => leftMonth.value.month() + 1)
const headerYearValue = computed(() => leftMonth.value.year())
const leftMonthValue = computed(() => leftMonth.value.month() + 1)
const leftYearValue = computed(() => leftMonth.value.year())
const rightMonthValue = computed(() => rightMonth.value.month() + 1)
const rightYearValue = computed(() => rightMonth.value.year())

// Time Options
const hourSelectOptions = computed(() => Array.from({ length: 24 }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') })))
const minuteSelectOptions = computed(() => Array.from({ length: 60 }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') })))
const secondSelectOptions = computed(() => Array.from({ length: 60 }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') })))

const weekLabels = computed(() => {
  const labels = [
    t('el.datepicker.weeks.sun'), t('el.datepicker.weeks.mon'), t('el.datepicker.weeks.tue'),
    t('el.datepicker.weeks.wed'), t('el.datepicker.weeks.thu'), t('el.datepicker.weeks.fri'), t('el.datepicker.weeks.sat')
  ]
  return props.weekStart === 1 ? [...labels.slice(1), labels[0]] : labels
})

// --- Cell Building ---
function buildCells(month: Dayjs) {
  const startOfMonth = month.startOf('month')
  const offset = (startOfMonth.day() - (props.weekStart || 0) + 7) % 7
  const gridStart = startOfMonth.subtract(offset, 'day')
  const today = dayjs()
  
  let start: Dayjs | null = null
  let end: Dayjs | null = null
  
  if (isRange.value) {
    start = rangeDraft.start
    end = rangeDraft.end
    if (isSelecting.value && hoverDate.value && start) {
       end = hoverDate.value
    }
    if (start && end && start.isAfter(end)) {
      [start, end] = [end, start]
    }
  } else {
    start = singleDraft.value
    end = singleDraft.value
  }

  const res = []
  for (let i = 0; i < 42; i++) {
    const d = gridStart.add(i, 'day')
    const outside = d.month() !== month.month()
    const disabled = isDisabledDate(d)
    
    let selected = false
    let inRange = false
    let rangeStart = false
    let rangeEnd = false
    
    if (!disabled) {
      // In range mode, do not highlight outside cells
      if (isRange.value && outside) {
        // skip
      } else if (isRange.value && start) {
        if (end) {
           rangeStart = d.isSame(start, 'day')
           rangeEnd = d.isSame(end, 'day')
           inRange = d.isAfter(start, 'day') && d.isBefore(end, 'day')
           selected = rangeStart || rangeEnd
        } else {
           rangeStart = d.isSame(start, 'day')
           selected = rangeStart
        }
      } else if (!isRange.value && start) {
        selected = d.isSame(start, 'day')
      }
    }

    res.push({
      key: d.format('YYYY-MM-DD'),
      date: d,
      text: d.date(),
      outside,
      today: d.isSame(today, 'day'),
      disabled,
      selected,
      inRange,
      rangeStart,
      rangeEnd
    })
  }
  return res
}

const cells = computed(() => buildCells(leftViewMonth.value))
const leftCells = computed(() => buildCells(leftMonth.value))
const rightCells = computed(() => buildCells(rightMonth.value))

// --- Actions ---
const ignoreNextClose = ref(false)

function onPopupHide() {
  if (ignoreNextClose.value) {
    ignoreNextClose.value = false
  } else {
    syncFromProps()
  }
  isSelecting.value = false
  hoverDate.value = null
  emit('close')
}

function openPanel() {
  if (disabled.value || readonly.value || open.value) return
  open.value = true
  emit('open')
  
  isSelecting.value = false
  hoverDate.value = null
  
  if (isRange.value) {
    const start = rangeDraft.start || dayjs()
    const end = rangeDraft.end || start.add(1, 'month')
    leftViewMonth.value = start.startOf('month')
    rightViewMonth.value = end.startOf('month')
    
    // Ensure gap
    if (rightViewMonth.value.isSame(leftViewMonth.value, 'month') || rightViewMonth.value.isBefore(leftViewMonth.value, 'month')) {
       rightViewMonth.value = leftViewMonth.value.add(1, 'month')
    }
  } else {
    leftViewMonth.value = (singleDraft.value || dayjs()).startOf('month')
  }
}

function closePanel(commit = false) {
  if (!open.value) return
  if (commit) {
    ignoreNextClose.value = true
  }
  open.value = false
}

function toggleOpen() {
  open.value ? closePanel(true) : openPanel()
}

function onSelectCell(d: Dayjs, panel?: 'left' | 'right') {
  if (isDisabledDate(d)) return
  
  if (isRange.value) {
     const m = d.startOf('month')
     
     // Check if visible in Left
     const inLeft = m.isSame(leftViewMonth.value, 'month')
     // Check if visible in Right
     const inRight = m.isSame(rightViewMonth.value, 'month')
     
     if (!inLeft && !inRight) {
        if (panel === 'left') {
           leftViewMonth.value = m
        } else if (panel === 'right') {
           rightViewMonth.value = m
        }
     }
  } else {
     leftViewMonth.value = d.startOf('month')
  }

  if (isRange.value) {
    if (!isSelecting.value) {
      rangeDraft.start = d
      rangeDraft.end = null
      isSelecting.value = true
      rangeActivePart.value = 'end'
    } else {
      rangeDraft.end = d
      isSelecting.value = false
      if (rangeDraft.start && rangeDraft.end && rangeDraft.start.isAfter(rangeDraft.end)) {
        const tmp = rangeDraft.start
        rangeDraft.start = rangeDraft.end
        rangeDraft.end = tmp
      }
      if (!needsConfirm.value) confirmValue()
    }
  } else {
    singleDraft.value = d
    if (!needsConfirm.value) confirmValue()
  }
}

function onHoverCell(d: Dayjs, _outside?: boolean, _disabled?: boolean) {
  if (isRange.value && isSelecting.value && !isDisabledDate(d) && !_disabled) {
    hoverDate.value = d
  }
}

function onHoverLeave() {
  hoverDate.value = null
}

function confirmValue() {
  if (isRange.value) {
    if (rangeDraft.start && rangeDraft.end) {
      let s = rangeDraft.start
      let e = rangeDraft.end
      if (showTimeComputed.value) {
         s = s.hour(timeDraftStart.h).minute(timeDraftStart.m).second(timeDraftStart.s)
         e = e.hour(timeDraftEnd.h).minute(timeDraftEnd.m).second(timeDraftEnd.s)
      }
      emit('update:modelValue', [s.toDate(), e.toDate()])
      emit('change', [s.toDate(), e.toDate()])
      closePanel(true)
    }
  } else {
    if (singleDraft.value) {
      let d = singleDraft.value
      if (showTimeComputed.value) {
         d = d.hour(timeDraftStart.h).minute(timeDraftStart.m).second(timeDraftStart.s)
      }
      emit('update:modelValue', d.toDate())
      emit('change', d.toDate())
      closePanel(true)
    }
  }
}

function onConfirm() {
  confirmValue()
}

function onClear() {
  if (disabled.value || readonly.value) return
  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
  closePanel(true)
}

function onToday() {
  if (disabled.value) return
  const now = dayjs()
  if (isRange.value) {
    rangeDraft.start = now
    rangeDraft.end = now
  } else {
    singleDraft.value = now
  }
  confirmValue()
}

function onShortcut(s: DatePickerShortcut) {
  if (disabled.value) return
  const v = s.value()
  if (Array.isArray(v)) {
    rangeDraft.start = toDayjs(v[0])
    rangeDraft.end = toDayjs(v[1])
  } else {
    singleDraft.value = toDayjs(v)
  }
  confirmValue()
  emit('selectShortcut', s)
}

// --- Navigation ---
const goLeftPrevYear = () => { leftViewMonth.value = leftViewMonth.value.subtract(1, 'year') }
const goLeftPrevMonth = () => { leftViewMonth.value = leftViewMonth.value.subtract(1, 'month') }
const goLeftNextMonth = () => {
  const next = leftViewMonth.value.add(1, 'month')
  if (isRange.value && (next.isSame(rightViewMonth.value, 'month') || next.isAfter(rightViewMonth.value, 'month'))) {
    rightViewMonth.value = next.add(1, 'month')
  }
  leftViewMonth.value = next
}
const goLeftNextYear = () => {
  const next = leftViewMonth.value.add(1, 'year')
  if (isRange.value && (next.isSame(rightViewMonth.value, 'month') || next.isAfter(rightViewMonth.value, 'month'))) {
    rightViewMonth.value = next.add(1, 'month')
  }
  leftViewMonth.value = next
}

const goRightPrevMonth = () => {
  const prev = rightViewMonth.value.subtract(1, 'month')
  if (prev.isSame(leftViewMonth.value, 'month') || prev.isBefore(leftViewMonth.value, 'month')) {
    leftViewMonth.value = prev.subtract(1, 'month')
  }
  rightViewMonth.value = prev
}
const goRightPrevYear = () => {
  const prev = rightViewMonth.value.subtract(1, 'year')
  if (prev.isSame(leftViewMonth.value, 'month') || prev.isBefore(leftViewMonth.value, 'month')) {
    leftViewMonth.value = prev.subtract(1, 'month')
  }
  rightViewMonth.value = prev
}
const goRightNextMonth = () => { rightViewMonth.value = rightViewMonth.value.add(1, 'month') }
const goRightNextYear = () => { rightViewMonth.value = rightViewMonth.value.add(1, 'year') }

// For Single Mode compatibility
const goPrevYear = () => goLeftPrevYear()
const goPrevMonth = () => goLeftPrevMonth()
const goNextMonth = () => goLeftNextMonth()
const goNextYear = () => goLeftNextYear()

function onHeaderMonthChange(v: any) { leftViewMonth.value = leftViewMonth.value.month(Number(v) - 1) }
function onHeaderYearChange(v: any) { leftViewMonth.value = leftViewMonth.value.year(Number(v)) }
function onRightMonthChange(v: any) { rightViewMonth.value = rightViewMonth.value.month(Number(v) - 1) }
function onRightYearChange(v: any) { rightViewMonth.value = rightViewMonth.value.year(Number(v)) }
function onLeftMonthChange(v: any) { onHeaderMonthChange(v) }
function onLeftYearChange(v: any) { onHeaderYearChange(v) }

// --- Input Handlers ---
function onBlur(e: FocusEvent) {
  inputFocused.value = false
  emit('blur', e)
  // Simple parse logic for blur
  if (!open.value) {
     // If panel is closed, blur should try to parse input
     // But usually we rely on Enter or Panel selection.
     // If user types and clicks away, we should probably commit.
     // For now, let's just sync back to ensure valid state.
     syncInputText()
  }
}
function onFocus(e: FocusEvent) { inputFocused.value = true; emit('focus', e) }
function onRangeStartFocus(e: FocusEvent) { rangeActivePart.value = 'start'; onFocus(e) }
function onRangeEndFocus(e: FocusEvent) { rangeActivePart.value = 'end'; onFocus(e) }
function onInput(v: string) { inputText.value = v }
function onRangeStartInput(v: string) { rangeStartText.value = v }
function onRangeEndInput(v: string) { rangeEndText.value = v }
function onRangeStartUpdate(v: string | number) { rangeStartText.value = String(v) }
function onRangeEndUpdate(v: string | number) { rangeEndText.value = String(v) }
function onUpdateInput(v: string | number) { inputText.value = String(v) }

function onEnter(e: KeyboardEvent) {
  if (e.key !== 'Enter') return
  if (!open.value) {
    openPanel()
  } else {
    confirmValue()
  }
}

function onTriggerMouseDown(e: MouseEvent) {
  if (disabled.value) return
  const target = e.target as HTMLElement
  if (target.closest('button')) return
  openPanel()
}

function onInputKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    openPanel()
  }
  if (e.key === 'Escape') {
    closePanel(false)
  }
}



const canConfirm = computed(() => {
  if (!needsConfirm.value) return true
  if (isRange.value) return !!(rangeDraft.start && rangeDraft.end)
  return !!singleDraft.value
})

const shortcutsComputed = computed(() => props.shortcuts || [])

onMounted(() => {
  //
})
</script>
