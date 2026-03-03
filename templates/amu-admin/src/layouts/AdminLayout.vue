<template>
  <div class="admin-layout" :class="{
    'admin-layout--content-fullscreen': isContentFullscreen,
    'admin-layout--sidebar-dark': appStore.isDark ? false : appStore.sidebarDark,
    'admin-layout--sidebar-child-dark': appStore.isDark ? false : appStore.sidebarChildDark,
    'admin-layout--header-dark': appStore.isDark ? false : appStore.headerDark,
    'admin-layout--content-only': !appStore.showSidebar || appStore.layoutMode === 'content-only',
    'admin-layout--fixed-content': appStore.contentWidth === 'fixed'
  }" :data-amu-theme="appStore.isDark ? 'dark' : undefined" :style="layoutStyle">
    <div v-if="shouldShowTopProgress" class="admin-layout__top-progress" :style="{ width: `${topProgress}%` }"></div>
    <aside v-if="appStore.showSidebar && appStore.layoutMode !== 'content-only'" class="admin-layout__aside"
      :class="{ 'is-collapsed': effectiveSidebarCollapsed }" @mouseenter="handleAsideMouseEnter"
      @mouseleave="handleAsideMouseLeave" :data-amu-theme="(appStore.isDark || appStore.sidebarDark) ? 'dark' : undefined">
      <AmuMenu mode="vertical" :theme="(appStore.isDark || appStore.sidebarDark) ? 'dark' : 'light'" trigger="click" :show-collapse-button="false" :collapsed="effectiveSidebarCollapsed"
        @update:collapsed="handleCollapsedChange" :selected-keys="[activeKey]" :open-keys="openKeys"
        @update:open-keys="handleOpenKeysChange" @select="handleMenuSelect">
        <template #logo>
          <div class="admin-layout__logo">
            <div class="admin-layout__logo-mark">
              A
            </div>
            <span v-show="!effectiveSidebarCollapsed" class="admin-layout__logo-text">Amu Admin</span>
          </div>
        </template>

        <template v-for="item in permissionStore.menuTree" :key="item.key">
          <AmuSubMenu v-if="item.children?.length" :index="item.key" :title="item.title">
            <template #icon>
              <AmuIcon>
                <component :is="resolveMenuIcon(item.key)" />
              </AmuIcon>
            </template>
            <AmuMenuItem v-for="child in item.children" :key="child.key" :index="child.key">
              <template #icon>
                <AmuIcon>
                  <component :is="resolveMenuIcon(child.key)" />
                </AmuIcon>
              </template>
              {{ translateRouteTitle(child.title) }}
            </AmuMenuItem>
          </AmuSubMenu>
          <AmuMenuItem v-else :index="item.key">
            <template #icon>
              <AmuIcon>
                <component :is="resolveMenuIcon(item.key)" />
              </AmuIcon>
            </template>
            {{ translateRouteTitle(item.title) }}
          </AmuMenuItem>
        </template>

      </AmuMenu>
    </aside>

    <main class="admin-layout__main">
      <header class="admin-layout__header" :data-amu-theme="(appStore.isDark || appStore.headerDark) ? 'dark' : undefined">
        <div class="admin-layout__header-left">
          <div v-if="appStore.layoutMode === 'horizontal'" class="admin-layout__header-logo">
            <div class="admin-layout__logo-mark">
              A
            </div>
            <span class="admin-layout__header-logo-text">amu-admin</span>
          </div>

          <div v-if="shouldShowMenuToggle && appStore.layoutMode !== 'horizontal'" class="admin-layout__header-icon"
            @click="appStore.sidebarCollapsed = !appStore.sidebarCollapsed">
            <AmuIcon>
              <IconMenu />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="handleRefresh">
            <AmuIcon :class="{ 'admin-layout__refresh-icon--spinning': isRefreshing }">
              <IconRefreshCw />
            </AmuIcon>
          </div>

          <AmuMenu v-if="appStore.layoutMode === 'horizontal'" mode="horizontal" class="admin-layout__horizontal-menu"
            :active-name="route.path" @select="handleMenuSelect">
            <template v-for="item in permissionStore.menuTree" :key="item.key">
              <AmuSubMenu v-if="item.children?.length" :index="item.key" :title="translateRouteTitle(item.title)">
                <template #icon>
                  <AmuIcon>
                    <component :is="resolveMenuIcon(item.key)" />
                  </AmuIcon>
                </template>
                <AmuMenuItem v-for="child in item.children" :key="child.key" :index="child.key">
                  <template #icon>
                    <AmuIcon>
                      <component :is="resolveMenuIcon(child.key)" />
                    </AmuIcon>
                  </template>
                  {{ translateRouteTitle(child.title) }}
                </AmuMenuItem>
              </AmuSubMenu>
              <AmuMenuItem v-else :index="item.key">
                <template #icon>
                  <AmuIcon>
                    <component :is="resolveMenuIcon(item.key)" />
                  </AmuIcon>
                </template>
                {{ translateRouteTitle(item.title) }}
              </AmuMenuItem>
            </template>
          </AmuMenu>

          <AmuBreadcrumb v-else separator=">">
            <AmuBreadcrumbItem v-for="crumb in breadcrumbs" :key="crumb.path">
              <div class="admin-layout__breadcrumb-item"
                :class="{ 'admin-layout__breadcrumb-item--clickable': isBreadcrumbClickable(crumb.path) }"
                @click="handleBreadcrumbClick(crumb.path)">
                <AmuIcon v-if="resolveMenuIcon(crumb.path)" :size="20">
                  <component :is="resolveMenuIcon(crumb.path)" />
                </AmuIcon>
                {{ translateRouteTitle(crumb.title) }}
              </div>
            </AmuBreadcrumbItem>
          </AmuBreadcrumb>
        </div>

        <div class="admin-layout__actions">
          <div class="admin-layout__search" @click="handleGlobalSearch">
            <AmuIcon class="admin-layout__search-icon">
              <IconSearch />
            </AmuIcon>
            <span class="admin-layout__search-text">{{ tx('搜索', 'Search') }}</span>
            <span v-if="shouldShowSearchShortcutTip" class="admin-layout__search-shortcut">Ctrl K</span>
          </div>

          <div class="admin-layout__header-icon" @click="openSettingsDrawer">
            <AmuIcon>
              <IconSettings />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="handleToggleDark">
            <AmuIcon>
              <component :is="appStore.isDark ? IconSun : IconMoon" />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="toggleLanguage">
            <AmuIcon>
              <IconGlobe />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="handleLockScreen">
            <AmuIcon>
              <IconClock />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="toggleFullscreen">
            <AmuIcon>
              <component :is="isContentFullscreen ? IconMinimize : IconMaximize" />
            </AmuIcon>
          </div>
          <AmuDropdown trigger="click" placement="bottom-end" overlay-class-name="admin-notification-dropdown">
            <template #trigger>
              <div class="admin-layout__header-icon admin-layout__header-icon--badge">
                <AmuIcon>
                  <IconBell />
                </AmuIcon>
                <span class="admin-layout__badge admin-layout__badge--blue" v-if="unreadNotificationsCount > 0"></span>
              </div>
            </template>
            <template #overlay>
              <div class="admin-notification">
                <div class="admin-notification__header">
                  <span class="admin-notification__title">{{ tx('通知', 'Notification') }}</span>
                  <AmuIcon class="admin-notification__envelope"><IconMail /></AmuIcon>
                </div>
                <div class="admin-notification__list">
                  <AmuScrollbar height="320px">
                    <div v-for="item in notificationOptions" :key="item.id" class="admin-notification__item" :class="{ 'is-read': item.isRead }">
                      <div class="admin-notification__avatar" :style="{ background: item.bgColor }">
                        {{ item.avatarText }}
                      </div>
                      <div class="admin-notification__content">
                        <div class="admin-notification__item-title">{{ item.title }}</div>
                        <div class="admin-notification__item-desc">{{ item.desc }}</div>
                        <div class="admin-notification__item-time">{{ item.time }}</div>
                      </div>
                      <div class="admin-notification__action">
                        <AmuIcon v-if="item.actionType === 'close' && !item.isRead" class="action-icon close-icon" @click.stop="handleNotificationAction(item)">
                          <IconXCircle />
                        </AmuIcon>
                        <AmuIcon v-else-if="item.actionType === 'check' && !item.isRead" class="action-icon check-icon" @click.stop="handleNotificationAction(item)">
                          <IconCheck />
                        </AmuIcon>
                        <span v-else class="admin-notification__dot"></span>
                      </div>
                    </div>
                    <div v-if="notificationOptions.every(item => item.isRead)" class="admin-notification__empty">
                      {{ tx('暂无新通知', 'No new notifications') }}
                    </div>
                  </AmuScrollbar>
                </div>
                <div class="admin-notification__footer">
                  <AmuButton type="text" @click="clearNotifications">{{ tx('清空', 'Clear') }}</AmuButton>
                  <AmuButton type="primary">{{ tx('查看所有消息', 'View All Messages') }}</AmuButton>
                </div>
              </div>
            </template>
          </AmuDropdown>

          <AmuDropdown trigger="click" placement="bottom-end" overlay-class-name="admin-user-dropdown-panel">
            <template #trigger>
              <div class="admin-layout__user-avatar">
                <img src="https://api.dicebear.com/7.x/micah/svg?seed=Felix" alt="avatar"
                  class="admin-layout__avatar-img" />
                <span class="admin-layout__badge admin-layout__badge--green"></span>
              </div>
            </template>
            <template #overlay>
              <div class="admin-user-menu">
                <div class="admin-user-menu__header">
                  <div class="admin-user-menu__avatar-wrap">
                    <img src="https://api.dicebear.com/7.x/micah/svg?seed=Felix" alt="avatar" class="admin-user-menu__avatar" />
                    <span class="admin-user-menu__status"></span>
                  </div>
                  <div class="admin-user-menu__info">
                    <div class="admin-user-menu__name">
                      {{ authStore.user?.username || tx('管理员', 'Admin') }}
                      <span class="admin-user-menu__tag">Pro</span>
                    </div>
                    <div class="admin-user-menu__email">admin@amu-ui.net</div>
                  </div>
                </div>
                <AmuDropdownMenu>
                  <AmuDropdownItem :icon="IconUser" @click="router.push('/profile')">{{ tx('个人中心', 'Personal Center') }}</AmuDropdownItem>
                  <AmuDropdownItem :icon="IconBook">{{ tx('开发文档', 'Documentation') }}</AmuDropdownItem>
                  <AmuDropdownItem :icon="IconGithub">{{ tx('代码仓库', 'GitHub Repo') }}</AmuDropdownItem>
                  <AmuDropdownItem :icon="IconHelpCircle">{{ tx('帮助与反馈', 'Help & Support') }}</AmuDropdownItem>
                  <AmuDropdownItem divided :icon="IconLock" @click="handleLockScreen" shortcut="Alt L">
                    {{ tx('锁定屏幕', 'Lock Screen') }}
                  </AmuDropdownItem>
                  <AmuDropdownItem :icon="IconLogOut" @click="handleLogout" shortcut="Alt Q">
                    {{ tx('退出系统', 'Log Out') }}
                  </AmuDropdownItem>
                </AmuDropdownMenu>
              </div>
            </template>
          </AmuDropdown>
        </div>
      </header>

      <section class="admin-layout__content">
        <div class="admin-layout__tabs-bar" :data-amu-theme="(appStore.isDark || appStore.headerDark) ? 'dark' : undefined">
          <Draggable v-model="draggableTabs" item-key="path" class="admin-layout__tabs" :animation="200"
            ghost-class="admin-layout__tab-ghost" chosen-class="admin-layout__tab-chosen"
            drag-class="admin-layout__tab-drag">
            <template #item="{ element: tab }">
              <div class="admin-layout__tab-item">
                <AmuTag :type="tab.path === activeKey ? 'primary' : 'default'" :closable="tab.closable"
                  @click="router.push(tab.path)" @close="handleCloseTab(tab.path)">
                  {{ translateRouteTitle(tab.title) }}
                </AmuTag>
              </div>
            </template>
          </Draggable>

          <div class="admin-layout__tabs-extra">
            <AmuDropdown trigger="click" placement="bottom-end" @select="handleCurrentTabCommand">
              <div class="admin-layout__tabs-extra-btn">
                <AmuIcon>
                  <IconChevronDown />
                </AmuIcon>
              </div>
              <template #overlay>
                <AmuDropdownMenu>
                  <AmuDropdownItem command="close-current" :icon="IconX" :disabled="!canCloseCurrentTab">
                    {{ tx('关闭', 'Close') }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="pin" :icon="IconMapPin" :disabled="isDashboardTab">
                    {{ isCurrentTabPinned ? tx('取消固定', 'Unpin') : tx('固定', 'Pin') }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="maximize" :icon="isContentFullscreen ? IconMinimize : IconMaximize">
                    {{ isContentFullscreen ? tx('还原', 'Restore') : tx('最大化', 'Maximize') }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="reload" :icon="IconRefreshCw">
                    {{ tx('重新加载', 'Reload') }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="new-window" :icon="IconExternalLink">
                    {{ tx('在新窗口打开', 'Open in new window') }}
                  </AmuDropdownItem>

                  <AmuDropdownItem divided command="close-left" :icon="IconArrowLeft" :disabled="!hasClosableLeftTabs">
                    {{ tx('关闭左侧标签页', 'Close left tabs') }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="close-right" :icon="IconArrowRight" :disabled="!hasClosableRightTabs">
                    {{ tx('关闭右侧标签页', 'Close right tabs') }}
                  </AmuDropdownItem>

                  <AmuDropdownItem divided command="close-others" :icon="IconXCircle" :disabled="!hasClosableOtherTabs">
                    {{ tx('关闭其它标签页', 'Close other tabs') }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="close-all" :icon="IconRepeat" :disabled="!hasClosableTabs">
                    {{ tx('关闭全部标签页', 'Close all tabs') }}
                  </AmuDropdownItem>
                </AmuDropdownMenu>
              </template>
            </AmuDropdown>
            <div class="admin-layout__tabs-extra-btn" @click="handleRefresh">
              <AmuIcon>
                <IconRefreshCw />
              </AmuIcon>
            </div>
            <div v-if="appStore.showPinButton" class="admin-layout__tabs-extra-btn" @click="toggleFullscreen">
              <AmuIcon>
                <component :is="isContentFullscreen ? IconMinimize : IconMaximize" />
              </AmuIcon>
            </div>
          </div>
        </div>

        <AmuScrollbar class="admin-layout__scrollbar">
          <div class="admin-layout__view">
            <RouterView v-slot="{ Component, route: currentRoute }">
              <Transition :name="viewTransitionName" mode="out-in">
                <KeepAlive :include="aliveCacheNames">
                  <component :is="Component" :key="`${currentRoute.fullPath}::${refreshViewKey}`" />
                </KeepAlive>
              </Transition>
            </RouterView>
          </div>
        </AmuScrollbar>
      </section>
    </main>

    <AmuLoading 
      :visible="appStore.pageLoading && isRouteLoading"
      :text="tx('页面加载中...', 'Loading page...')"
      fullscreen
      background="rgba(17, 24, 39, 0.1)"
    />

    <div v-if="appStore.watermark" class="admin-layout__watermark" :style="watermarkStyle"></div>

    <div v-if="isScreenLocked" class="admin-layout__lock-screen">
      <div class="admin-layout__lock-card">
        <div class="admin-layout__lock-title">{{ tx('屏幕已锁定', 'Screen Locked') }}</div>
        <div class="admin-layout__lock-time">{{ lockTimeText }}</div>
        <div class="admin-layout__lock-user">{{ authStore.user?.username || tx('访客', 'Guest') }}</div>
        <AmuButton type="primary" block @click="handleUnlockScreen">{{ tx('解锁', 'Unlock') }}</AmuButton>
      </div>
    </div>

    <AmuDrawer v-model="settingsDrawerVisible" placement="right" size="340px">
      <template #title>
        <div class="admin-settings__header-wrap">
          <AmuIcon size="18" color="var(--amu-color-primary)">
            <IconSettings />
          </AmuIcon>
          <span class="admin-settings__header-title">{{ tx('偏好配置中心', 'Preference Center') }}</span>
        </div>
      </template>

      <div class="admin-settings">
        <AmuTabs v-model="settingsTab" class="admin-settings__tabs">
          <AmuTabPane name="appearance" :title="tx('外观', 'Appearance')">
            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('色彩模式', 'Color Mode') }}</div>
              <div class="admin-settings__chip-group">
                <button class="admin-chip" :class="{ 'is-active': appStore.themeMode === 'light' }"
                  @click="appStore.themeMode = 'light'">
                  <AmuIcon>
                    <IconSun />
                  </AmuIcon> {{ tx('浅色', 'Light') }}
                </button>
                <button class="admin-chip" :class="{ 'is-active': appStore.themeMode === 'dark' }"
                  @click="appStore.themeMode = 'dark'">
                  <AmuIcon>
                    <IconMoon />
                  </AmuIcon> {{ tx('深色', 'Dark') }}
                </button>
                <button class="admin-chip" :class="{ 'is-active': appStore.themeMode === 'system' }"
                  @click="appStore.themeMode = 'system'">
                  <AmuIcon>
                    <IconMonitor />
                  </AmuIcon> {{ tx('跟随系统', 'System') }}
                </button>
              </div>

              <div class="admin-settings__switch-list">
                <div class="admin-settings__switch-item">
                  <span>{{ tx('深色侧边栏', 'Dark sidebar') }} <AmuIcon size="14" class="hint-icon">
                      <IconHelpCircle />
                    </AmuIcon></span>
                  <AmuSwitch v-model="appStore.sidebarDark" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('深色侧边栏子栏', 'Dark sidebar submenu') }} <AmuIcon size="14" class="hint-icon">
                      <IconHelpCircle />
                    </AmuIcon></span>
                  <AmuSwitch v-model="appStore.sidebarChildDark" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('深色顶栏', 'Dark header') }}</span>
                  <AmuSwitch v-model="appStore.headerDark" />
                </div>
              </div>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('主色调与视觉', 'Accent Color') }}</div>
              <div class="admin-settings__color-dots">
                <div v-for="item in colorPresetsList" :key="item.zh" class="admin-settings__color-dot-wrap"
                  :class="{ 'is-active': appStore.primaryColor === item.color }" :title="tx(item.zh, item.en)"
                  @click="item.color && selectPrimaryColor(item.color)">
                  <div class="admin-settings__color-dot" :style="{ backgroundColor: item.color || 'transparent' }">
                    <AmuIcon v-if="!item.color" size="14" color="var(--amu-color-text-secondary)">
                      <IconSettings />
                    </AmuIcon>
                    <AmuIcon v-if="appStore.primaryColor === item.color && item.color" size="12" color="#fff">
                      <IconCheck />
                    </AmuIcon>
                  </div>
                </div>
              </div>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('控件圆角', 'Border Radius') }}</div>
              <div class="admin-settings__radius-list">
                <button v-for="radius in radiusPresets" :key="radius" class="admin-settings__radius-item" type="button"
                  :class="{ 'is-active': appStore.radiusScale === radius }"
                  :style="{ borderRadius: `${radius * 12 + 2}px` }" @click="setRadiusScale(radius)">
                  <span class="radius-val" :style="{ transform: `scale(${1 - radius * 0.1})` }"></span>
                </button>
              </div>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('界面字号', 'Font Scale') }}</div>
              <div class="admin-settings__font-group">
                <div class="admin-settings__font-preview" :style="{ fontSize: `${appStore.fontSize}px` }">Aa</div>
                <div class="admin-settings__font-ctrl">
                  <button type="button" class="admin-settings__step-btn" @click="handleDecreaseFontSize">
                    <AmuIcon>
                      <IconMinus />
                    </AmuIcon>
                  </button>
                  <div class="admin-settings__font-val">{{ appStore.fontSize }}</div>
                  <button type="button" class="admin-settings__step-btn" @click="handleIncreaseFontSize">
                    <AmuIcon>
                      <IconPlus />
                    </AmuIcon>
                  </button>
                </div>
              </div>
            </div>
          </AmuTabPane>

          <AmuTabPane name="layout" :title="tx('布局', 'Layout')">
            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('布局视图', 'Layout Mode') }}</div>
              <div class="admin-settings__layout-list">
                <div v-for="item in layoutOptions" :key="item.key" class="admin-settings__layout-item"
                  :class="{ 'is-active': appStore.layoutMode === item.key }" @click="appStore.layoutMode = item.key"
                  :title="getLayoutOptionDesc(item.key)">
                  <div class="admin-settings__layout-skeleton" :class="`is-${item.key}`">
                    <div class="skeleton-header"></div>
                    <div class="skeleton-sidebar"></div>
                    <div class="skeleton-main"></div>
                  </div>
                  <div class="admin-settings__layout-title">{{ getLayoutOptionTitle(item.key) }}</div>
                </div>
              </div>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('内容宽度', 'Content Width') }}</div>
              <div class="admin-settings__chip-group">
                <button class="admin-chip" :class="{ 'is-active': appStore.contentWidth === 'fluid' }"
                  @click="appStore.contentWidth = 'fluid'">
                  <AmuIcon>
                    <IconMaximize />
                  </AmuIcon> {{ tx('流式', 'Fluid') }}
                </button>
                <button class="admin-chip" :class="{ 'is-active': appStore.contentWidth === 'fixed' }"
                  @click="appStore.contentWidth = 'fixed'">
                  <AmuIcon>
                    <IconMinimize />
                  </AmuIcon> {{ tx('定宽', 'Fixed') }}
                </button>
              </div>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('侧边栏体验', 'Sidebar Behavior') }}</div>
              <div class="admin-settings__switch-list">
                <div class="admin-settings__switch-item">
                  <span>{{ tx('显示侧边栏', 'Show sidebar') }}</span>
                  <AmuSwitch v-model="appStore.showSidebar" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('侧边栏手风琴', 'Sidebar accordion') }}</span>
                  <AmuSwitch v-model="appStore.sidebarAccordion" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('折叠菜单', 'Collapse menu') }}</span>
                  <AmuSwitch v-model="appStore.collapseMenu" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('鼠标悬停展开', 'Expand on hover') }}</span>
                  <AmuSwitch v-model="appStore.sidebarFixedWhenHover" :disabled="!appStore.collapseMenu" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('折叠显示菜单名', 'Show name when collapsed') }}</span>
                  <AmuSwitch v-model="appStore.showMixedChildMenu" :disabled="!appStore.collapseMenu" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('自动激活子菜单', 'Auto activate submenu') }}</span>
                  <AmuSwitch v-model="appStore.autoActivateFirstMenu" />
                </div>
              </div>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('辅助按钮', 'Affordance Buttons') }}</div>
              <div class="admin-settings__chip-group">
                <button type="button" class="admin-chip" :class="{ 'is-active': appStore.showCollapseButton }"
                  @click="appStore.showCollapseButton = !appStore.showCollapseButton">
                  <AmuIcon>
                    <IconMenu />
                  </AmuIcon>
                  {{ tx('折叠/展开', 'Collapse') }}
                </button>
                <button type="button" class="admin-chip" :class="{ 'is-active': appStore.showPinButton }"
                  @click="appStore.showPinButton = !appStore.showPinButton">
                  <AmuIcon>
                    <IconMapPin />
                  </AmuIcon>
                  {{ tx('固定', 'Pin') }}
                </button>
              </div>
            </div>
          </AmuTabPane>

          <AmuTabPane name="shortcuts" :title="tx('快捷键', 'Shortcuts')">
            <div class="admin-settings__section">
              <div class="admin-settings__switch-list">
                <div class="admin-settings__switch-item">
                  <span>{{ tx('启用快捷键', 'Enable shortcuts') }}</span>
                  <AmuSwitch v-model="appStore.enableShortcut" />
                </div>
              </div>
            </div>

            <div class="admin-settings__section" :class="{ 'is-disabled': !appStore.enableShortcut }">
              <div class="admin-settings__switch-list">
                <div class="admin-settings__switch-item">
                  <span>{{ tx('全局搜索', 'Global search') }} <em>Ctrl K</em></span>
                  <AmuSwitch v-model="appStore.enableSearchShortcut" :disabled="!appStore.enableShortcut" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('退出登录', 'Logout') }} <em>Alt Q</em></span>
                  <AmuSwitch v-model="appStore.enableLogoutShortcut" :disabled="!appStore.enableShortcut" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('锁定屏幕', 'Lock screen') }} <em>Alt L</em></span>
                  <AmuSwitch v-model="appStore.enableLockShortcut" :disabled="!appStore.enableShortcut" />
                </div>
              </div>
            </div>
          </AmuTabPane>

          <AmuTabPane name="common" :title="tx('通用', 'Common')">
            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('语言系统', 'Language') }}</div>
              <AmuSelect v-model="appStore.language" style="width: 100%">
                <AmuOption :label="tx('简体中文 (zh-CN)', 'Chinese (Simplified)')" value="zh-CN" />
                <AmuOption :label="tx('English (en-US)', 'English (US)')" value="en-US" />
              </AmuSelect>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('辅助系统', 'Utilities') }}</div>
              <div class="admin-settings__switch-list">
                <div class="admin-settings__switch-item">
                  <span>{{ tx('动态标题', 'Dynamic title') }}</span>
                  <AmuSwitch v-model="appStore.dynamicTitle" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('水印', 'Watermark') }}</span>
                  <AmuSwitch v-model="appStore.watermark" />
                </div>
                <div class="admin-settings__switch-item">
                  <span>{{ tx('定时检查更新', 'Auto check updates') }}</span>
                  <AmuSwitch v-model="appStore.autoCheckUpdates" />
                </div>
              </div>
              <div class="admin-settings__hint" v-if="appStore.autoCheckUpdates">{{ updateStatusText }}</div>
            </div>

            <div class="admin-settings__section">
              <div class="admin-settings__label">{{ tx('过渡动画', 'Animations') }}</div>
              <div class="admin-settings__switch-list">
                <div class="admin-settings__switch-item admin-settings__switch-item--compact">
                  <span>{{ tx('加载进度条', 'Route progress bar') }}</span>
                  <AmuSwitch v-model="appStore.pageTransitionProgress" />
                </div>
                <div class="admin-settings__switch-item admin-settings__switch-item--compact">
                  <span>{{ tx('页面切换 Loading', 'Route loading') }}</span>
                  <AmuSwitch v-model="appStore.pageLoading" />
                </div>
                <div class="admin-settings__switch-item admin-settings__switch-item--compact">
                  <span>{{ tx('页面切换动画', 'Route transition') }}</span>
                  <AmuSwitch v-model="appStore.pageTransition" />
                </div>
              </div>

              <div class="admin-settings__switch-item admin-settings__switch-item--compact"
                :class="{ 'is-disabled': !appStore.pageTransition }" style="margin-top: 12px;">
                <span>{{ tx('动画特效', 'Transition preset') }}</span>
                <AmuSelect v-model="appStore.transitionPreset" style="width: 140px;"
                  :disabled="!appStore.pageTransition">
                  <AmuOption v-for="item in transitionOptions" :key="item.key"
                    :label="getTransitionOptionTitle(item.key)" :value="item.key" />
                </AmuSelect>
              </div>
            </div>
          </AmuTabPane>
        </AmuTabs>

        <div class="admin-settings__footer">
          <button type="button" class="admin-btn-action is-primary" @click="handleCopyPreferences">
            <AmuIcon>
              <IconCopy />
            </AmuIcon>
            {{ tx('序列化配置', 'Serialize Settings') }}
          </button>
          <button type="button" class="admin-btn-action is-danger" @click="handleResetAndLogout">
            <AmuIcon>
              <IconRefreshCw />
            </AmuIcon>
            {{ tx('恢复默认值', 'Restore Defaults') }}
          </button>
          <span v-if="copyFeedback" class="admin-settings__feedback">{{ copyFeedback }}</span>
        </div>
      </div>
    </AmuDrawer>

    <AmuDialog
      v-model="searchVisible"
      :width="600"
      type="custom"
      :class="'admin-search-dialog'"
    >
      <template #header>
        <span style="display: none;"></span>
      </template>
      <div class="admin-search">
        <div class="admin-search__input-wrapper">
          <AmuInput
            ref="searchInputRef"
            v-model="searchKeyword"
            :placeholder="tx('搜索页面...', 'Search pages...')"
            clearable
            size="large"
            @keydown="handleSearchKeydown"
          >
            <template #prefix>
              <AmuIcon><IconSearch /></AmuIcon>
            </template>
          </AmuInput>
        </div>
        <div class="admin-search__result">
          <AmuScrollbar height="340px">
            <template v-if="searchResult.length > 0">
              <div
                v-for="(item, index) in searchResult"
                :key="item.key"
                class="admin-search__item"
                :class="{ 'is-active': index === searchSelectedIndex }"
                @click="handleSearchSelect(item)"
                @mouseenter="searchSelectedIndex = index"
              >
                <div class="admin-search__item-icon">
                  <AmuIcon><IconFolder /></AmuIcon>
                </div>
                <div class="admin-search__item-info">
                  <div class="admin-search__item-title">{{ item.title }}</div>
                  <div class="admin-search__item-path">{{ item.key }}</div>
                </div>
                <div class="admin-search__item-enter">
                  <AmuIcon><IconArrowRight /></AmuIcon>
                </div>
              </div>
            </template>
            <div v-else-if="searchKeyword.trim()" class="admin-search__empty">
              <AmuIcon style="font-size: 48px; color: var(--amu-color-text-tertiary); margin-bottom: 16px"><IconSearch /></AmuIcon>
              <div>{{ tx('暂无匹配结果', 'No matching results') }}</div>
            </div>
            <div v-else class="admin-search__empty">
              <AmuIcon style="font-size: 48px; color: var(--amu-color-text-tertiary); margin-bottom: 16px"><IconSearch /></AmuIcon>
              <div>{{ tx('输入页面名称或路径进行搜索', 'Enter page name or path to search') }}</div>
            </div>
          </AmuScrollbar>
        </div>
      </div>
    </AmuDialog>
  </div>
