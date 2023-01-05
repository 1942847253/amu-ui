<template>
   <YButton @click="showDrawer1 = true" type="primary">Open Left</YButton>
   <YButton @click="showDrawer2 = true" type="primary">Open right</YButton>
   <YDrawer direction="left" title="Drawer1" v-model="showDrawer1" closeOnClickModal size="40%">
          <template #default>
            hello, I am there!
          </template>
          <!-- <template #footer>
            <YButton @click="onReset">取消</YButton>
            <YButton @click="onSubmit" type="primary">提交订单</YButton>
          </template> -->
   </YDrawer>
    <YDrawer title="Drawer2" v-model="showDrawer2" closeOnClickModal size="40%">
          <template #default>
            hello, I am there!
          </template>
          <!-- <template #footer>
            <YButton @click="onReset">取消</YButton>
            <YButton @click="onSubmit" type="primary">提交订单</YButton>
          </template> -->
   </YDrawer>
</template>

<script lang="ts" setup>import { reactive, ref } from 'vue';

const showDrawer1 = ref(false)
const showDrawer2 = ref(false)
</script>
