<template>
  <div class="menu-replica-container">
    <div class="menu-column" :style="{ width: collapsed2 ? '64px' : '240px' }">
        <!-- Column 2: Light, With Icons -->
        <amu-menu 
            style="border-right: 1px solid #e7e7e7; height: 100%; width: 100%" 
            :default-selected-keys="['2']"
            :show-collapse-button="true"
            v-model:collapsed="collapsed2"
        >
             <template #logo>
                <ReplicaLogo :collapsed="collapsed2" />
            </template>
            <amu-menu-item index="1"><template #icon><DashboardIcon /></template>系统总览</amu-menu-item>
            <amu-menu-item index="2"><template #icon><ServerIcon /></template>用户管理</amu-menu-item>
            <amu-sub-menu index="3" title="内容管理">
                <template #icon><FolderIcon /></template>
                <template #title>内容管理</template>
                <amu-menu-item index="3-1">文章管理</amu-menu-item>
                <amu-sub-menu index="3-2" title="媒体库">
                    <template #title>媒体库</template>
                     <amu-menu-item index="3-2-1">图片</amu-menu-item>
                     <amu-menu-item index="3-2-2">视频</amu-menu-item>
                </amu-sub-menu>
            </amu-sub-menu>
            <amu-menu-item index="4"><template #icon><BoxIcon /></template>任务调度</amu-menu-item>
            <amu-menu-item index="5"><template #icon><MonitorIcon /></template>监控告警</amu-menu-item>
            <amu-menu-item index="6"><template #icon><MailIcon /></template>消息中心</amu-menu-item>
            <amu-menu-item index="7"><template #icon><UserIcon /></template>个人设置</amu-menu-item>
            <amu-menu-item index="8"><template #icon><PlayIcon /></template>多媒体库</amu-menu-item>
            <amu-menu-item index="9"><template #icon><EditIcon /></template>系统配置</amu-menu-item>
        </amu-menu>
    </div>

    <div class="menu-column dark-col" :style="{ width: collapsed3 ? '64px' : '240px' }">
        <!-- Column 3: Dark, With Icons -->
         <amu-menu 
            theme="dark" 
            style="height: 100%; width: 100%" 
            :default-selected-keys="['1']"
            :show-collapse-button="true"
            v-model:collapsed="collapsed3"
         >
             <template #logo>
                <ReplicaLogo :dark="true" :collapsed="collapsed3" />
             </template>
            <amu-menu-item index="1"><template #icon><DashboardIcon /></template>系统总览</amu-menu-item>
            <amu-menu-item index="2"><template #icon><ServerIcon /></template>用户管理</amu-menu-item>
            <amu-sub-menu index="3" title="内容管理">
                <template #icon><FolderIcon /></template>
                <template #title>内容管理</template>
                <amu-menu-item index="3-1">文章管理</amu-menu-item>
                <amu-sub-menu index="3-2" title="媒体库">
                    <template #title>媒体库</template>
                     <amu-menu-item index="3-2-1">图片</amu-menu-item>
                     <amu-menu-item index="3-2-2">视频</amu-menu-item>
                </amu-sub-menu>
            </amu-sub-menu>
            <amu-menu-item index="4"><template #icon><BoxIcon /></template>任务调度</amu-menu-item>
            <amu-menu-item index="5"><template #icon><MonitorIcon /></template>监控告警</amu-menu-item>
            <amu-menu-item index="6"><template #icon><MailIcon /></template>消息中心</amu-menu-item>
            <amu-menu-item index="7"><template #icon><UserIcon /></template>个人设置</amu-menu-item>
            <amu-menu-item index="8"><template #icon><PlayIcon /></template>多媒体库</amu-menu-item>
            <amu-menu-item index="9"><template #icon><EditIcon /></template>系统配置</amu-menu-item>
        </amu-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { AmuMenu, AmuMenuItem, AmuSubMenu } from 'amu-ui/menu'

const collapsed1 = ref(false)
const collapsed2 = ref(false)
const collapsed3 = ref(false)

// Simple SVG Icons components
const createIcon = (d: string) => h('svg', { viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'currentColor' }, [h('path', { d })])

const DashboardIcon = () => createIcon('M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z')
const ServerIcon = () => createIcon('M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z')
const FolderIcon = () => createIcon('M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z')
const BoxIcon = () => createIcon('M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14h-2v-2h2v2zm0-4h-2V7h2v6z') 
const MonitorIcon = () => createIcon('M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z') 
const MailIcon = () => createIcon('M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z')
const UserIcon = () => createIcon('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z')
const PlayIcon = () => createIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z')
const EditIcon = () => createIcon('M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z')

const ReplicaLogo = (props: { dark?: boolean, collapsed?: boolean }) => h('div', { 
    style: { 
        display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', 
        color: props.dark ? '#fff' : '#000', letterSpacing: '-0.5px',
        justifyContent: props.collapsed ? 'center' : 'flex-start',
        width: '100%'
    } 
}, [
    h('span', { style: { color: '#0052d9', marginRight: props.collapsed ? '0' : '4px', fontSize: '24px' } }, 'A'),
    props.collapsed ? null : 'mu UI'
])
</script>

<style scoped>
.menu-replica-container {
    display: flex;
    gap: 40px;
    background: #f0f2f5;
    padding: 40px;
    overflow-x: auto;
    align-items: flex-start;
}

.menu-column {
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    height: 600px;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
}
.menu-column.dark-col {
    background: #232324;
}

/* Simulate the hover state for the screenshot replica */
:deep(.fake-hover) {
    background-color: var(--amu-menu-hover-bg) !important;
}
</style>