</template>

<script setup lang="ts">
import { AmuBreadcrumb, AmuBreadcrumbItem } from 'amu-ui/breadcrumb'
import { AmuMenu, AmuMenuItem, AmuSubMenu } from 'amu-ui/menu'
import { AmuScrollbar } from 'amu-ui/scrollbar'
import { AmuTag } from 'amu-ui/tag'
import { AmuIcon } from 'amu-ui/icon'
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem } from 'amu-ui/dropdown'
import { AmuDrawer } from 'amu-ui/drawer'
import { AmuTabs, AmuTabPane } from 'amu-ui/tabs'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuRadioGroup, AmuRadioButton } from 'amu-ui/radio'
import { AmuSelect, AmuOption } from 'amu-ui/select'
import { AmuButton } from 'amu-ui/button'
import { AmuDialog } from 'amu-ui/dialog'
import { AmuInput } from 'amu-ui/input'
import { AmuLoading } from 'amu-ui/loading'
import {
  IconMenu,
  IconRefreshCw,
  IconSearch,
  IconSettings,
  IconMoon,
  IconSun,
  IconGlobe,
  IconClock,
  IconMaximize,
  IconMinimize,
  IconBell,
  IconFolder,
  IconUser,
  IconUsers,
  IconShield,
  IconBarChart,
  IconMonitor,
  IconMinus,
  IconPlus,
  IconX,
  IconMapPin,
  IconExternalLink,
  IconArrowLeft,
  IconArrowRight,
  IconXCircle,
  IconRepeat,
  IconChevronDown,
  IconCheck,
  IconHelpCircle,
  IconCopy,
  IconMail,
  IconBook,
  IconGithub,
  IconLock,
  IconLogOut
} from '@amu-ui/icons'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import { useAuthStore } from '../store/auth'
import { useAppStore } from '../store/app'
import type { LayoutMode, TransitionPreset } from '../store/app'
import { usePermissionStore } from '../store/permission'
import type { MenuNode } from '../store/permission'
import { useTabsStore } from '../store/tabs'

