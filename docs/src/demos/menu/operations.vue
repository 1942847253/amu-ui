<template>
  <div class="menu-demo-operations">
    
    <h3 style="margin-bottom: 16px;">Light Theme (With Operations)</h3>
    <amu-menu 
        mode="horizontal" 
        :default-selected-keys="['2']" 
        style="box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
    >
        <template #logo>
             <div style="display: flex; align-items: center; font-weight: bold; font-size: 18px; color: var(--amu-color-text);">
                 <span style="color: var(--amu-color-primary); margin-right: 4px;">A</span>muUI
             </div>
        </template>
        
        <amu-menu-item index="1">Menu 1</amu-menu-item>
        <amu-menu-item index="2">Menu 2</amu-menu-item>
        <amu-menu-item index="3" disabled>Disabled</amu-menu-item>
        
        <template #operations>
            <div style="display: flex; align-items: center; gap: 16px; color: var(--amu-color-text-default);">
                 <!-- Search Icon -->
                 <button class="icon-btn"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
                 <!-- Mail Icon -->
                 <button class="icon-btn"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></button>
                 <!-- User Icon -->
                 <button class="icon-btn"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></button>
                 <!-- More Icon -->
                 <button class="icon-btn"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></button>
            </div>
        </template>
    </amu-menu>

    <h3 style="margin-top: 32px; margin-bottom: 16px;">Dark Theme</h3>
    <amu-menu 
        mode="horizontal" 
        theme="dark" 
        :default-selected-keys="['1']"
    >
        <template #logo>
             <div style="display: flex; align-items: center; font-weight: bold; font-size: 18px; color: #fff;">
                 <span style="color: var(--amu-color-primary); margin-right: 4px;">A</span>muUI
             </div>
        </template>
        
        <amu-menu-item index="1">Menu 1</amu-menu-item>
        <amu-menu-item index="2">Menu 2</amu-menu-item>
        <amu-menu-item index="3" disabled>Disabled</amu-menu-item>
        
        <template #operations>
            <div style="display: flex; align-items: center; gap: 16px; color: #fff;">
                 <button class="icon-btn icon-btn-dark"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
                 <button class="icon-btn icon-btn-dark"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></button>
                 <button class="icon-btn icon-btn-dark"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></button>
                 <button class="icon-btn icon-btn-dark"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></button>
            </div>
        </template>
    </amu-menu>
  </div>
</template>

<script setup lang="ts">
import { AmuMenu, AmuMenuItem } from 'amu-ui/menu'
</script>

<style scoped>
.icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    color: inherit;
    border-radius: 50%;
    transition: background-color 0.2s;
}
.icon-btn:hover {
    background-color: rgba(0,0,0,0.05);
}
.icon-btn-dark:hover {
    background-color: rgba(255,255,255,0.1);
}
</style>
