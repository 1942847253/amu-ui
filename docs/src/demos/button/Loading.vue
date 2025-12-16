<template>
  <div class="demo-loading-sheet">
    <section>
      <h3>基础类型</h3>
      <div class="demo-row">
        <AmuButton
          type="primary"
          :loading="primaryLoading"
          @click="startPrimary"
          >Primary</AmuButton
        >
        <AmuButton
          type="default"
          :loading="defaultLoading"
          @click="startDefault"
          >Default</AmuButton
        >
        <AmuButton
          type="outline"
          :loading="outlineLoading"
          @click="startOutline"
          >Outline</AmuButton
        >
        <AmuButton type="text" :loading="textLoading" @click="startText"
          >Text</AmuButton
        >
      </div>
    </section>

    <section>
      <h3>带状态</h3>
      <div class="demo-row">
        <AmuButton
          status="warning"
          :loading="warningLoading"
          @click="startWarning"
          >Warning</AmuButton
        >
        <AmuButton status="danger" :loading="dangerLoading" @click="startDanger"
          >Danger</AmuButton
        >
        <AmuButton
          status="success"
          :loading="successLoading"
          @click="startSuccess"
          >Success</AmuButton
        >
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, type Ref } from "vue";
import { AmuButton } from "amu-ui";

type LoadingHandle = [Ref<boolean>, () => void];

const createLoading = (): LoadingHandle => {
  const loading = ref(false);
  let timer: ReturnType<typeof setTimeout> | null = null;

  const start = () => {
    if (loading.value) return;
    loading.value = true;
    timer = setTimeout(() => {
      loading.value = false;
      timer = null;
    }, 1200);
  };

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  });

  return [loading, start];
};

const [primaryLoading, startPrimary] = createLoading();
const [defaultLoading, startDefault] = createLoading();
const [outlineLoading, startOutline] = createLoading();
const [textLoading, startText] = createLoading();
const [warningLoading, startWarning] = createLoading();
const [dangerLoading, startDanger] = createLoading();
const [successLoading, startSuccess] = createLoading();
</script>

<style scoped>
.demo-loading-sheet {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

h3 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #4e5969;
}
</style>