let refreshProgressTimer: number | null = null
let routeProgressTimer: number | null = null
let lockClockTimer: number | null = null
let autoCheckUpdateTimer: number | null = null

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const tabsStore = useTabsStore()
const isRefreshing = ref(false)
const isContentFullscreen = ref(false)
const refreshProgress = ref(0)
const routeProgress = ref(0)
const isRouteLoading = ref(false)
const refreshViewKey = ref(0)
const refreshingCacheName = ref<string | null>(null)
const isAsideHoverExpanded = ref(false)
const isScreenLocked = ref(false)

const notificationOptions = ref([
  {
    id: 1,
    bgColor: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    avatarText: 'Sys',
    title: '系统安全运行报告',
    desc: '系统已经连续无故障运行超过 30 天，各项指标正常。',
    time: '10分钟前',
    actionType: 'close',
    isRead: false
  },
  {
    id: 2,
    bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    avatarText: '审',
    title: '有新的费用报销单待审批',
    desc: '研发部李四提交了差旅费报销单件，请及时处理以免逾期。',
    time: '45分钟前',
    actionType: 'check',
    isRead: false
  },
  {
    id: 3,
    bgColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    avatarText: '群',
    title: '后台管理系统更新公告',
    desc: 'v2.1.0 版本已成功发布，新增了图表大屏和主题切换功能。',
    time: '2小时前',
    actionType: 'check',
    isRead: false
  },
  {
    id: 4,
    bgColor: 'linear-gradient(135deg, #ec4899 0%, #e11d48 100%)',
    avatarText: '安',
    title: '异地登录拦截提醒',
    desc: '检测到您的账号存在异常登录尝试，已自动开启安全保护。',
    time: '昨天',
    actionType: 'check',
    isRead: false
  }
])

