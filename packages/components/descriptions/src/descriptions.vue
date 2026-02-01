<template>
  <div
    class="amu-descriptions"
    :class="[
      `amu-descriptions--${size}`,
      { 'amu-descriptions--bordered': border },
      { 'amu-descriptions--vertical': direction === 'vertical' }
    ]"
  >
    <div
      v-if="title || extra || $slots.title || $slots.extra"
      class="amu-descriptions__header"
    >
      <div class="amu-descriptions__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="amu-descriptions__extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>

    <div class="amu-descriptions__body">
      <table class="amu-descriptions__table">
        <tbody>
          <template v-for="(row, rowIndex) in rows" :key="rowIndex">
            <template v-if="direction === 'vertical'">
              <tr class="amu-descriptions__row">
                <template v-for="(cell, cellIndex) in row" :key="`label-${cellIndex}`">
                  <th
                    class="amu-descriptions__label"
                    :class="[
                      { 'is-bordered-label': border, 'is-colon': colon && hasLabel(cell) },
                      cell.props?.labelClassName
                    ]"
                    :style="{
                      width: cell.props?.width || labelWidth,
                      minWidth: cell.props?.minWidth,
                      textAlign: cell.props?.labelAlign || labelAlign || cell.props?.align || contentAlign,
                      ...labelStyle,
                      ...cell.props?.labelStyle
                    }"
                    :colspan="cell.span"
                  >
                    <template v-if="isString(cell.labelContent)">
                      {{ cell.labelContent }}
                    </template>
                    <template v-else>
                      <component
                        v-for="(labelNode, labelIndex) in cell.labelContent"
                        :key="labelIndex"
                        :is="labelNode"
                      />
                    </template>
                  </th>
                </template>
              </tr>
              <tr class="amu-descriptions__row">
                <template v-for="(cell, cellIndex) in row" :key="`content-${cellIndex}`">
                  <td
                    class="amu-descriptions__content"
                    :class="[
                      { 'is-bordered-content': border },
                      cell.props?.className
                    ]"
                    :style="{
                      textAlign: cell.props?.align || contentAlign,
                      ...contentStyle,
                      ...cell.props?.contentStyle
                    }"
                    :colspan="cell.span"
                  >
                    <component :is="cell.vnode" />
                  </td>
                </template>
              </tr>
            </template>
            
            <template v-else>
              <tr class="amu-descriptions__row">
                <template v-for="(cell, cellIndex) in row" :key="cellIndex">
                  <template v-if="border">
                    <th
                      class="amu-descriptions__label"
                      :class="[
                        'is-bordered-label',
                        { 'is-colon': colon && hasLabel(cell) },
                        cell.props?.labelClassName
                      ]"
                      :style="{
                         width: cell.props?.width || labelWidth,
                         minWidth: cell.props?.minWidth,
                         textAlign: cell.props?.labelAlign || labelAlign || cell.props?.align || contentAlign,
                         ...labelStyle,
                         ...cell.props?.labelStyle
                      }"
                      :colspan="1"
                    >
                      <template v-if="isString(cell.labelContent)">
                        {{ cell.labelContent }}
                      </template>
                      <template v-else>
                        <component
                          v-for="(labelNode, labelIndex) in cell.labelContent"
                          :key="labelIndex"
                          :is="labelNode"
                        />
                      </template>
                    </th>
                    <td
                      class="amu-descriptions__content"
                       :class="[
                        'is-bordered-content',
                        cell.props?.className
                      ]"
                      :style="{
                         textAlign: cell.props?.align || contentAlign,
                         ...contentStyle,
                         ...cell.props?.contentStyle
                      }"
                      :colspan="cell.span * 2 - 1"
                    >
                       <component :is="cell.vnode" />
                    </td>
                  </template>

                  <template v-else>
                     <td 
                        class="amu-descriptions__cell" 
                        :colspan="cell.span"
                        :class="cell.props?.className"
                     >
                       <div class="amu-descriptions__container">
                         <span 
                           v-if="hasLabel(cell)"
                           class="amu-descriptions__label"
                           :class="[
                             { 'is-colon': colon && hasLabel(cell) },
                             cell.props?.labelClassName
                           ]"
                           :style="{
                              width: cell.props?.width || labelWidth,
                              minWidth: cell.props?.minWidth,
                              textAlign: cell.props?.labelAlign || labelAlign || cell.props?.align || contentAlign,
                              ...labelStyle,
                              ...cell.props?.labelStyle
                           }"
                         >
                            <template v-if="isString(cell.labelContent)">
                              {{ cell.labelContent }}
                            </template>
                            <template v-else>
                              <component
                                v-for="(labelNode, labelIndex) in cell.labelContent"
                                :key="labelIndex"
                                :is="labelNode"
                              />
                            </template>
                         </span>
                         <span 
                           class="amu-descriptions__content"
                           :style="{
                              textAlign: cell.props?.align || contentAlign,
                              ...contentStyle,
                              ...cell.props?.contentStyle
                           }"
                         >
                            <component :is="cell.vnode" />
                         </span>
                       </div>
                     </td>
                  </template>
                </template>
              </tr>
            </template>

          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots, Fragment, Comment, ref, onMounted, onUnmounted, type VNode, type VNodeArrayChildren } from 'vue'
