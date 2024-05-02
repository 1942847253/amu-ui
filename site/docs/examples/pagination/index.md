<script setup>
import Basic from './component/Basic.vue'
import Background from './component/Background.vue'
import ShowSizeChanger from './component/ShowSizeChanger.vue'
import AppointPage from './component/AppointPage.vue'

</script>

# Pagination 分页
当数据量过多时，使用分页分解数据。

## 基础用法
` total `表示总条目数，` size `用于设置每页显示的页码数量
<Demo>
<Basic/>

::: details
<<< @/examples/pagination/component/Basic.vue
:::
</Demo>

## 带有背景色的分页

设置` background `属性可以为分页按钮添加背景色。
<Demo>
<Background/>

::: details
<<< @/examples/pagination/component/Background.vue
:::
</Demo>

## 更改每页显示条目个数
设置` showSizeChanger `为true可以更改每页显示条目个数
<Demo>
<ShowSizeChanger/>

::: details
<<< @/examples/pagination/component/ShowSizeChanger.vue
:::
</Demo>

## 跳转至指定页码
设置` showQuickJumper `为true可以跳转至指定页码
<Demo>
<AppointPage/>

::: details
<<< @/examples/pagination/component/AppointPage.vue
:::
</Demo>

