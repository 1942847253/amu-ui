const fs = require('fs');
let text = fs.readFileSync('templates/amu-admin/src/layouts/AdminLayout.vue', 'utf8');

text = text.replace('<component :is="MenuIcon" />', '<component :is="IconMenu" />')
text = text.replace('<component :is="RefreshIcon" />', '<component :is="IconRefreshCw" />')
text = text.replace('<component :is="SearchIcon"', '<component :is="IconSearch"')
text = text.replace('<SettingsIcon />', '<IconSettings />')
text = text.replace('<component :is="appStore.isDark ? SunIcon : MoonIcon" />', '<component :is="appStore.isDark ? IconSun : IconMoon" />')
text = text.replace('<component :is="TranslateIcon" />', '<component :is="IconGlobe" />')
text = text.replace('<component :is="HistoryIcon" />', '<component :is="IconClock" />')
text = text.replace('<component :is="FullscreenIcon" />', '<component :is="IconMaximize" />')
text = text.replace('<component :is="BellIcon" />', '<component :is="IconBell" />')

text = text.replace("import { computed, h, ref, watch } from 'vue'", "import { computed, ref, watch } from 'vue'")
text = text.replace("import { IconSettings } from '@amu-ui/icons'", "import {\n  IconSettings,\n  IconMenu,\n  IconRefreshCw,\n  IconSearch,\n  IconMoon,\n  IconSun,\n  IconGlobe,\n  IconClock,\n  IconMaximize,\n  IconBell,\n  IconGrid,\n  IconFolder,\n  IconUser,\n  IconUsers,\n  IconShield,\n  IconBarChart\n} from '@amu-ui/icons'")

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
