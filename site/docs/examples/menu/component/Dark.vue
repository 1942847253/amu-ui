<template>
  <AMenu default-active="5-2" dark>
    <AMenuItem index="1">
      <template #icon>◎</template>
      <span>Dashboard</span>
    </AMenuItem>
    <AMenuItem index="2">
      <template #icon>◎</template>
      <span>Revenue</span>
    </AMenuItem>
    <AMenuItem index="3">
      <template #icon> ◎ </template>
      <span>Notifications</span>
    </AMenuItem>
    <ASubMenu index="5">
      <template #icon
        ><svg
          style="height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"
            fill="currentColor"
          ></path></svg
      ></template>
      <template #title>SubItem</template>
      <ASubMenu index="5-1">
        <template #icon> ◎ </template>
        <template #title>SubItem</template>
        <AMenuItem index="5-1-2">
          <template #icon> ◎ </template>
          <span>Sub-test1</span>
        </AMenuItem>
      </ASubMenu>
      <AMenuItem index="5-2">
        <template #icon> ◎ </template>
        <span>Sub-Revenue</span>
      </AMenuItem>
      <AMenuItem index="5-3">
        <template #icon> ◎ </template>
        <span>Sub-Notif</span>
      </AMenuItem>
    </ASubMenu>
    <ASubMenu index="6">
      <template #icon
        ><svg
          style="height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"
            fill="currentColor"
          ></path></svg
      ></template>
      <template #title>Sub1Item</template>
      <AMenuItem index="6-1">
        <template #icon> ◎ </template>
        <span>Sub1-Wallets</span>
      </AMenuItem>
      <AMenuItem index="6-2">
        <template #icon> ◎ </template>
        <span>Sub1-Revenue</span>
      </AMenuItem>
      <AMenuItem index="6-3">
        <template #icon> ◎ </template>
        <span>Sub1-Notif</span>
      </AMenuItem>
    </ASubMenu>
  </AMenu>
</template>
