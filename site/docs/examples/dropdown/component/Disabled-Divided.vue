<template>
  <div style="display: flex">
    <ADropdown style="margin-right: 40px">
      <span class="a-dropdown-link">
        Disabled List
        <span><a-icon name="arrow-down" /></span>
      </span>
      <template #dropdown>
        <a-dropdown-menu>
            <a-dropdown-item command="a">Action 1</a-dropdown-item>
          <a-dropdown-item command="b" disabled>Action 2</a-dropdown-item>
          <a-dropdown-item command="c">Action 3</a-dropdown-item>
          <a-dropdown-item command="d" disabled>Action 4</a-dropdown-item>
          <a-dropdown-item command="e">Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
    <ADropdown>
      <span class="a-dropdown-link">
        Divided List
        <span><a-icon name="arrow-down" /></span>
      </span>
      <template #dropdown>
        <a-dropdown-menu>
          <a-dropdown-item command="a">Action 1</a-dropdown-item>
          <a-dropdown-item command="b">Action 2</a-dropdown-item>
          <a-dropdown-item command="c">Action 3</a-dropdown-item>
          <a-dropdown-item command="d" >Action 4</a-dropdown-item>
          <a-dropdown-item command="e" divided>Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
  </div>
</template>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  color: #0468dc;
  display: flex;
  align-items: center;
  span {
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
