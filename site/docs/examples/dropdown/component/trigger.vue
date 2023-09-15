<template>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 100px;">
            <span class="demonstration">hover to trigger</span>
            <a-dropdown>
                <span class="a-dropdown-link">
                    Dropdown List
                    <span><a-icon name="arrow-down" /></span>
                </span>
                <template #dropdown>
                    <a-dropdown-menu>
                        <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
                        <a-dropdown-item command="b" icon="add-circle">Action 2</a-dropdown-item>
                        <a-dropdown-item command="c" icon="select-bold">Action 3</a-dropdown-item>
                        <a-dropdown-item command="d" icon="success-filling">Action 4</a-dropdown-item>
                        <a-dropdown-item command="e" icon="success">Action 5</a-dropdown-item>
                    </a-dropdown-menu>
                </template>
            </a-dropdown>
        </div>
        <div>
            <span class="demonstration">click to trigger</span>
            <a-dropdown trigger="click">
                <span class="a-dropdown-link">
                    Dropdown List
                    <span><a-icon name="arrow-down" /></span>
                </span>
                <template #dropdown>
                    <a-dropdown-menu>
                        <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
                        <a-dropdown-item command="b" icon="add-circle">Action 2</a-dropdown-item>
                        <a-dropdown-item command="c" icon="select-bold">Action 3</a-dropdown-item>
                        <a-dropdown-item command="d" icon="success-filling">Action 4</a-dropdown-item>
                        <a-dropdown-item command="e" icon="success">Action 5</a-dropdown-item>
                    </a-dropdown-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.demonstration {
    display: block;
    color: #909399;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
