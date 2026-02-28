import re

with open('templates/amu-admin/src/layouts/AdminLayout.vue', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace template tags
text = text.replace('<component :is="MenuIcon" />', '<component :is="IconMenu" />')
text = text.replace('<component :is="RefreshIcon" />', '<component :is="IconRefreshCw" />')
text = text.replace('<component :is="SearchIcon"', '<component :is="IconSearch"')
text = text.replace('<SettingsIcon />', '<IconSettings />')
text = text.replace('<component :is="appStore.isDark ? SunIcon : MoonIcon" />', '<component :is="appStore.isDark ? IconSun : IconMoon" />')
text = text.replace('<component :is="TranslateIcon" />', '<component :is="IconGlobe" />')
text = text.replace('<component :is="HistoryIcon" />', '<component :is="IconClock" />')
text = text.replace('<component :is="FullscreenIcon" />', '<component :is="IconMaximize" />')
text = text.replace('<component :is="BellIcon" />', '<component :is="IconBell" />')

# Imports
text = text.replace("import { computed, h, ref, watch } from 'vue'", "import { computed, ref, watch } from 'vue'")
text = text.replace("import { IconSettings } from '@amu-ui/icons'", "import {\n  IconSettings,\n  IconMenu,\n  IconRefreshCw,\n  IconSearch,\n  IconMoon,\n  IconSun,\n  IconGlobe,\n  IconClock,\n  IconMaximize,\n  IconBell,\n  IconGrid,\n  IconFolder,\n  IconUser,\n  IconUsers,\n  IconShield,\n  IconBarChart\n} from '@amu-ui/icons'")

# Replace icon definitions
pattern = re.compile(r"const createIcon =.*?const ChartIcon = createOutlineIcon\[\n[^\]]+\]\)", re.DOTALL)
text = pattern.sub('', text)

# Replace resolveMenuIcon
resolve_pattern = re.compile(r"const resolveMenuIcon = \(key: string\) => \{[^}]+?\}", re.DOTALL)
new_resolve = '''const resolveMenuIcon = (key: string) => {
  if (key === '/dashboard') return IconGrid
  if (key === '/system') return IconFolder
  if (key === '/system/users') return IconUser
  if (key === '/system/roles') return IconUsers
  if (key === '/system/auth-debug') return IconShield
  if (key.includes('analysis')) return IconBarChart
  return IconFolder
}'''
text = resolve_pattern.sub(new_resolve, text)

with open('templates/amu-admin/src/layouts/AdminLayout.vue', 'w', encoding='utf-8') as f:
    f.write(text)