const unreadNotificationsCount = computed(() => {
  return notificationOptions.value.filter(item => !item.isRead).length
})

const handleNotificationAction = (item: any) => {
  item.isRead = true
}

const clearNotifications = () => {
  notificationOptions.value.forEach(item => item.isRead = true)
}
const lockTimeText = ref('')
const updateStatus = ref<'idle' | 'checking' | 'latest' | 'available' | 'failed'>('idle')
const latestVersion = ref('')
const updateError = ref('')
const lastCheckedAt = ref<number | null>(null)
const settingsDrawerVisible = ref(false)
const settingsTab = ref<'appearance' | 'layout' | 'shortcuts' | 'common'>('appearance')
const copyFeedback = ref('')

const colorPresetsList = [
  { color: '#1677ff', zh: '默认', en: 'Default' },
  { color: '#722ed1', zh: '紫罗兰', en: 'Violet' },
  { color: '#eb2f96', zh: '樱花粉', en: 'Pink' },
  { color: '#fadb14', zh: '柠檬黄', en: 'Yellow' },
  { color: '#13c2c2', zh: '天蓝色', en: 'Sky Blue' },
  { color: '#52c41a', zh: '浅绿色', en: 'Green' },
  { color: '#595959', zh: '锌色灰', en: 'Zinc' },
  { color: '#009688', zh: '深绿色', en: 'Teal' },
  { color: '#0050b3', zh: '深蓝色', en: 'Dark Blue' },
  { color: '#fa8c16', zh: '橙黄色', en: 'Orange' },
  { color: '#f5222d', zh: '玫瑰红', en: 'Rose' },
  { color: '#434343', zh: '中性色', en: 'Neutral' },
  { color: '#262626', zh: '石板灰', en: 'Slate' },
  { color: '#1f1f1f', zh: '中灰色', en: 'Mid Gray' },
  { color: '', zh: '自定义', en: 'Custom' }
]

const radiusPresets = [0, 0.25, 0.5, 0.75, 1]

const layoutOptions: Array<{ key: LayoutMode }> = [
  { key: 'vertical' },
  { key: 'horizontal' },
  { key: 'content-only' }
]

const transitionOptions: Array<{ key: TransitionPreset }> = [
  { key: 'fade' },
  { key: 'slide' },
  { key: 'zoom' },
  { key: 'none' }
]

const APP_VERSION = '0.1.0'

const tx = (zh: string, en: string) => {
  return appStore.language === 'en-US' ? en : zh
}

const getLayoutOptionTitle = (key: LayoutMode) => {
  if (key === 'vertical') return tx('垂直', 'Vertical')
  if (key === 'double-column') return tx('双列', 'Double Column')
  if (key === 'horizontal') return tx('水平', 'Horizontal')
  if (key === 'mixed-nav') return tx('侧边导航', 'Mixed Nav')
  if (key === 'mixed-column') return tx('混合双列', 'Mixed Column')
  return tx('内容全屏', 'Content Only')
}

const getLayoutOptionDesc = (key: LayoutMode) => {
  if (key === 'vertical') return tx('经典左侧导航', 'Classic left sidebar')
  if (key === 'double-column') return tx('双列组合布局', 'Two-column mixed layout')
  if (key === 'horizontal') return tx('顶部菜单布局', 'Top menu layout')
  if (key === 'mixed-nav') return tx('侧边 + 顶部', 'Sidebar + top navigation')
  if (key === 'mixed-column') return tx('双列混合布局', 'Mixed double-column layout')
  return tx('隐藏侧栏区域', 'Hide sidebar region')
}

const getTransitionOptionTitle = (key: TransitionPreset) => {
  if (key === 'fade') return tx('淡入', 'Fade')
  if (key === 'slide') return tx('滑动', 'Slide')
  if (key === 'zoom') return tx('缩放', 'Zoom')
  return tx('无动画', 'None')
}

const layoutStyle = computed(() => {
  const shouldShowAside = appStore.showSidebar && !['content-only', 'horizontal'].includes(appStore.layoutMode) && !isContentFullscreen.value
  const asideWidth = shouldShowAside ? (effectiveSidebarCollapsed.value ? '72px' : '240px') : '0px'
  return {
    '--admin-aside-width': asideWidth,
    '--admin-primary-color': appStore.primaryColor,
    '--admin-font-size': `${appStore.fontSize}px`,
    '--admin-radius-scale': String(appStore.radiusScale),
    '--admin-content-max-width': appStore.contentWidth === 'fixed' ? '1200px' : '100%'
  }
})

const effectiveSidebarCollapsed = computed(() => {
  if (!appStore.collapseMenu) return false
  if (isAsideHoverExpanded.value && appStore.sidebarFixedWhenHover) return false
  if (appStore.showMixedChildMenu) return false
  return appStore.sidebarCollapsed
})

const topProgress = computed(() => {
  return Math.max(refreshProgress.value, routeProgress.value)
})

const shouldShowTopProgress = computed(() => {
  return topProgress.value > 0
})

