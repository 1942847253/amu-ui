<template>
  <div
    :class="[
      'amu-input-number',
      `amu-input-number--${size}`,
      {
        'is-disabled': disabled,
        'is-without-controls': !controls,
        'is-controls-right': controlsPosition === 'right',
        [`is-status-${status}`]: status,
      }
    ]"
    @dragstart.prevent
  >
    <!-- Decrease Button (Left) -->
    <span
        v-if="controls && controlsPosition !== 'right'"
        role="button"
        :class="['amu-input-number__decrease', { 'is-disabled': minDisabled }]"
        @click="decrease"
        @mousedown.prevent
    >
        <slot name="decrease-icon">
            <AmuIcon><IconMinus /></AmuIcon>
        </slot>
    </span>

    <!-- Increase Button (Right) -->
    <span
        v-if="controls && controlsPosition !== 'right'"
        role="button"
        :class="['amu-input-number__increase', { 'is-disabled': maxDisabled }]"
        @click="increase"
        @mousedown.prevent
    >
        <slot name="increase-icon">
            <AmuIcon><IconPlus /></AmuIcon>
        </slot>
    </span>

    <AmuInput
        ref="input"
        :model-value="displayValue"
        :name="name"
        :id="id"
        :disabled="disabled"
        :readonly="readonly"
        :size="size"
        :placeholder="placeholder"
        :status="status"
        :align="controlsPosition === 'right' ? 'left' : 'center'"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.up.prevent="increase"
        @keydown.down.prevent="decrease"
        @keydown.home.prevent="toMin"
        @keydown.end.prevent="toMax"
    />

    <div
        v-if="controls && controlsPosition === 'right'"
        class="amu-input-number__controls-right"
    >
        <span 
            role="button"
            :class="['amu-input-number__increase', { 'is-disabled': maxDisabled }]"
            @click.stop="increase"
            @mousedown.prevent
        >
            <AmuIcon><IconChevronUp /></AmuIcon>
        </span>
        <span 
            role="button"
            :class="['amu-input-number__decrease', { 'is-disabled': minDisabled }]"
            @click.stop="decrease"
            @mousedown.prevent
        >
            <AmuIcon><IconChevronDown /></AmuIcon>
        </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import { AmuInput } from '../../input' // Import AmuInput
import { AmuIcon } from '../../icon'
import { IconMinus, IconPlus, IconChevronUp, IconChevronDown } from '@amu-ui/icons'
import { inputNumberProps, inputNumberEmits } from './props'
import { add, subtract, isNumber, getPrecision } from './utils'

defineOptions({
  name: 'AmuInputNumber',
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const input = ref<HTMLInputElement>()
const userInput = ref<string | null>(null)

// Parse input string to number
const parseValue = (val: string | number): number | null => {
    if (val === '') return null
    if (props.parser) {
        val = props.parser(val)
    }
    const num = Number(val)
    return isNumber(num) ? num : null
}

// Format number to output string
const formatValue = (val: number | string): string => {
    if (props.formatter) {
        return props.formatter(val)
    }
    return val.toString()
}

// Ensure precision
const toPrecision = (num: number, pre?: number) => {
    if (pre === undefined) pre = props.precision
    if (pre === undefined) return num
    return parseFloat(Number(num).toFixed(pre))
}

// Validate and Clamp
const getValidValue = (val: number | null): number | undefined => {
    if (val === null) return undefined // handle empty
    
    // Step check? Usually we don't force step on manual input unless strict.
    if (props.stepStrictly) {
        const stepPrecision = getPrecision(props.step)
        const precisionFactory = Math.pow(10, stepPrecision)
        val = Math.round(val / props.step) * props.step
        val = parseFloat(val.toFixed(Math.max(props.precision || 0, stepPrecision))) 
    }

    if (props.precision !== undefined) {
        val = toPrecision(val, props.precision)
    }

    if (val < props.min) val = props.min
    if (val > props.max) val = props.max
    
    return val
}

const displayValue = computed(() => {
    if (userInput.value !== null) {
        return userInput.value
    }
    let val = props.modelValue
    if (!isNumber(val)) return ''
    if (isNumber(val)) {
        if (props.precision !== undefined) {
            val = val.toFixed(props.precision)
        }
    }
    return formatValue(val!)
})

const minDisabled = computed(() => {
    return isNumber(props.modelValue) && (props.modelValue <= props.min)
})

const maxDisabled = computed(() => {
    return isNumber(props.modelValue) && (props.modelValue >= props.max)
})

// Current display type. If formatter is present, text. Otherwise number.
const displayType = computed(() => props.formatter ? 'text' : 'number')

const setCurrentValue = (newVal: number | undefined | null) => {
    const oldVal = props.modelValue
    if (typeof newVal === 'number' && props.precision !== undefined) {
        newVal = toPrecision(newVal, props.precision)
    }
    
    if (newVal !== undefined && newVal !== null) {
        if (newVal >= props.max) newVal = props.max
        if (newVal <= props.min) newVal = props.min
    }

    if (oldVal === newVal) return
    
    emit('update:modelValue', newVal === null ? undefined : newVal)
    emit('input', newVal === null ? undefined : newVal)
    emit('change', newVal === null ? undefined : newVal, oldVal)
}

const increase = () => {
    if (props.disabled || props.readonly || maxDisabled.value) return
    const val = props.modelValue || 0
    const newVal = add(val, props.step)
    setCurrentValue(newVal)
    resetUserInput()
}

const decrease = () => {
    if (props.disabled || props.readonly || minDisabled.value) return
    const val = props.modelValue || 0
    const newVal = subtract(val, props.step)
    setCurrentValue(newVal)
    resetUserInput()
}

const toMin = () => {
    if (props.disabled || props.readonly) return
    setCurrentValue(props.min)
    resetUserInput()
}

const toMax = () => {
    if (props.disabled || props.readonly) return
    setCurrentValue(props.max)
    resetUserInput()
}

const handleInput = (val: string) => {
    // AmuInput emits string directly
    const value = val
    userInput.value = value
    const parsed = parseValue(value)
    if (parsed !== null && !isNaN(parsed)) {
       // emit('update:modelValue', parsed) 
    }
}

const handleBlur = (event: FocusEvent) => {
    // AmuInput emits standard focus event
    const value = (event.target as HTMLInputElement).value
    let newVal = parseValue(value) // returns number or null (empty/NaN is null)
    
    if (newVal !== null) {
        newVal = getValidValue(newVal)
    }
    
    // Reset user input to trigger formatting re-calc logic later
    userInput.value = null
    
    if (newVal !== null && newVal !== undefined) {
         setCurrentValue(newVal)
    } else {
         // Empty input
         if (props.allowEmpty) {
             setCurrentValue(undefined)
         } else {
             // Revert to current modelValue
             // By setting userInput to null, displayValue computed property will pick up props.modelValue
             // We just need to ensure the input visually updates if it was cleared.
             // Since userInput is null, displayValue depends on modelValue.
             // If modelValue didn't change, Vue might not re-render input value if it was manually changed?
             // Vue's :value binding usually handles this if displayValue matches modelValue.
             // But valid 'input' event changed DOM value.
             // We need to force update if model value stays same.
             if (input.value) {
                 input.value.value = displayValue.value
             }
         }
    }
    
    emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
    // Optional: On focus, show raw value to edit?
    // userInput.value = props.modelValue?.toString() || ''
    emit('focus', event)
}

const resetUserInput = () => {
    userInput.value = null
}

watch(() => props.modelValue, () => {
    // If external change happens, clear internal user input unless focused?
    // Actually if external change happens, we should respect it.
    resetUserInput()
})

</script>
