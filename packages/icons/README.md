# @amu-ui/icons

Icon component library for amu-ui, providing a flexible and extensible icon system.

## Features

- 🎨 **Flexible**: Support for custom colors and sizes
- 🔄 **Multiple Formats**: ESM and CJS builds
- 📦 **Tree-shakeable**: Import only the icons you need
- 🎯 **TypeScript**: Full type support
- 🌗 **Theme-aware**: Supports amu-ui theming system

## Installation

```bash
npm install @amu-ui/icons
# or
pnpm add @amu-ui/icons
# or
yarn add @amu-ui/icons
```

## Usage

### Global Registration

```ts
import { createApp } from 'vue'
import AmuIcons from '@amu-ui/icons'
import '@amu-ui/icons/style.css'

const app = createApp(App)
app.use(AmuIcons)
```

### Individual Import

```vue
<script setup lang="ts">
import { AmuIcon, IconSearch, IconClose } from '@amu-ui/icons'
</script>

<template>
  <AmuIcon :size="24" color="primary">
    <IconSearch />
  </AmuIcon>
  
  <AmuIcon :size="20">
    <IconClose />
  </AmuIcon>
</template>
```

### On-demand Import

```vue
<script setup lang="ts">
import AmuIcon from '@amu-ui/icons/icon'
import IconSearch from '@amu-ui/icons/icons/search'
</script>

<template>
  <AmuIcon>
    <IconSearch />
  </AmuIcon>
</template>
```

## API

### Icon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `number \| string` | `16` | Icon size in pixels |
| color | `string` | `'currentColor'` | Icon color (CSS color or theme variable) |
| spin | `boolean` | `false` | Whether the icon should rotate |

## Development

### Generate Icons from SVG

Place your SVG files in the `svg/` directory and run:

```bash
pnpm run generate
```

This will generate Vue components for each SVG file.

## License

MIT

## Credits

This project uses icons from [Feather Icons](https://feathericons.com/), licensed under the MIT License.

