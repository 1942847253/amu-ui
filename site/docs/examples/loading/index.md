
<script setup>
import Basic from './component/Basic.vue'
import DiffType from './component/DiffType.vue'
</script>

# Loading 加载

加载数据时显示动效。

## 区域加载

在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。
<Demo>
<Basic/>

::: details
<<< @/examples/Loading/component/Basic.vue
:::
</Demo>

## 全屏加载
传入`global`属性时加载数据时显示全屏动画。
<Demo>
<DiffType/>

::: details
<<< @/examples/Loading/component/DiffType.vue
:::
</Demo>
