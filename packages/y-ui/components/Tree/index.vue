<template>
  <Tree :data="data" :isSelect="isSelect" :props="props" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, reactive, toRefs } from "vue";
import Tree from './Tree.vue';
import $bus from "../../bus/bus";

export default defineComponent({
  name: "YTree",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "title",
          key: 'id',
        }
      }
    }
  },
  components: {
    Tree,
  },
  emits: ['operation', 'node-click', 'change', 'checked'],
  setup(props, { emit }) {
    onBeforeMount(() => {
      initEvent();
    })

    onBeforeUnmount(() => {
      $bus.$off('operation')
      $bus.$off('node-click')
      $bus.$off('change')
      $bus.$off('checked')
    })

    const initEvent = () => {
      $bus.$on('operation', ({ type, treeNode }: any) => {
        emit('operation', { type, treeNode })
      })

      $bus.$on('node-click', (item: any) => {
        emit('node-click', item)
      })

      $bus.$on('change', (item: any) => {
        emit('change', item)
      })

      $bus.$on('checked', (item: any) => {
        emit('checked', item)
      })

    }
    return {
    }
  }

})
</script>