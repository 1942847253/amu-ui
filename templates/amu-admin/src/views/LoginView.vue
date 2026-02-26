<template>
  <div class="login-page">
    <AmuCard class="login-card">
      <template #title>登录 amu-admin</template>
      <AmuForm>
        <AmuFormItem label="账号">
          <AmuInput v-model="username" placeholder="请输入账号" />
        </AmuFormItem>
        <AmuFormItem label="密码">
          <AmuInput v-model="password" type="password" placeholder="请输入密码" />
        </AmuFormItem>
        <AmuButton type="primary" fill @click="handleLogin">登录</AmuButton>
      </AmuForm>
    </AmuCard>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui/button'
import { AmuCard } from 'amu-ui/card'
import { AmuForm, AmuFormItem } from 'amu-ui/form'
import { AmuInput } from 'amu-ui/input'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { usePermissionStore } from '../store/permission'

const username = ref('admin')
const password = ref('123456')

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const permissionStore = usePermissionStore()

const handleLogin = () => {
  const ok = authStore.login(username.value, password.value)
  if (!ok) return
  permissionStore.reset()
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
  router.replace(redirect)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--amu-color-bg-fill);
}

.login-card {
  width: 360px;
}
</style>
