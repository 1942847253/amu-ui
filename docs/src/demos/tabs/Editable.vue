<template>
  <amu-tabs
    v-model="activeKey"
    type="editable-card"
    editable
    @edit="handleEdit"
  >
    <amu-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :name="pane.key"
      :title="pane.title"
      :closable="pane.closable"
    >
      {{ pane.content }}
    </amu-tab-pane>
  </amu-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeKey = ref('2')
const panes = ref([
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
])

const handleEdit = (targetKey: string | number | undefined, action: 'add' | 'remove') => {
  if (action === 'add') {
    add()
  } else if (action === 'remove' && targetKey) {
    remove(targetKey)
  }
}

const add = () => {
  const newActiveKey = `newTab${panes.value.length + 1}`
  panes.value.push({
    title: 'New Tab',
    content: 'Content of new Tab',
    key: newActiveKey,
  })
  activeKey.value = newActiveKey
}

const remove = (targetKey: string | number) => {
  let newActiveKey = activeKey.value
  let lastIndex = -1
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1
    }
  })
  
  const newPanes = panes.value.filter(pane => pane.key !== targetKey)
  
  if (newPanes.length && newActiveKey === targetKey) {
    if (lastIndex >= 0) {
      newActiveKey = newPanes[lastIndex].key
    } else {
      newActiveKey = newPanes[0].key
    }
  }
  
  panes.value = newPanes
  activeKey.value = newActiveKey
}
</script>
