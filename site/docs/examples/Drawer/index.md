<script setup>
import Basic from './component/Basic.vue'
import Footer from './component/Footer.vue'
import BeforeClose from './component/BeforeClose.vue'
</script>

# Drawer 抽屉

有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API

## 基础用法

呼出一个临时的侧边栏, 可以从多个方向呼出

设置 `model-value` 属性来控制 Drawer 的显示与隐藏， 通过 `title` 属性来设置标题, 默认设置是从右至左打开 `30%` 浏览器宽度。 你可以通过传入对应的 `direction` 和 `size` 属性来修改这一默认行为。
<Demo>
<Basic/>

::: details
<<< @/examples/Drawer/component/Basic.vue
:::
</Demo>

## 自定义底部内容

多用于提交 From 表单时的确定与取消按钮
<Demo>
<Footer/>

::: details
<<< @/examples/Drawer/component/Footer.vue
:::
</Demo>

## 关闭 Drawer 前的回调

可在关闭前自定义不同操作设置 `beforeClose` 属性来控制 Drawer 关闭前的某些操作，将关闭 Drawer 的权力从组件移交到用户
<Demo>
<BeforeClose/>

::: details
<<< @/examples/Drawer/component/BeforeClose.vue
:::
</Demo>
