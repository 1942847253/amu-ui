import { ref, computed, watch, toRef } from 'vue';
import type { TableProps, TableColumn } from '../props';
import { get } from 'lodash-es'; // Assumes lodash-es is available, or use utils

// 简易 get helper
function getValueByPath(obj: any, path: string) {
  return path.split('.').reduce((o, k) => (o || {})[k], obj);
}

export function useData(props: TableProps) {
  const data = toRef(props, 'data');
  
  const sortState = ref<{ prop: string; order: 'ascending' | 'descending' | null }>({
    prop: '',
    order: null
  });

  const sortedData = computed(() => {
    const rawData = [...(data.value || [])];
    const { prop, order } = sortState.value;
    
    if (!prop || !order) return rawData;

    rawData.sort((a, b) => {
      const valA = getValueByPath(a, prop);
      const valB = getValueByPath(b, prop);
      
      if (valA === valB) return 0;
      
      const result = valA > valB ? 1 : -1;
      return order === 'ascending' ? result : -result;
    });

    return rawData;
  });

  const handleSort = (column: TableColumn, prop: string) => {
    // 切换排序逻辑
    if (sortState.value.prop === prop) {
      sortState.value.order = sortState.value.order === 'ascending' ? 'descending' : null;
    } else {
      sortState.value.prop = prop;
      sortState.value.order = 'ascending';
    }
  };

  return {
    tableData: sortedData,
    sortState,
    handleSort
  };
}
