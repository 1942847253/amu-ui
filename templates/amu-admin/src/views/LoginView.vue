<template>
  <div class="login-container">
    <!-- 左侧品牌展示区 -->
    <div class="login-branding">
      <div class="branding-content">
        <div class="logo-area">
          <div class="logo-icon">A</div>
          <h1 class="logo-text">Amu Admin</h1>
        </div>
        
        <div class="illustration">
          <!-- 抽象科技感 SVG 插画 (适配浅色背景) -->
          <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="feature-svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#409eff" stop-opacity="0.2" />
                <stop offset="100%" stop-color="#409eff" stop-opacity="0.05" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stop-color="#409eff" stop-opacity="0.8" />
                 <stop offset="100%" stop-color="#337 ecc" stop-opacity="1" />
              </linearGradient>
            </defs>
            <!-- 背景卡片 -->
            <rect x="50" y="100" width="300" height="200" rx="10" fill="url(#grad1)" transform="rotate(-5 200 200)" />
            <rect x="80" y="80" width="300" height="200" rx="10" fill="url(#grad1)" transform="rotate(5 230 180)" />
            
            <!-- 主卡片 -->
            <rect x="100" y="50" width="320" height="220" rx="12" fill="#fff" stroke="#dcdfe6" stroke-width="1" style="filter: drop-shadow(0 8px 24px rgba(0,0,0,0.08));"/>
            
            <!-- 数据柱状图示意 -->
            <rect x="140" y="180" width="30" height="60" rx="4" fill="url(#grad2)" opacity="0.9"/>
            <rect x="190" y="140" width="30" height="100" rx="4" fill="url(#grad2)" opacity="0.7"/>
            <rect x="240" y="160" width="30" height="80" rx="4" fill="url(#grad2)" opacity="1"/>
            <rect x="290" y="100" width="30" height="140" rx="4" fill="url(#grad2)" opacity="0.8"/>
            <rect x="340" y="130" width="30" height="110" rx="4" fill="url(#grad2)" opacity="0.6"/>

            <!-- 装饰元素 -->
            <circle cx="380" cy="80" r="30" fill="#409eff" opacity="0.1" />
            <circle cx="120" cy="280" r="15" fill="#409eff" opacity="0.2" />
          </svg>
        </div>

        <div class="branding-text">
          <h2>开箱即用的企业级中台前端解决方案</h2>
          <p>基于 Vue 3 + TypeScript 构建，提供丰富的组件库与最佳实践</p>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单区 -->
    <div class="login-form-area">
      <div class="form-wrapper">
        <h2 class="welcome-title">欢迎登录</h2>
        <p class="welcome-desc">请输入您的管理员账号与密码</p>

        <AmuForm label-position="top" class="login-form">
          <AmuFormItem label="用户名">
            <AmuInput 
              v-model="username" 
              placeholder="admin" 
              size="large"
            >
              <template #prefix>
                <span class="icon-placeholder">👤</span>
              </template>
            </AmuInput>
          </AmuFormItem>
          
          <AmuFormItem label="密码">
            <AmuInput 
              v-model="password" 
              type="password" 
              placeholder="******" 
              size="large"
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <span class="icon-placeholder">🔒</span>
              </template>
            </AmuInput>
          </AmuFormItem>

          <div class="form-actions">
            <label class="remember-me">
              <input type="checkbox" /> 记住我
            </label>
            <a href="#" class="forgot-pwd">忘记密码？</a>
          </div>
          
          <AmuButton 
            type="primary" 
            size="large" 
            fill 
            :loading="loading"
            class="submit-btn"
            @click="handleLogin"
          >
            登 录
          </AmuButton>

          <div class="other-login">
            <div class="divider">其他登录方式</div>
            <div class="icon-group">
              <button class="icon-btn" title="手机登录">📱</button>
              <button class="icon-btn" title="微信登录">💬</button>
              <button class="icon-btn" title="Github">🐱</button>
            </div>
          </div>
        </AmuForm>
      </div>

      <div class="copyright">
        Copyright © 2024 Amu UI Team. All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui/button'
import { AmuForm, AmuFormItem } from 'amu-ui/form'
import { AmuInput } from 'amu-ui/input'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { usePermissionStore } from '../store/permission'

