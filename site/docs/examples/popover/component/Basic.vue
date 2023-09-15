<template>
  <APopover
    title="Title"
    content="this is content, this is content, this is content"
    placement="top"
    trigger="hover"
    width="200px"
  >
    <template #reference>
      <a-button type="primary">Hover to activate</a-button>
    </template>
  </APopover>
  <APopover
   trigger='click'
    title="Title"
    width="200px"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <a-button type="primary">Click to activate</a-button>
    </template>
  </APopover>
</template>
