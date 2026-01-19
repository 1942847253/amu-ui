<template>
  <amu-space>
    <amu-card hoverable style="width: 320px; overflow: hidden">
      <template #cover>
        <div class="card-cover-gradient"></div>
      </template>
      <amu-card-meta title="System Modernization">
        <template #description>
          <p class="meta-desc">
            Upgrade legacy systems to modern architecture using microservices and cloud-native technologies.
          </p>
        </template>
        <template #avatar>
          <div class="user-avatar">PM</div>
        </template>
      </amu-card-meta>
      <template #actions>
        <span class="action-item">👏 122</span>
        <span class="action-item">💬 34</span>
      </template>
    </amu-card>
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuCard, AmuCardMeta, AmuSpace } from 'amu-ui'
</script>

<style scoped>
.card-cover-gradient {
  height: 160px;
  background: linear-gradient(135deg, #165DFF 0%, #722ED1 100%);
}

.meta-desc {
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: var(--amu-color-bg-fill);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: var(--amu-color-text-default);
}

.action-item {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
</style>