const username = ref('admin')
const password = ref('123456')
const loading = ref(false)

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const permissionStore = usePermissionStore()

const handleLogin = async () => {
  if (!username.value || !password.value) return
  
  loading.value = true
  try {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    const ok = authStore.login(username.value, password.value)
    if (!ok) return
    
    permissionStore.reset()
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    router.replace(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  background: var(--amu-color-bg-base);
  overflow: hidden;
}

/* 左侧品牌区 */
.login-branding {
  flex: 1;
  background: linear-gradient(135deg, #dae2f8 0%, #d6a4a4 100%); /* 兜底 */
  background: linear-gradient(135deg, #e3e8f3 0%, #cfd9e8 100%);
  /* 模拟图片中的浅色磨砂质感 */
  background: radial-gradient(circle at 10% 10%, #dbeafe 0%, #f0f2f5 60%, #ffffff 100%);
  color: var(--amu-color-text-title); /* 文字改为深色 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
}

/* 装饰背景圆 - 调整为更柔和的装饰 */
.login-branding::before {
  content: '';
  position: absolute;
  top: -10% ;
  left: -10%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 158, 255, 0.1) 0%, transparent 70%);
  filter: blur(40px);
}

.login-branding::after {
  content: '';
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 158, 255, 0.15) 0%, transparent 70%);
  filter: blur(40px);
}


.branding-content {
  position: relative;
  z-index: 2;
  max-width: 500px;
  width: 100%;
}

.logo-area {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--amu-color-primary) 0%, #2b32b2 100%);
  color: #fff;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-weight: bold;
  font-size: 24px;
  margin-right: 12px;
  box-shadow: 0 4px 10px rgba(var(--amu-color-primary-rgb), 0.3);
}

.logo-text {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
  color: var(--amu-color-text-title);
}

.illustration {
  margin: 40px 0;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.branding-text h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  line-height: 1.4;
  color: var(--amu-color-text-title);
}

.branding-text p {
  font-size: 16px;
  color: var(--amu-color-text-secondary);
  line-height: 1.6;
}

/* 右侧表单区 */
.login-form-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  position: relative;
  padding: 40px;
}

.form-wrapper {
  width: 100%;
  max-width: 420px;
}

.welcome-title {
  font-size: 32px;
  color: var(--amu-color-text-title);
  margin-bottom: 12px;
  font-weight: 700;
}

.welcome-desc {
  color: var(--amu-color-text-secondary);
  margin-bottom: 40px;
  font-size: 14px;
}

.login-form {
  --amu-form-item-margin-bottom: 24px;
}

.icon-placeholder {
  font-size: 16px;
  margin-right: 4px;
  opacity: 0.6;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--amu-color-text-secondary);
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.remember-me input {
  margin-right: 6px;
}

.forgot-pwd {
  color: var(--amu-color-primary);
  text-decoration: none;
}

.forgot-pwd:hover {
  text-decoration: underline;
}

.submit-btn {
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(var(--amu-color-primary-rgb), 0.2);
}

.other-login {
  margin-top: 40px;
  text-align: center;
}

.divider {
  display: block;
  font-size: 12px;
  color: var(--amu-color-text-disabled);
  margin-bottom: 16px;
  position: relative;
}

.divider::before, .divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%; /* 调整宽度避免覆盖文字 */
  height: 1px;
  background: var(--amu-color-border);
}

/* 临时修复伪元素定位没居中的问题，用 flex 更好 */
.other-login .divider {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--amu-color-text-disabled);
}

.other-login .divider::before,
.other-login .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--amu-color-border);
  position: static; /* reset absolute */
}

.other-login .divider::before { margin-right: 12px; }
.other-login .divider::after { margin-left: 12px; }


.icon-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--amu-color-border);
  background: var(--amu-color-bg-container);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s;
}

.icon-btn:hover {
  background: var(--amu-color-bg-container-hover);
  border-color: var(--amu-color-primary);
  transform: translateY(-2px);
}

.copyright {
  position: absolute;
  bottom: 24px;
  color: var(--amu-color-text-disabled);
  font-size: 12px;
}

@media (max-width: 900px) {
  .login-branding {
    display: none;
  }
}
</style>
