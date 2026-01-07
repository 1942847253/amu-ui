<template>
  <AmuSpace>
    <AmuButton type="primary" @click="open">Show Message</AmuButton>
    <AmuButton type="primary" @click="openVNode">VNode Message</AmuButton>
  </AmuSpace>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { AmuMessage, AmuButton, AmuSpace } from 'amu-ui'

const open = () => {
  AmuMessage.info('This is a common message.')
}

const openVNode = () => {
  AmuMessage({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
</script>
