<template>
  <div class="demo-section">
    <amu-checkbox v-model="checked1">
      <div class="custom-content">
        <span class="icon">📚</span>
        <div class="text">
          <div class="title">接受条款</div>
          <div class="desc">请仔细阅读并同意我们的服务条款</div>
        </div>
      </div>
    </amu-checkbox>

    <amu-checkbox v-model="checked2">
      <div class="custom-content">
        <span class="icon">🔔</span>
        <div class="text">
          <div class="title">接收通知</div>
          <div class="desc">允许我们向您发送重要的产品更新</div>
        </div>
      </div>
    </amu-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCheckbox } from 'amu-ui/checkbox'

const checked1 = ref(false)
const checked2 = ref(true)
</script>

<style scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.custom-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.icon {
  font-size: 24px;
  line-height: 1;
}

.text {
  flex: 1;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: var(--amu-text-color-primary);
  margin-bottom: 4px;
}

.desc {
  font-size: 12px;
  color: var(--amu-text-color-secondary);
  line-height: 1.5;
}
</style>
