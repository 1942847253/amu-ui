<script setup>
import Basic from './component/Basic.vue'
import CustomSize from './component/CustomSize.vue'
import Column from './component/Column.vue'
import Size from './component/Size.vue'
</script>

# Scrollbar 滚动条

天下苦浏览器原生滚动条久矣，试试这个。

## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<
<template>
  <AScrollbar :style="{ height: '400px' }">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </AScrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #007bff0a;
  color: var(--a-primary-color);
}
</style>
```

</details>

## 横向滚动

设置 `x-scrollable` 为 `true` 当元素宽度大于滚动条宽度时，会显示横向滚动条。

<div class="example">
 <Column/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-scrollbar x-scrollable>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </a-scrollbar>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #f53f3f08;
  color: var(--a-error-color);
}
</style>
```

</details>

## 触发方式

你可以设定不同的触发方式，`trigger="none"` 会让滚动条一直显示，`trigger="hover"` 会让滚动条在鼠标悬浮的时候显示。

<div class="example">
 <Size/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-scrollbar style="max-height: 320px" trigger="none">
    <article>
      <p>鸡你太美</p>
      <p>菜虚鲲</p>
      <p>迎面走来的你让我如此蠢蠢欲动<br></p>
      <p>这种感觉我从未有<br></p>
      <p>Cause I got a crush on you who you<br></p>
      <p>你是我的我是你的谁<br></p>
      <p>再多一眼看一眼就会爆炸<br></p>
      <p>再近一点靠近点快被融化<br></p>
      <p>想要把你占为己有baby bae<br></p>
      <p>不管走到哪里都会想起的人是你 you you<br></p>
      <p>我应该拿你怎样<br></p>
      <p>uh 所有人都在看着你<br></p>
      <p>我的心总是不安<br></p>
      <p>oh 我现在已病入膏肓<br></p>
      <p>eh eh 难道真的因为你而疯狂吗<br></p>
      <p>我本来不是这种人<br></p>
      <p>因你变成奇怪的人<br></p>
      <p>第一次呀变成这样的我<br></p>
      <p>不管我怎么去否认<br></p>
      <p>鸡你太美 baby 鸡你太美 baby<br></p>
      <p>鸡你实在是太美 baby 鸡你太美 baby<br></p>
      <p>oh eh oh 现在确认地告诉我<br></p>
      <p>oh eh oh 你到底属于谁<br></p>
      <p>oh eh oh 现在确认地告诉我<br></p>
      <p>oh eh oh 你到底属于谁 就是现在告诉我<br></p>
      <p>跟着这节奏 缓缓 make wave<br></p>
      <p>甜蜜的奶油 it"s your birthday cake<br></p>
      <p>男人们的 game call me 你恋人<br></p>
      <p>别被欺骗愉快的 I wanna play<br></p>
      <p>我的脑海每分每秒只为你一人沉醉<br></p>
      <p>最迷人让我神魂颠倒是你身上香水<br></p>
      <p>oh right baby I"m fall in love with you<br></p>
      <p>我的一切你都拿走只要有你就已足够<br></p>
      <p>我到底应该怎样<br></p>
      <p>uh 我心里一直很不安<br></p>
      <p>其他男人们的视线<br></p>
      <p>Oh 全都只看向你的脸<br></p>
      <p>Eh eh 难道真的因为你而疯狂吗<br></p>
      <p>我本来不是这种人<br></p>
      <p>因你变成奇怪的人<br></p>
      <p>第一次呀变成这样的我<br></p>
      <p>不管我怎么去否认<br></p>
      <p>鸡你太美 baby 鸡你太美 baby<br></p>
      <p>鸡你实在是太美 baby 鸡你太美 baby<br></p>
      <p>我愿意把我的全部都给你<br></p>
      <p>我每天在梦里都梦见你还有我闭着眼睛也能看到你<br></p>
      <p>现在开始我只准你看我<br></p>
      <p>I don’t wanna wake up in dream 我只想看你这是真心话<br></p>
      <p>鸡你太美 baby 鸡你太美 baby<br></p>
      <p>鸡你实在是太美 baby 鸡你太美 baby<br></p>
      <p>oh eh oh 现在确认的告诉我<br></p>
      <p>oh eh oh 你到底属于谁<br></p>
      <p>oh eh oh 现在确认的告诉我<br></p>
      <p>oh eh oh 你到底属于谁就是现在告诉我</p>
    </article>
  </a-scrollbar>
</template>

<style scoped>
p{
  text-align: center;
  font-weight: 700;
}
</style>

```

</details>

## Scrollbar API

| 属性名       | 说明                                  | 类型                  | 默认值      |
| ------------ | ------------------------------------- | --------------------- | ----------- |
| trigger      | 显示滚动条的时机，'none' 表示一直显示 | `'hover' / 'none'   ` | `'hover'`   |
| x-scrollable | 是否可以横向滚动                      | `boolean`             | `false`     |
| on-scroll    | 滚动的回调                            | `(e: Event) => void`  | `undefined` |
