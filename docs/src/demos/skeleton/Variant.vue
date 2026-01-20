<template>
  <amu-space direction="vertical" fill>
    <amu-row :gutter="20">
      <amu-col :span="6">
        <p>Text (default)</p>
        <amu-skeleton>
          <template #template>
             <amu-skeleton-item variant="text" />
          </template>
        </amu-skeleton>
      </amu-col>
      <amu-col :span="6">
        <p>Image</p>
        <amu-skeleton>
          <template #template>
            <amu-skeleton-item variant="image" style="width: 100px; height: 100px;" />
          </template>
        </amu-skeleton>
      </amu-col>
      <amu-col :span="6">
        <p>Circle</p>
        <amu-skeleton>
          <template #template>
            <amu-skeleton-item variant="circle" />
          </template>
        </amu-skeleton>
      </amu-col>
      <amu-col :span="6">
        <p>Button</p>
        <amu-skeleton>
          <template #template>
           <amu-skeleton-item variant="button" />
          </template>
        </amu-skeleton>
      </amu-col>
    </amu-row>

    <amu-row :gutter="20" style="margin-top: 24px;">
      <amu-col :span="6">
        <p>Caption</p>
        <amu-skeleton>
          <template #template>
             <amu-skeleton-item variant="caption" style="width: 50%" />
          </template>
        </amu-skeleton>
      </amu-col>
      <amu-col :span="6">
        <p>H1</p>
        <amu-skeleton>
          <template #template>
            <amu-skeleton-item variant="h1" style="width: 80%" />
          </template>
        </amu-skeleton>
      </amu-col>
      <amu-col :span="6">
         <p>H3</p>
         <amu-skeleton>
          <template #template>
             <amu-skeleton-item variant="h3" style="width: 60%" />
          </template>
         </amu-skeleton>
      </amu-col>
    </amu-row>
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuSkeleton, AmuSkeletonItem, AmuSpace, AmuRow, AmuCol } from 'amu-ui'
</script>
