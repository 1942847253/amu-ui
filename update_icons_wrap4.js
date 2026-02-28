const fs = require('fs');
let text = fs.readFileSync('templates/amu-admin/src/layouts/AdminLayout.vue', 'utf8');

text = text.replace('<component :is="MenuIcon" />', '<AmuIcon><IconMenu /></AmuIcon>');
text = text.replace('<component :is="RefreshIcon" />', '<AmuIcon><IconRefreshCw /></AmuIcon>');
text = text.replace('<component :is="SearchIcon" class="admin-layout__search-icon" />', '<AmuIcon class="admin-layout__search-icon"><IconSearch /></AmuIcon>');
text = text.replace('<component :is="SettingsIcon" />', '<AmuIcon><IconSettings /></AmuIcon>');
text = text.replace('<component :is="appStore.isDark ? SunIcon : MoonIcon" />', '<AmuIcon>\n              <component :is="appStore.isDark ? IconSun : IconMoon" />\n            </AmuIcon>');
text = text.replace('<component :is="TranslateIcon" />', '<AmuIcon><IconGlobe /></AmuIcon>');
text = text.replace('<component :is="HistoryIcon" />', '<AmuIcon><IconClock /></AmuIcon>');
text = text.replace('<component :is="FullscreenIcon" />', '<AmuIcon><IconMaximize /></AmuIcon>');
text = text.replace('<component :is="BellIcon" />', '<AmuIcon><IconBell /></AmuIcon>');

text = text.replaceAll('<component :is="resolveMenuIcon(item.key)" />', '<AmuIcon>\n              <component :is="resolveMenuIcon(item.key)" />\n            </AmuIcon>');
text = text.replaceAll('<component :is="resolveMenuIcon(child.key)" />', '<AmuIcon>\n                <component :is="resolveMenuIcon(child.key)" />\n              </AmuIcon>');
text = text.replaceAll('<component :is="resolveMenuIcon(crumb.path)" class="admin-layout__breadcrumb-icon" v-if="resolveMenuIcon(crumb.path)" />', '<AmuIcon class="admin-layout__breadcrumb-icon" v-if="resolveMenuIcon(crumb.path)">\n                  <component :is="resolveMenuIcon(crumb.path)" />\n                </AmuIcon>');

text = text.replace("import { computed, h, ref, watch } from 'vue'", "import { computed, ref, watch } from 'vue'");
text = text.replace("import { IconSettings } from '@amu-ui/icons'", "import {\n  IconSettings,\n  IconMenu,\n  IconRefreshCw,\n  IconSearch,\n  IconMoon,\n  IconSun,\n  IconGlobe,\n  IconClock,\n  IconMaximize,\n  IconBell,\n  IconGrid,\n  IconFolder,\n  IconUser,\n  IconUsers,\n  IconShield,\n  IconBarChart\n} from '@amu-ui/icons'");

const iconRegex = /const createIcon =.*?const ChartIcon = createOutlineIcon\(\[\s+h\('line', \{[^\}]+\}\),\s+h\('line', \{[^\}]+\}\),\s+h\('line', \{[^\}]+\}\)\s+\]\)/s;
text = text.replace(iconRegex, '');

const resolveRegex = /const resolveMenuIcon = \(key: string\) => \{[^}]+?\}/s;
text = text.replace(resolveRegex, \const resolveMenuIcon = (key: string) => {
  if (key === '/dashboard') return IconGrid
  if (key === '/system') return IconFolder
  if (key === '/system/users') return IconUser
  if (key === '/system/roles') return IconUsers
  if (key === '/system/auth-debug') return IconShield
  if (key.includes('analysis')) return IconBarChart
  return IconFolder
}\);

fs.writeFileSync('templates/amu-admin/src/layouts/AdminLayout.vue', text, 'utf8');
