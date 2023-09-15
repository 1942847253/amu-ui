<template>
  <ADropdown>
    <span class="a-dropdown-link">
      Dropdown List
      <span><a-icon name="arrow-down" /></span>
    </span>
    <template #dropdown>
      <a-dropdown-menu>
        <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
        <a-dropdown-item disabled command="b" icon="add-circle">Action 2</a-dropdown-item>
        <a-dropdown-item command="c" icon="select-bold">Action 3</a-dropdown-item>
        <a-dropdown-item command="d" icon="success-filling" disabled>Action 4</a-dropdown-item>
        <a-dropdown-item command="e" icon="success" divided>Action 5</a-dropdown-item>
      </a-dropdown-menu>
    </template>
  </ADropdown>
</template>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  color: #0468dc;
  display: flex;
  align-items: center;
  span{
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
