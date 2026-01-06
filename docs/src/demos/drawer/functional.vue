<template>
  <div>
    <AmuButton type="primary"  @click="openDrawer">Function Call</AmuButton>
  </div>
</template>

<script lang="ts" setup>
import { AmuDrawer, AmuButton } from 'amu-ui'
import { h } from 'vue'

const openDrawer = () => {
  AmuDrawer.open({
    title: 'Functional Drawer',
    placement: 'right',
    default: () => h('div', { style: 'padding: 20px;' }, [
      h('p', 'This is created by function call.'),
      h(AmuButton, { 
        onClick: () => console.log('clicked') 
      }, () => 'Action')
    ]),
    footer: () => h('div', 'Footer Content')
  })
}
</script>
