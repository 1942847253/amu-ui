<template>
  <div style="display: flex">
    <ADropdown>
      <a-button type="primary"> Dropdown List <a-icon style="margin-left: 5px;" name="arrow-down" /></a-button>
      <template #dropdown>
        <a-dropdown-menu>
          <a-dropdown-item>Action 1</a-dropdown-item>
          <a-dropdown-item>Action 2</a-dropdown-item>
          <a-dropdown-item>Action 3</a-dropdown-item>
          <a-dropdown-item>Action 4</a-dropdown-item>
          <a-dropdown-item>Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
    <ADropdown @click="handleClick" split-button type="primary">
      Dropdown List
      <template #dropdown>
        <a-dropdown-menu>
          <a-dropdown-item>Action 1</a-dropdown-item>
          <a-dropdown-item>Action 2</a-dropdown-item>
          <a-dropdown-item>Action 3</a-dropdown-item>
          <a-dropdown-item>Action 4</a-dropdown-item>
          <a-dropdown-item>Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert("button click");
};
</script>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
