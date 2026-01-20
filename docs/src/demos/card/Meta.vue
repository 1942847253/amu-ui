<template>
  <amu-space>
    <amu-card hoverable style="width: 320px; overflow: hidden">
      <template #cover>
        <div class="card-cover-gradient"></div>
      </template>
      <amu-card-meta title="System Modernization">
        <template #description>
            Upgrade legacy systems to modern architecture using microservices and cloud-native technologies.
        </template>
        <template #avatar>
          <div class="user-avatar">PM</div>
        </template>
      </amu-card-meta>
      <template #actions>
        <span class="action-item"><amu-icon><IconThumbsUp /></amu-icon> 122</span>
        <span class="action-item"><amu-icon><IconMessageCircle /></amu-icon> 34</span>
        <span class="action-item"><amu-icon><IconShare2 /></amu-icon> Share</span>
      </template>
    </amu-card>
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuCard, AmuCardMeta, AmuSpace, AmuIcon } from 'amu-ui'
import { IconThumbsUp, IconMessageCircle, IconShare2 } from '@amu-ui/icons'
</script>

<style scoped>
.card-cover-gradient {
  height: 160px;
  background: linear-gradient(135deg, #165DFF 0%, #722ED1 100%);
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
  cursor: pointer;
  transition: color 0.2s;
}

.action-item:hover {
  color: var(--amu-color-primary);
}
</style>