const watermarkStyle = computed(() => {
  const title = appStore.language === 'en-US' ? 'AMU ADMIN' : '阿木后台'
  const stamp = new Date().toLocaleDateString()
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='140'><g transform='rotate(-18 110 70)'><text x='18' y='68' fill='rgba(120,120,120,0.14)' font-size='16' font-family='sans-serif'>${title}</text><text x='18' y='96' fill='rgba(120,120,120,0.11)' font-size='12' font-family='sans-serif'>${stamp}</text></g></svg>`
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  }
})

const shouldShowMenuToggle = computed(() => {
  return appStore.collapseMenu && appStore.showCollapseButton && appStore.showSidebar && appStore.layoutMode !== 'content-only'
})

const shouldShowSearchShortcutTip = computed(() => {
  return appStore.enableShortcut && appStore.enableSearchShortcut
})

const updateLockTime = () => {
  const now = new Date()
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')
  const second = String(now.getSeconds()).padStart(2, '0')
  lockTimeText.value = `${hour}:${minute}:${second}`
}

const findFirstLeafPath = (nodes: MenuNode[]): string | null => {
  for (const node of nodes) {
    if (node.children?.length) {
      const childPath = findFirstLeafPath(node.children)
      if (childPath) return childPath
      continue
    }
    return node.key
  }
  return null
}

const flattenMenuNodes = (nodes: MenuNode[]): MenuNode[] => {
  return nodes.flatMap((node) => {
    if (!node.children?.length) return [node]
    return flattenMenuNodes(node.children)
  })
}

const selectPrimaryColor = (color: string) => {
  appStore.primaryColor = color
}

const setRadiusScale = (radius: number) => {
  appStore.radiusScale = radius
}

const handleDecreaseFontSize = () => {
  appStore.fontSize = Math.max(12, appStore.fontSize - 1)
}

const handleIncreaseFontSize = () => {
  appStore.fontSize = Math.min(20, appStore.fontSize + 1)
}

const openSettingsDrawer = () => {
  settingsDrawerVisible.value = true
}

const handleToggleDark = () => {
  appStore.toggleDark()
}

const toggleLanguage = () => {
  appStore.language = appStore.language === 'zh-CN' ? 'en-US' : 'zh-CN'
}

const routeTitleEnMap: Record<string, string> = {
  登录: 'Login',
  无权限: 'Forbidden',
  视图: 'View',
  工作台: 'Workplace',
  仪表盘: 'Dashboard',
  系统管理: 'System',
  用户管理: 'Users',
  角色管理: 'Roles',
  鉴权自测: 'Auth Debug',
  个人中心: 'Personal Center',
  页面不存在: 'Not Found'
}

const translateRouteTitle = (title: string) => {
  if (appStore.language === 'zh-CN') return title
  return routeTitleEnMap[title] || title
}

const formatVersionTime = (time: number) => {
  const date = new Date(time)
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${hour}:${minute}`
}

const compareVersions = (currentVersion: string, targetVersion: string) => {
  const current = currentVersion.split('.').map((item) => Number(item) || 0)
  const target = targetVersion.split('.').map((item) => Number(item) || 0)
  const maxLen = Math.max(current.length, target.length)

  for (let index = 0; index < maxLen; index += 1) {
    const cur = current[index] || 0
    const tar = target[index] || 0
    if (tar > cur) return 1
    if (tar < cur) return -1
  }

  return 0
}

const updateStatusText = computed(() => {
  if (updateStatus.value === 'checking') {
    return tx('正在检查更新...', 'Checking updates...')
  }

  if (updateStatus.value === 'available') {
    const checked = lastCheckedAt.value ? formatVersionTime(lastCheckedAt.value) : '--:--'
    return tx(`发现新版本 ${latestVersion.value}（${checked}）`, `New version ${latestVersion.value} found (${checked})`)
  }

  if (updateStatus.value === 'latest') {
    const checked = lastCheckedAt.value ? formatVersionTime(lastCheckedAt.value) : '--:--'
    return tx(`已是最新版本（${checked}）`, `Already latest (${checked})`)
  }

  if (updateStatus.value === 'failed') {
    return tx(`检查失败：${updateError.value || '网络异常'}`, `Check failed: ${updateError.value || 'network error'}`)
  }

  return tx('开启后将自动检查更新', 'Enable to check updates automatically')
})

const syncDocumentTitle = () => {
  if (!appStore.dynamicTitle) {
    document.title = 'amu-admin'
    return
  }

  const rawTitle = typeof route.meta.title === 'string' ? route.meta.title : 'amu-admin'
  const localizedTitle = appStore.language === 'en-US' ? (routeTitleEnMap[rawTitle] || rawTitle) : rawTitle
  document.title = `${localizedTitle} - amu-admin`
}

const handleCopyPreferences = async () => {
  const text = JSON.stringify(appStore.preferenceSnapshot, null, 2)
  try {
    await navigator.clipboard.writeText(text)
    copyFeedback.value = tx('已复制偏好设置', 'Preferences copied')
  } catch {
    copyFeedback.value = tx('复制失败，请检查浏览器权限', 'Copy failed, please check browser permission')
  }

  window.setTimeout(() => {
    copyFeedback.value = ''
  }, 1800)
}

const clearAutoCheckUpdateTimer = () => {
  if (autoCheckUpdateTimer === null) return
  window.clearInterval(autoCheckUpdateTimer)
  autoCheckUpdateTimer = null
}

const checkForUpdates = async () => {
  updateStatus.value = 'checking'
  updateError.value = ''

  try {
    const response = await fetch(`/version.json?t=${Date.now()}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = (await response.json()) as { version?: unknown }
    const nextVersion = typeof payload.version === 'string' ? payload.version : APP_VERSION
    lastCheckedAt.value = Date.now()

    if (compareVersions(APP_VERSION, nextVersion) > 0) {
      updateStatus.value = 'available'
      latestVersion.value = nextVersion
      return
    }

    if (compareVersions(APP_VERSION, nextVersion) < 0) {
      updateStatus.value = 'latest'
      latestVersion.value = APP_VERSION
      return
    }

    updateStatus.value = 'latest'
    latestVersion.value = nextVersion
  } catch (error) {
    updateStatus.value = 'failed'
    updateError.value = error instanceof Error ? error.message : 'unknown'
  }
}

const startAutoCheckUpdates = () => {
  clearAutoCheckUpdateTimer()
  void checkForUpdates()
  autoCheckUpdateTimer = window.setInterval(() => {
    void checkForUpdates()
  }, 3 * 60 * 1000)
}

const handleResetAndLogout = () => {
  appStore.resetPreferences()
  appStore.clearPreferenceStorage()
  handleLogout()
}

const handleAsideMouseEnter = () => {
  if (!appStore.sidebarFixedWhenHover) return
  if (!appStore.sidebarCollapsed || !appStore.collapseMenu) return
  isAsideHoverExpanded.value = true
}

const handleAsideMouseLeave = () => {
  if (!appStore.sidebarFixedWhenHover) return
  isAsideHoverExpanded.value = false
}

const searchVisible = ref(false)
const searchKeyword = ref('')
const searchSelectedIndex = ref(0)
const searchInputRef = ref<any>(null)

const searchResult = computed(() => {
  if (!searchKeyword.value.trim()) return []
  const normalized = searchKeyword.value.trim().toLowerCase()
  const candidates = flattenMenuNodes(permissionStore.menuTree)
  return candidates.filter((item) => {
    const titleMatched = item.title.toLowerCase().includes(normalized)
    const pathMatched = item.key.toLowerCase().includes(normalized)
    return titleMatched || pathMatched
  })
})

watch(searchKeyword, () => {
  searchSelectedIndex.value = 0
})

const handleSearchSelect = (item: any) => {
  router.push(item.key)
  searchVisible.value = false
}

const handleSearchKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (searchSelectedIndex.value < searchResult.value.length - 1) {
      searchSelectedIndex.value++
    } else {
      searchSelectedIndex.value = 0
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (searchSelectedIndex.value > 0) {
      searchSelectedIndex.value--
    } else {
      searchSelectedIndex.value = searchResult.value.length - 1
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (searchResult.value.length > 0) {
      handleSearchSelect(searchResult.value[searchSelectedIndex.value])
    }
  }
}

const handleGlobalSearch = () => {
  searchVisible.value = true
  searchKeyword.value = ''
  searchSelectedIndex.value = 0
  nextTick(() => {
    setTimeout(() => {
      searchInputRef.value?.focus?.()
      const inputEl = document.querySelector('.admin-search-dialog .amu-input__inner') as HTMLInputElement
      if (inputEl) {
        inputEl.focus()
      }
    }, 100)
  })
}

const handleLockScreen = () => {
  isScreenLocked.value = true
  updateLockTime()
  if (lockClockTimer !== null) window.clearInterval(lockClockTimer)
  lockClockTimer = window.setInterval(updateLockTime, 1000)
}

const handleUnlockScreen = () => {
  isScreenLocked.value = false
  if (lockClockTimer === null) return
  window.clearInterval(lockClockTimer)
  lockClockTimer = null
}

const menuIconMap: Record<string, Component> = {
  '/workplace': IconMonitor,
  '/dashboard': IconBarChart,
  '/system': IconFolder,
  '/system/users': IconUser,
  '/system/roles': IconUsers,
  '/system/auth-debug': IconShield
}

const resolveMenuIcon = (key: string) => {
  if (key in menuIconMap) return menuIconMap[key]
  if (key.includes('analysis')) return IconBarChart
  return IconFolder
}

const activeKey = computed(() => route.path)
const openKeys = ref<string[]>([])

watch(
  () => route.path,
  (path) => {
    const segments = path.split('/').filter(Boolean)
    if (segments.length > 1) {
      openKeys.value = [`/${segments[0]}`]
      return
    }

    const firstGroup = permissionStore.menuTree.find((item) => item.children?.length)
    openKeys.value = firstGroup ? [firstGroup.key] : []
  },
  { immediate: true }
)

watch(
  () => route.fullPath,
  () => {
    if (route.path === '/login' || route.path === '/403') return
    tabsStore.upsertTab({
      path: route.fullPath,
      title: route.meta.title || String(route.name || route.fullPath),
      name: route.name ? String(route.name) : undefined,
      closable: route.path !== '/dashboard',
      keepAlive: Boolean(route.meta.keepAlive)
    })
  },
  { immediate: true }
)

watch(
  [() => route.fullPath, () => appStore.dynamicTitle, () => appStore.language],
  () => {
    syncDocumentTitle()
  },
  { immediate: true }
)

watch(
  () => appStore.autoCheckUpdates,
  (enabled) => {
    if (!enabled) {
      clearAutoCheckUpdateTimer()
      if (updateStatus.value === 'checking') {
        updateStatus.value = 'idle'
      }
      return
    }

    startAutoCheckUpdates()
  },
  { immediate: true }
)

const breadcrumbs = computed(() => {
  return route.matched
    .filter((item) => item.meta?.title && item.path !== '/')
    .map((item) => ({
      path: item.path,
      title: item.meta.title || String(item.name || item.path)
    }))
})

const aliveCacheNames = computed(() => {
  if (!refreshingCacheName.value) return tabsStore.cacheNames
  return tabsStore.cacheNames.filter((name) => name !== refreshingCacheName.value)
})

const currentTab = computed(() => {
  return tabsStore.visitedTabs.find((tab) => tab.path === route.fullPath)
})

const currentTabIndex = computed(() => {
  return tabsStore.visitedTabs.findIndex((tab) => tab.path === route.fullPath)
})

const canCloseCurrentTab = computed(() => Boolean(currentTab.value?.closable))
const isDashboardTab = computed(() => currentTab.value?.path === '/dashboard')
const isCurrentTabPinned = computed(() => Boolean(currentTab.value) && !currentTab.value!.closable)

const hasClosableTabs = computed(() => {
  return tabsStore.visitedTabs.some((tab) => tab.closable)
})

const hasClosableLeftTabs = computed(() => {
  if (currentTabIndex.value <= 0) return false
  return tabsStore.visitedTabs.slice(0, currentTabIndex.value).some((tab) => tab.closable)
})

const hasClosableRightTabs = computed(() => {
  if (currentTabIndex.value < 0) return false
  return tabsStore.visitedTabs.slice(currentTabIndex.value + 1).some((tab) => tab.closable)
})

const hasClosableOtherTabs = computed(() => {
  const targetPath = currentTab.value?.path
  if (!targetPath) return false
  return tabsStore.visitedTabs.some((tab) => tab.path !== targetPath && tab.closable)
})

const draggableTabs = computed({
  get: () => tabsStore.visitedTabs,
  set: (tabs) => {
    tabsStore.visitedTabs = tabs
  }
})

const viewTransitionName = computed(() => {
  if (!appStore.pageTransition || appStore.transitionPreset === 'none') return ''
  if (appStore.transitionPreset === 'fade') return 'fade-transition'
  if (appStore.transitionPreset === 'zoom') return 'zoom-transition'
  return 'fade-transform'
})

const handleOpenKeysChange = (keys: string[]) => {
  if (appStore.sidebarAccordion && keys.length > 1) {
    openKeys.value = [keys[keys.length - 1]]
    return
  }
  openKeys.value = keys
}

const handleMenuSelect = (key: string) => {
  const selectedNode = flattenMenuNodes(permissionStore.menuTree).find((item) => item.key === key)
  if (appStore.autoActivateFirstMenu && !selectedNode) {
    const selectedGroup = permissionStore.menuTree.find((item) => item.key === key)
    if (selectedGroup?.children?.length) {
      const firstLeaf = findFirstLeafPath(selectedGroup.children)
      if (firstLeaf) {
        router.push(firstLeaf)
        if (appStore.sidebarTriggerByMenu && appStore.collapseMenu) {
          appStore.sidebarCollapsed = true
        }
        return
      }
    }
  }

  router.push(key)
  if (appStore.sidebarTriggerByMenu && appStore.collapseMenu) {
    appStore.sidebarCollapsed = true
  }
}

const resolveBreadcrumbTargetPath = (path: string) => {
  const routeRecord = router.getRoutes().find((item) => item.path === path)
  if (!routeRecord?.children?.length) return path

  const firstChild = routeRecord.children[0]
  if (!firstChild) return path

  if (firstChild.path.startsWith('/')) return firstChild.path
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
  return `${normalizedPath}/${firstChild.path}`
}

const isBreadcrumbClickable = (path: string) => {
  return resolveBreadcrumbTargetPath(path) !== route.path
}

const handleBreadcrumbClick = (path: string) => {
  const targetPath = resolveBreadcrumbTargetPath(path)
  if (!isBreadcrumbClickable(path)) return
  router.push(targetPath)
}

const handleCollapsedChange = (value: boolean) => {
  appStore.sidebarCollapsed = value
}

const handleCloseTab = (path: string) => {
  const index = tabsStore.visitedTabs.findIndex((item) => item.path === path)
  const isCurrent = route.fullPath === path
  tabsStore.removeTab(path)

  if (!isCurrent) return

  const nextTab = tabsStore.visitedTabs[index - 1] || tabsStore.visitedTabs[tabsStore.visitedTabs.length - 1]
  router.replace(nextTab?.path || '/dashboard')
}

const handleCurrentTabCommand = (command: unknown) => {
  const tab = currentTab.value
  if (!tab) return

  switch (command) {
    case 'close-current':
      handleCloseTab(tab.path)
      break
    case 'pin':
      tabsStore.togglePin(tab.path)
      break
    case 'maximize':
      toggleFullscreen()
      break
    case 'reload':
      handleRefresh()
      break
    case 'new-window':
      window.open(router.resolve(tab.path).href, '_blank')
      break
    case 'close-left':
      tabsStore.removeLeft(tab.path)
      break
    case 'close-right':
      tabsStore.removeRight(tab.path)
      break
    case 'close-others':
      tabsStore.removeOthers(tab.path)
      break
    case 'close-all':
      tabsStore.removeAll()
      router.push('/dashboard')
      break
  }
}

const clearRefreshProgressTimer = () => {
  if (refreshProgressTimer === null) return
  window.clearInterval(refreshProgressTimer)
  refreshProgressTimer = null
}

const startRefreshProgress = () => {
  clearRefreshProgressTimer()
  refreshProgress.value = 8
  refreshProgressTimer = window.setInterval(() => {
    if (refreshProgress.value >= 90) return
    const step = refreshProgress.value < 50 ? 10 : 4
    refreshProgress.value = Math.min(90, refreshProgress.value + step)
  }, 120)
}

const finishRefreshProgress = async () => {
  clearRefreshProgressTimer()
  refreshProgress.value = 100
  await new Promise((resolve) => setTimeout(resolve, 180))
  isRefreshing.value = false
  refreshProgress.value = 0
}

const handleRefresh = async () => {
  if (isRefreshing.value) return
  isRefreshing.value = true
  startRefreshProgress()

  const currentRouteName = route.name ? String(route.name) : ''
  const shouldDropCache = Boolean(currentRouteName) && tabsStore.cacheNames.includes(currentRouteName)

  if (shouldDropCache) {
    refreshingCacheName.value = currentRouteName
    await nextTick()
  }

  refreshViewKey.value += 1

  if (shouldDropCache) {
    await nextTick()
    refreshingCacheName.value = null
  }

  await nextTick()
  await finishRefreshProgress()
}

const clearRouteProgressTimer = () => {
  if (routeProgressTimer === null) return
  window.clearInterval(routeProgressTimer)
  routeProgressTimer = null
}

const startRouteProgress = () => {
  if (!appStore.pageTransitionProgress) return
  clearRouteProgressTimer()
  routeProgress.value = 8
  routeProgressTimer = window.setInterval(() => {
    if (routeProgress.value >= 88) return
    const step = routeProgress.value < 50 ? 8 : 3
    routeProgress.value = Math.min(88, routeProgress.value + step)
  }, 90)
}

const finishRouteProgress = async () => {
  if (!appStore.pageTransitionProgress) {
    routeProgress.value = 0
    return
  }

  clearRouteProgressTimer()
  routeProgress.value = 100
  await new Promise((resolve) => setTimeout(resolve, 150))
  routeProgress.value = 0
}

const handleRouteStart = () => {
  if (route.path === '/login') return
  if (appStore.pageLoading) {
    isRouteLoading.value = true
  }
  startRouteProgress()
}

const handleRouteEnd = async () => {
  await finishRouteProgress()
  if (!appStore.pageLoading) {
    isRouteLoading.value = false
    return
  }

  await new Promise((resolve) => setTimeout(resolve, 120))
  isRouteLoading.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (isScreenLocked.value) {
    if (event.key === 'Escape') {
      event.preventDefault()
      handleUnlockScreen()
    }
    return
  }

  if (!appStore.enableShortcut) return
  if (route.path === '/login') return

  const key = event.key.toLowerCase()
  if (event.ctrlKey && key === 'k' && appStore.enableSearchShortcut) {
    event.preventDefault()
    handleGlobalSearch()
    return
  }

  if (event.altKey && key === 'q' && appStore.enableLogoutShortcut) {
    event.preventDefault()
    handleLogout()
    return
  }

  if (event.altKey && key === 'l' && appStore.enableLockShortcut) {
    event.preventDefault()
    handleLockScreen()
  }
}

const routeStartListener = () => {
  handleRouteStart()
}

const routeEndListener = () => {
  void handleRouteEnd()
}

onMounted(() => {
  window.addEventListener('amu-admin:route-start', routeStartListener)
  window.addEventListener('amu-admin:route-end', routeEndListener)
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  clearRefreshProgressTimer()
  clearRouteProgressTimer()
  clearAutoCheckUpdateTimer()
  if (lockClockTimer !== null) {
    window.clearInterval(lockClockTimer)
    lockClockTimer = null
  }

  window.removeEventListener('amu-admin:route-start', routeStartListener)
  window.removeEventListener('amu-admin:route-end', routeEndListener)
  window.removeEventListener('keydown', handleKeydown)
})

const toggleFullscreen = () => {
  isContentFullscreen.value = !isContentFullscreen.value
}

const handleLogout = () => {
  authStore.logout()
  permissionStore.reset()
  tabsStore.reset()
  router.replace('/login')
}
</script>

<style scoped>
.admin-layout {
  --amu-color-primary: var(--admin-primary-color);
  --amu-radius: calc(8px * var(--admin-radius-scale));
  height: 100vh;
  display: grid;
  grid-template-columns: var(--admin-aside-width) 1fr;
  background: var(--amu-color-bg-fill);
  transition: grid-template-columns 0.24s ease;
  overflow: hidden;
  font-size: var(--admin-font-size);
}

.admin-layout--content-only {
  grid-template-columns: 0 1fr;
}

.admin-layout--content-fullscreen {
  grid-template-columns: 0 1fr;
}

.admin-layout--content-fullscreen .admin-layout__main {
  grid-template-rows: 0 1fr;
}

.admin-layout--content-fullscreen .admin-layout__aside {
  opacity: 0;
  transform: translateX(-8px);
  border-right-color: transparent;
  pointer-events: none;
}

.admin-layout--content-fullscreen .admin-layout__header {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-bottom-color: transparent;
  pointer-events: none;
}

.admin-layout__top-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--amu-color-primary);
  transition: width 0.22s ease;
  z-index: 1200;
  pointer-events: none;
}

.admin-layout__top-progress::after {
  content: '';
  position: absolute;
  top: 0;
  right: -1px;
  width: 56px;
  height: 100%;
  transform: translateX(40%);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), var(--amu-color-primary));
  box-shadow: 0 0 8px var(--amu-color-primary), 0 0 2px var(--amu-color-primary);
  opacity: 0.85;
}

.admin-layout__aside {
  grid-column: 1;
  grid-row: 1;
  border-right: 1px solid var(--amu-color-border);
  background: var(--amu-color-bg-elevated);
  padding: 0;
  min-width: 0;
  display: flex;
  min-height: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
  z-index: 20;
  overflow: hidden;
  transition: opacity 0.2s ease, transform 0.24s ease, border-color 0.2s ease;
}

.admin-layout--sidebar-dark .admin-layout__aside {
  background: #0f172a;
  border-right-color: rgba(255, 255, 255, 0.08);
}

.admin-layout--sidebar-dark .admin-layout__aside :deep(.amu-menu) {
  background-color: transparent;
  --amu-menu-hover-bg: rgba(255, 255, 255, 0.08); /* 适配深色侧边栏的 hover 颜色 */
}

.admin-layout--sidebar-dark .admin-layout__logo-text,
.admin-layout--sidebar-dark .admin-layout__aside :deep(.amu-menu-item),
.admin-layout--sidebar-dark .admin-layout__aside :deep(.amu-sub-menu__title) {
  color: rgba(255, 255, 255, 0.88);
}

.admin-layout--sidebar-child-dark .admin-layout__aside :deep(.amu-menu) {
  background-color: var(--amu-color-bg-page);
}

.admin-layout--sidebar-child-dark.admin-layout--sidebar-dark .admin-layout__aside :deep(.amu-menu) {
  background-color: #1f1f1f;
}

.admin-layout--header-dark .admin-layout__header,
.admin-layout--header-dark .admin-layout__tabs-bar {
  background: #111827;
  border-color: rgba(255, 255, 255, 0.08);
}

.admin-layout--header-dark .admin-layout__header :deep(.amu-menu) {
  background-color: transparent;
  --amu-menu-hover-bg: rgba(255, 255, 255, 0.08);
}

.admin-layout--header-dark .admin-layout__header-icon,
.admin-layout--header-dark .admin-layout__search-text,
.admin-layout--header-dark .admin-layout__search-icon,
.admin-layout--header-dark .admin-layout__search-shortcut,
.admin-layout--header-dark .admin-layout__tabs-extra-btn {
  color: rgba(255, 255, 255, 0.82);
}

.admin-layout--header-dark .admin-layout__tabs-extra-btn:hover {
  background-color: rgba(255, 255, 255, 0.08); /* 适配深色顶栏的hover色 */
}

/* 适配深色顶栏下的标签颜色：使用半透明叠加使其融入深蓝色背景，避免默认的黑灰色突兀 */
.admin-layout--header-dark .admin-layout__tabs :deep(.amu-tag--default) {
  --amu-tag-bg-color: rgba(255, 255, 255, 0.08);
  --amu-tag-text-color: rgba(255, 255, 255, 0.82);
}

.admin-layout--header-dark .admin-layout__search {
  background: rgba(255, 255, 255, 0.08);
}

.admin-layout__aside :deep(.amu-menu--vertical) {
  width: 100%;
  height: 100%;
}

.admin-layout__aside :deep(.amu-menu__logo) {
  justify-content: flex-start;
  padding: 0 16px;
}

.admin-layout__aside :deep(.amu-menu--collapsed) {
  width: 100%;
  transition: none;
}

.admin-layout__aside :deep(.amu-menu-item),
.admin-layout__aside :deep(.amu-sub-menu__title) {
  min-height: 40px;
}

.admin-layout__aside.is-collapsed {
  overflow: hidden;
}

.admin-layout__logo {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 18px;
  font-weight: 700;
  height: 60px;
  box-sizing: border-box;
}

.admin-layout__logo-mark {
  color: #fff;
  background: var(--amu-color-primary);
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.admin-layout__logo-text {
  color: var(--amu-color-text-default);
  position: absolute;
  left: 48px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  pointer-events: none;
}

.admin-layout__header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  padding-left: 0;
  font-size: 18px;
  font-weight: bold;
  color: var(--amu-color-text-primary);
  white-space: nowrap;
  
}

.admin-layout__header-logo-img {
  width: 28px;
  height: 28px;
}

.admin-layout__horizontal-menu {
  flex: 1;
  border-bottom: none !important;
  margin-left: 0px !important;
  height: 100%;
}

.admin-layout__horizontal-menu :deep(.amu-menu) {
  border-bottom: none;
  height: 100%;
}

.admin-layout__main {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-rows: 52px 1fr;
  min-width: 0;
  min-height: 0;
  transition: grid-template-rows 0.24s ease;
}

.admin-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 52px;
  overflow: hidden;
  padding: 0 16px;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  z-index: 10;
  transition: opacity 0.2s ease, transform 0.24s ease, max-height 0.24s ease, padding 0.24s ease, border-color 0.2s ease;
}

.admin-layout__header-left,
.admin-layout__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-layout__header-left {
  min-width: 0;
  flex: 1;
}

.admin-layout__header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 16px;
  border-radius: 6px;
  color: var(--amu-color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.admin-layout__header-icon:hover {
  background: var(--amu-color-bg-fill);
  color: var(--amu-color-text-default);
}

.admin-layout__header-icon--badge {
  overflow: visible;
}

.admin-layout__badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid var(--amu-color-bg-elevated);
}

.admin-layout__badge--blue {
  background-color: var(--amu-color-primary);
}

.admin-layout__badge--green {
  background-color: #22c55e;
  top: auto;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
}

.admin-layout__breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.admin-layout__breadcrumb-item--clickable {
  cursor: pointer;
}

.admin-layout__breadcrumb-item--clickable:hover {
  color: var(--amu-color-primary);
}

.admin-layout__breadcrumb-icon {
  font-size: 14px;
  color: var(--amu-color-text-secondary);
}

.admin-layout__search {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 8px 0 12px;
  background: var(--amu-color-bg-fill);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  gap: 8px;
  margin-right: 8px;
}

.admin-layout__search:hover {
  background: var(--amu-color-border);
}

.admin-layout__search-icon {
  color: var(--amu-color-text-secondary);
  font-size: 14px;
}

.admin-layout__refresh-icon--spinning {
  animation: admin-layout-rotate 0.6s linear;
}

.admin-layout__search-text {
  color: var(--amu-color-text-secondary);
  font-size: 13px;
}

.admin-layout__search-shortcut {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0 6px;
  background: var(--amu-color-bg-elevated);
  border: 1px solid var(--amu-color-border);
  border-radius: 4px;
  font-size: 12px;
  color: var(--amu-color-text-secondary);
  margin-left: 4px;
}

.admin-layout__user-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 4px;
  transition: all 0.2s;
}

.admin-layout__user-avatar:hover {
  opacity: 0.8;
}

.admin-layout__avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #f0f2f5;
}

.admin-layout__avatar-text {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: var(--amu-color-primary);
}

.admin-layout__header-left :deep(.amu-breadcrumb) {
  overflow: hidden;
}

.admin-layout__content {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0;
  background: var(--amu-color-bg-fill);
  min-height: 0;
}

.admin-layout__tabs-bar {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  z-index: 5;
}

.admin-layout__tabs {
  flex: 1;
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  flex-wrap: nowrap;
  min-height: 36px;
  padding: 2px 12px;
  overflow-x: auto;
  scrollbar-width: none;
}

.admin-layout__tabs::-webkit-scrollbar {
  display: none;
}

.admin-layout__tabs:deep(.amu-tag) {
  min-height: 28px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.admin-layout__tabs:deep(.amu-tag:hover) {
  opacity: 0.8;
}

.admin-layout__tab-item {
  display: flex;
  flex-shrink: 0;
  cursor: grab;
}

.admin-layout__tab-item:active {
  cursor: grabbing;
}

.admin-layout__tab-ghost {
  opacity: 0.35;
}

.admin-layout__tab-chosen {
  opacity: 0.7;
}

.admin-layout__tab-drag {
  opacity: 0.9;
}

.admin-layout__tabs-extra {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  align-self: stretch;
  height: auto;
  color: var(--amu-color-text-secondary);
  border-left: 1px solid var(--amu-color-border-light);
  transition: all 0.2s;
}

.admin-layout__tabs-extra-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-layout__tabs-extra-btn:hover {
  background-color: var(--amu-color-bg-fill);
  color: var(--amu-color-text-default);
}

.admin-layout__tabs-extra :deep(.amu-dropdown) {
  display: flex;
  align-self: stretch;
}

.admin-layout__tabs-extra :deep(.amu-dropdown__trigger) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.admin-layout__scrollbar {
  background: var(--amu-color-bg-fill);
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.admin-layout__view {
  padding: 16px;
  position: relative;
}

.admin-layout__watermark {
  position: fixed;
  inset: 0;
  z-index: 1090;
  pointer-events: none;
  background-repeat: repeat;
}

.admin-layout__lock-screen {
  position: fixed;
  inset: 0;
  z-index: 1300;
  background: rgba(15, 23, 42, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.admin-layout__lock-card {
  width: min(320px, 88vw);
  border-radius: 10px;
  border: 1px solid var(--amu-color-border-light);
  background: var(--amu-color-bg-elevated);
  padding: 20px;
  display: grid;
  gap: 10px;
}

.admin-layout__lock-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--amu-color-text-default);
}

.admin-layout__lock-time {
  font-size: 24px;
  font-weight: 700;
  color: var(--amu-color-primary);
}

.admin-layout__lock-user {
  font-size: 13px;
  color: var(--amu-color-text-secondary);
}

.admin-layout--fixed-content .admin-layout__view {
  width: 100%;
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
}

.admin-settings {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  margin: -20px;
  background-color: var(--amu-color-bg-page);
}

.admin-settings__header-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.admin-settings__header-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--amu-color-text-primary);
}

.admin-settings__tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* Custom styled tabs as floating tags */
.admin-settings__tabs :deep(.amu-tabs__header) {
  background-color: var(--amu-color-bg-overlay);
  padding: 16px 16px 0;
  border-bottom: 2px solid var(--amu-color-border-light);
  margin-bottom: 0;
}

.admin-settings__tabs :deep(.amu-tabs__content) {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}

.admin-settings__tabs :deep(.amu-tabs__nav-wrap) {
  margin-bottom: -2px;
}

.admin-settings__tabs :deep(.amu-tabs__nav) {
  display: flex;
}

.admin-settings__tabs :deep(.amu-tabs__active-bar) {
  height: 2px;
  border-radius: 2px;
}

.admin-settings__tabs :deep(.amu-tab-item) {
  flex: 1;
  text-align: center;
  justify-content: center;
  padding: 0;
  height: 36px;
  color: var(--amu-color-text-secondary);
  transition: all 0.3s;
  font-size: 14px;
}

.admin-settings__tabs :deep(.amu-tab-item.is-active) {
  color: var(--amu-color-primary);
  font-weight: 600;
}

.admin-settings__tabs :deep(.amu-tabs__content) {
  max-height: calc(100vh - 160px);
  overflow: auto;
  padding-right: 4px;
}

.admin-settings__section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: var(--amu-color-bg-overlay);
  border-radius: var(--amu-radius-large);
  border: 1px solid var(--amu-color-border-light);
  margin-bottom: 16px;
}

.admin-settings__section:last-child {
  margin-bottom: 0;
}

.admin-settings__section.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.admin-settings__label {
  font-size: 14px;
  font-weight: bold;
  color: var(--amu-color-text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-settings__chip-group {
  display: flex;
  gap: 12px;
  width: 100%;
}

.admin-chip {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  border: 1px solid var(--amu-color-border);
  border-radius: 20px;
  cursor: pointer;
  background-color: transparent;
  color: var(--amu-color-text-secondary);
  transition: all 0.2s;
  font-size: 13px;
}

.admin-chip:hover {
  border-color: var(--amu-color-primary-light);
  color: var(--amu-color-primary);
}

.admin-chip.is-active {
  background-color: var(--amu-color-primary);
  border-color: var(--amu-color-primary);
  color: #fff;
  font-weight: 500;
}

.admin-settings__switch-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-settings__switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--amu-color-text-secondary);
  font-size: 13px;
}

.admin-settings__switch-item span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.hint-icon {
  color: var(--amu-color-text-placeholder);
  cursor: help;
}

.admin-settings__switch-item em {
  font-style: normal;
  font-size: 12px;
  color: var(--amu-color-text-tertiary);
  margin-left: 8px;
  background: var(--amu-color-bg-fill);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--amu-color-border-light);
}

.admin-settings__switch-item--compact {
  min-height: 28px;
}

.admin-settings__color-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.admin-settings__color-dot-wrap {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 0 0 1px var(--amu-color-border-light);
}

.admin-settings__color-dot-wrap:hover {
  transform: scale(1.1);
}

.admin-settings__color-dot-wrap.is-active {
  box-shadow: 0 0 0 2px var(--amu-color-primary) !important;
}

.admin-settings__color-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.admin-settings__radius-list {
  display: flex;
  gap: 12px;
}

.admin-settings__radius-item {
  flex: 1;
  height: 32px;
  cursor: pointer;
  border: 1px solid var(--amu-color-border-light);
  background: var(--amu-color-bg-base);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-settings__radius-item:hover {
  border-color: var(--amu-color-primary);
  background: var(--amu-color-bg-fill);
}

.admin-settings__radius-item.is-active {
  border-color: var(--amu-color-primary);
  background: var(--amu-color-bg-selected);
}

.radius-val {
  width: 14px;
  height: 14px;
  display: inline-block;
  border: 2px solid var(--amu-color-text-description);
  border-radius: inherit;
  transition: all 0.2s;
}

.admin-settings__radius-item:hover .radius-val {
  border-color: var(--amu-color-primary);
}

.admin-settings__radius-item.is-active .radius-val {
  border-color: var(--amu-color-primary);
  background: var(--amu-color-primary);
}

.admin-settings__font-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-settings__font-preview {
  width: 48px;
  text-align: center;
  color: var(--amu-color-text-primary);
  font-weight: 500;
  line-height: 1;
}

.admin-settings__font-ctrl {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--amu-color-border-light);
  border-radius: 20px;
  padding: 0;
  height: 36px;
  overflow: hidden;
}

.admin-settings__step-btn {
  width: 40px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--amu-color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
}

.admin-settings__step-btn:hover {
  color: var(--amu-color-primary);
  background-color: var(--amu-color-bg-fill);
}

.admin-settings__font-val {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: var(--amu-color-text-primary);
  font-weight: 500;
}

.admin-settings__layout-item {
  border: 1px solid var(--amu-color-border-light);
  background: var(--amu-color-bg-elevated);
  transition: all 0.2s;
}

.admin-settings__layout-item.is-active {
  border-color: var(--amu-color-primary);
  color: var(--amu-color-primary);
}

.admin-settings__layout-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.admin-settings__layout-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
}

.admin-settings__layout-item:hover {
  border-color: var(--amu-color-primary-light);
}

.admin-settings__layout-skeleton {
  width: 100%;
  height: 48px;
  background-color: var(--amu-color-bg-fill);
  border-radius: 4px;
  border: 1px solid var(--amu-color-border-light);
  position: relative;
  overflow: hidden;
}

.admin-settings__layout-skeleton .skeleton-header {
  position: absolute;
  background-color: var(--amu-color-bg-elevated);
}

.admin-settings__layout-skeleton .skeleton-sidebar {
  position: absolute;
  background-color: var(--amu-color-bg-overlay);
}

.admin-settings__layout-skeleton .skeleton-main {
  position: absolute;
  background-color: var(--amu-color-bg-page);
  border-radius: 2px;
}

/* Vertical layout skeleton */
.admin-settings__layout-skeleton.is-vertical .skeleton-header {
  top: 0;
  left: 20%;
  right: 0;
  height: 12px;
}

.admin-settings__layout-skeleton.is-vertical .skeleton-sidebar {
  top: 0;
  left: 0;
  bottom: 0;
  width: 20%;
  z-index: 1;
}

.admin-settings__layout-skeleton.is-vertical .skeleton-main {
  top: 16px;
  left: 25%;
  right: 4px;
  bottom: 4px;
}

/* Horizontal layout skeleton */
.admin-settings__layout-skeleton.is-horizontal .skeleton-header {
  top: 0;
  left: 0;
  right: 0;
  height: 12px;
}

.admin-settings__layout-skeleton.is-horizontal .skeleton-sidebar {
  display: none;
}

.admin-settings__layout-skeleton.is-horizontal .skeleton-main {
  top: 16px;
  left: 4px;
  right: 4px;
  bottom: 4px;
}

/* Mixed-nav skeleton */
.admin-settings__layout-skeleton.is-mixed-nav .skeleton-header {
  top: 0;
  left: 0;
  right: 0;
  height: 12px;
  z-index: 1;
}

.admin-settings__layout-skeleton.is-mixed-nav .skeleton-sidebar {
  top: 12px;
  left: 0;
  bottom: 0;
  width: 20%;
}

.admin-settings__layout-skeleton.is-mixed-nav .skeleton-main {
  top: 16px;
  left: 25%;
  right: 4px;
  bottom: 4px;
}

/* Mixed-column skeleton */
.admin-settings__layout-skeleton.is-mixed-column .skeleton-header {
  top: 0;
  left: 10%;
  right: 0;
  height: 12px;
}

.admin-settings__layout-skeleton.is-mixed-column .skeleton-sidebar {
  top: 0;
  left: 0;
  bottom: 0;
  width: 10%;
  z-index: 1;
  border-right: 1px solid var(--amu-color-border-light);
}

.admin-settings__layout-skeleton.is-mixed-column::after {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  bottom: 0;
  width: 15%;
  background: var(--amu-color-bg-overlay);
}

.admin-settings__layout-skeleton.is-mixed-column .skeleton-main {
  top: 16px;
  left: 30%;
  right: 4px;
  bottom: 4px;
}

/* Double-column skeleton */
.admin-settings__layout-skeleton.is-double-column .skeleton-header {
  top: 0;
  left: 25%;
  right: 0;
  height: 12px;
}

.admin-settings__layout-skeleton.is-double-column .skeleton-sidebar {
  top: 0;
  left: 0;
  bottom: 0;
  width: 10%;
  z-index: 2;
}

.admin-settings__layout-skeleton.is-double-column::after {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  bottom: 0;
  width: 15%;
  background: var(--amu-color-bg-overlay);
  z-index: 1;
}

.admin-settings__layout-skeleton.is-double-column .skeleton-main {
  top: 16px;
  left: 30%;
  right: 4px;
  bottom: 4px;
}

/* Content-only skeleton */
.admin-settings__layout-skeleton.is-content-only .skeleton-header {
  display: none;
}

.admin-settings__layout-skeleton.is-content-only .skeleton-sidebar {
  display: none;
}

.admin-settings__layout-skeleton.is-content-only .skeleton-main {
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
}

.admin-settings__layout-item.is-active .admin-settings__layout-skeleton {
  border-color: var(--amu-color-primary);
}

.admin-settings__layout-item.is-active .admin-settings__layout-skeleton .skeleton-main {
  background-color: var(--amu-color-primary-light-8);
}

.admin-settings__layout-title {
  font-size: 12px;
  color: var(--amu-color-text-regular);
}

.admin-settings__layout-item.is-active .admin-settings__layout-title {
  color: var(--amu-color-primary);
  font-weight: 500;
}

.admin-settings__footer {
  margin-top: auto;
  padding: 16px;
  background-color: var(--amu-color-bg-overlay);
  border-top: 1px solid var(--amu-color-border-light);
  display: flex;
  gap: 12px;
  align-items: center;
}

.admin-btn-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.admin-btn-action.is-primary {
  background: var(--amu-color-primary);
  color: #fff;
  box-shadow: 0 4px 10px rgba(var(--amu-color-primary-rgb), 0.3);
}

.admin-btn-action.is-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.admin-btn-action.is-danger {
  background: var(--amu-color-danger-light-9);
  color: var(--amu-color-danger);
  border-color: var(--amu-color-danger-light-5);
}

.admin-btn-action.is-danger:hover {
  background: var(--amu-color-danger);
  color: #fff;
}

.admin-settings__feedback {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: var(--amu-color-success);
}

.admin-settings__hint {
  margin: -4px 0 12px;
  font-size: 12px;
  color: var(--amu-color-text-tertiary);
}

/* 页面切换动画 */
:deep(.fade-transform-leave-active),
:deep(.fade-transform-enter-active) {
  transition: all 0.4s;
}

:deep(.fade-transition-leave-active),
:deep(.fade-transition-enter-active) {
  transition: opacity 0.24s ease;
}

:deep(.fade-transition-enter-from),
:deep(.fade-transition-leave-to) {
  opacity: 0;
}

:deep(.zoom-transition-leave-active),
:deep(.zoom-transition-enter-active) {
  transition: all 0.24s ease;
}

:deep(.zoom-transition-enter-from),
:deep(.zoom-transition-leave-to) {
  opacity: 0;
  transform: scale(0.96);
}

:deep(.fade-transform-enter-from) {
  opacity: 0;
  transform: translateX(-20px);
}

:deep(.fade-transform-leave-to) {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes admin-layout-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.admin-search {
  display: flex;
  flex-direction: column;
}
.admin-search__input-wrapper {
  padding: 16px;
  border-bottom: 1px solid var(--amu-color-border-light);
}
.admin-search__input-wrapper .amu-input {
  --amu-input-border-color: transparent;
  --amu-input-hover-border-color: transparent;
  --amu-input-focus-border-color: transparent;
  --amu-input-bg-color: var(--amu-color-bg-fill);
  border-radius: 8px;
  font-size: 16px;
}
.admin-search__input-wrapper .amu-input__inner {
  height: 48px;
  padding-left: 12px;
}

.admin-search__result {
  padding: 8px;
  background: var(--amu-color-bg-elevated);
}

.admin-search__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--amu-color-text);
}

.admin-search__item:hover,
.admin-search__item.is-active {
  background: var(--amu-color-bg-fill);
  color: var(--amu-color-primary);
}

[data-amu-theme='dark'] .admin-search__item:hover,
[data-amu-theme='dark'] .admin-search__item.is-active {
  background: var(--amu-color-bg-selected);
}

.admin-search__item-icon {
  font-size: 20px;
  color: var(--amu-color-text-tertiary);
  transition: color 0.2s;
}

.admin-search__item.is-active .admin-search__item-icon {
  color: var(--amu-color-primary);
}

.admin-search__item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.admin-search__item-title {
  font-size: 14px;
  font-weight: 500;
  color: inherit;
}

.admin-search__item-path {
  font-size: 12px;
  color: var(--amu-color-text-tertiary);
  transition: color 0.2s;
}

.admin-search__item.is-active .admin-search__item-path {
  color: inherit;
  opacity: 0.8;
}

.admin-search__item-enter {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.2s;
  font-size: 20px;
  color: var(--amu-color-primary);
}

.admin-search__item.is-active .admin-search__item-enter {
  opacity: 1;
  transform: translateX(0);
}

.admin-search__empty {
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--amu-color-text-secondary);
  font-size: 14px;
}
</style>

<style>
/* Global Search Dialog Styles */
.admin-search-dialog .amu-dialog {
  border-radius: 12px;
  overflow: hidden;
  background: var(--amu-color-bg-elevated);
  box-shadow: var(--amu-shadow-xl);
}
.admin-search-dialog .amu-dialog-header {
  display: none !important;
}
.admin-search-dialog .amu-dialog-body {
  padding: 0;
}

/* Notification Dropdown Styles */
.admin-notification-dropdown {
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--amu-color-border-light);
  background: var(--amu-color-bg-elevated);
}

.admin-notification {
  width: 320px;
  display: flex;
  flex-direction: column;
}

.admin-notification__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--amu-color-border-light);
  font-size: 16px;
  font-weight: 500;
  color: var(--amu-color-text-primary);
}

.admin-notification__envelope {
  color: var(--amu-color-text-secondary);
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s;
}
.admin-notification__envelope:hover {
  color: var(--amu-color-primary);
}

.admin-notification__list {
  display: flex;
  flex-direction: column;
}

.admin-notification__empty {
  padding: 40px 0;
  text-align: center;
  color: var(--amu-color-text-secondary);
  font-size: 14px;
}

.admin-notification__item {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid var(--amu-color-border-light);
  transition: background-color 0.2s;
  cursor: pointer;
}

.admin-notification__item:hover {
  background-color: var(--amu-color-bg-fill);
}

.admin-notification__item.is-read {
  opacity: 0.6;
}

.admin-notification__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
}

.admin-notification__content {
  flex: 1;
  min-width: 0;
}

.admin-notification__item-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--amu-color-text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-notification__item-desc {
  font-size: 13px;
  color: var(--amu-color-text-secondary);
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.admin-notification__item-time {
  font-size: 12px;
  color: var(--amu-color-text-secondary);
}

.admin-notification__action {
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2px;
}

.action-icon {
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
  transition: all 0.2s;
}

.close-icon {
  color: var(--amu-color-status-danger);
}
.close-icon:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.check-icon {
  color: var(--amu-color-text-primary);
}
.check-icon:hover {
  background-color: var(--amu-color-bg-fill);
}

.admin-notification__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--amu-color-primary);
  margin-top: 6px;
}

.admin-notification__item.is-read .admin-notification__dot {
  background-color: transparent;
}

.admin-notification__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--amu-color-border-light);
  background-color: var(--amu-color-bg-fill);
}

/* User Dropdown Styles */
.admin-user-dropdown-panel {
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  min-width: 200px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.admin-user-menu {
  display: flex;
  flex-direction: column;
}

.admin-user-menu__header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--amu-color-border-light);
  background-color: var(--amu-color-bg-base);
}

.admin-user-menu__avatar-wrap {
  position: relative;
  margin-right: 12px;
}

.admin-user-menu__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--amu-color-bg-fill);
  object-fit: cover;
  border: 1px solid var(--amu-color-border-light);
}

.admin-user-menu__status {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--amu-color-status-success);
  border: 2px solid var(--amu-color-bg-elevated);
}

.admin-user-menu__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.admin-user-menu__name {
  font-size: 14px;
  font-weight: 500;
  color: var(--amu-color-text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  line-height: 1.2;
}

.admin-user-menu__tag {
  font-size: 12px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: normal;
  transform: scale(0.9);
}

.admin-user-menu__email {
  font-size: 12px;
  color: var(--amu-color-text-secondary);
  line-height: 1.2;
}

.admin-user-dropdown-panel .amu-dropdown-menu {
  padding: 4px 0;
}

/* Custom override for inner drop items for a compact vibe */
.admin-user-dropdown-panel .amu-dropdown-item {
  padding: 8px 16px;
  font-size: 14px;
}
.admin-user-dropdown-panel .amu-dropdown-item__icon {
  font-size: 16px;
  margin-right: 10px;
}
</style>