import { ResponsiveObserve, type ScreenMap, type Breakpoint } from '@amu-ui/utils'
import { descriptionsProps, type DescriptionsColumn } from './props'
import './style.css'

defineOptions({
  name: 'AmuDescriptions'
})

const props = defineProps(descriptionsProps)
const slots = useSlots()

const activeBreakpoints = ref<string[]>([])
let token = -1

onMounted(() => {
  token = ResponsiveObserve.subscribe((screens: ScreenMap) => {
    const activePoints: string[] = []
    for (const k in screens) {
      if (screens[k as keyof typeof screens]) {
        activePoints.push(k)
      }
    }
    activeBreakpoints.value = activePoints
  })
})

onUnmounted(() => {
    if (token !== -1) ResponsiveObserve.unsubscribe(token)
})

const computedColumn = computed(() => {
  if (typeof props.column === 'number') return props.column
  if (props.column && typeof props.column === 'object') {
    const columnMap = props.column as Exclude<DescriptionsColumn, number>
    const bps: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
    for (const bp of bps) {
      if (activeBreakpoints.value.includes(bp) && columnMap[bp] !== undefined) {
        return columnMap[bp] as number
      }
    }
    return 3
  }
  return 3
})

function isVNode(node: any): node is VNode {
    return node && typeof node === 'object' && 'type' in node
}

const flattenChildren = (children: VNodeArrayChildren): VNode[] => {
  const result: VNode[] = []

  const traverse = (nodes: VNodeArrayChildren) => {
    for (const child of nodes) {
      if (Array.isArray(child)) {
        traverse(child)
      } else if (isVNode(child)) {
        if (child.type === Fragment) {
          if (Array.isArray(child.children)) {
            traverse(child.children)
          }
        } else if (child.type !== Comment) {
          result.push(child)
        }
      }
    }
  }

  traverse(children)
  return result
}

const isString = (value: unknown): value is string => typeof value === 'string'

const resolveLabelContent = (node: VNode): string | VNode[] => {
  if (node.children && typeof node.children === 'object') {
    const labelSlot = (node.children as { label?: () => VNode[] }).label
    if (typeof labelSlot === 'function') {
      const labelNodes = labelSlot()
      if (labelNodes && labelNodes.length) return labelNodes
    }
  }
  return node.props?.label ?? ''
}

type RowCell = {
  vnode: VNode
  props: Record<string, any>
  span: number
  labelContent: string | VNode[]
}

const hasLabel = (cell: RowCell) => {
  if (isString(cell.labelContent)) return cell.labelContent.length > 0
  return cell.labelContent.length > 0
}

const rows = computed(() => {
    const children = slots.default?.()
    if (!children) return []

     const nodes = flattenChildren(children)
     const itemNodes = nodes.filter(() => true)

    const rowsArr: any[] = []
    let tempRow: any[] = []
    let count = computedColumn.value
    let totalSpan = 0 

    itemNodes.forEach((node) => {
      let itemSpan = node.props?.span || 1

      if (itemSpan > count) {
        itemSpan = count
      }

      if (totalSpan + itemSpan > count) {
        if (tempRow.length > 0) {
          const prevRest = count - totalSpan
          const lastItem = tempRow[tempRow.length - 1]
          lastItem.span += prevRest
          rowsArr.push(tempRow)
          tempRow = []
          totalSpan = 0
        }
      }

      const cell: RowCell = {
        vnode: node,
        props: node.props || {},
        span: itemSpan,
        labelContent: resolveLabelContent(node)
      }

      tempRow.push(cell)
      totalSpan += itemSpan
    })

    if (tempRow.length > 0) {
         const prevRest = count - totalSpan
         if (prevRest > 0) {
             const lastItem = tempRow[tempRow.length - 1]
             lastItem.span += prevRest
         }
         rowsArr.push(tempRow)
    }

    return rowsArr
})

</script>
