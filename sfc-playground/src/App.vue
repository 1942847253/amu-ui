<script setup lang="ts">
import { Repl } from '@vue/repl'
import { watchEffect } from 'vue'

import { ReplStore } from './store'
import Header from './Header.vue'



const store = new ReplStore({
  serializedState: location.hash.slice(1)
})


// persist state
watchEffect(() => history.replaceState({}, '', store.serialize()))
</script>

<template>
  <Header :store="store" />
  <Repl
    :store="store"
    :show-compile-output="true"
    :auto-resize="true"
    :clear-console="false"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  --base: #444;
  --nav-height: 50px;
}

.label{
  font-size: 14px !important;
}
.file.active{
  color: var(--a-primary-color) !important;
 
  border-bottom:3px solid var(--a-primary-color) !important;
}
.file:first-child{
  display: none !important;
}
.add{
  display: none;
}

.vue-repl {
  height: calc(100vh - 50px);
}
.CodeMirror-scroll{
  background-color: var(--a-bg-color);
}
.file-selector{
  background-color: var(--a-bg-color) !important;
}
.import-map-wrapper{
  background: var(--a-bg-color) !important;
  opacity: 0;
  pointer-events: none;
}
.tab-buttons{
  background: var(--a-bg-color) !important;
}
button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
