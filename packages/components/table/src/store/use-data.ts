import { ref, computed, watch, toRef, type Ref } from 'vue';
import type { TableProps, TableColumn } from '../props';

// 简易 get helper
function getValueByPath(obj: any, path: string) {
  if (!obj || !path) return '';
  return path.split('.').reduce((o, k) => (o || {})[k], obj);
}

export function useData(props: TableProps, columns: Ref<TableColumn[]>, emit: any) {
  const data = toRef(props, 'data');
  
  // Filter State: columnProp (or id) -> values[]
  const filters = ref<Record<string, any[]>>({});

  const sortState = ref<{ prop: string; order: 'ascending' | 'descending' | null }>({
    prop: '',
    order: null
  });

  const tableData = computed(() => {
    let result = [...(data.value || [])];

    // 1. Filter Logic
    Object.keys(filters.value).forEach((key) => {
        const values = filters.value[key];
        if (!values || values.length === 0) return;

        // 尝试通过 prop 或 id 找到列
        const column = columns.value.find(c => c.prop === key || c.id === key);
        if (column && column.filterMethod) {
            result = result.filter(row => {
                // 多选模式下是 OR 关系 (some)
                return values.some(val => column.filterMethod!(val, row, column));
            });
        }
    });

    // 2. Sort Logic
    const { prop, order } = sortState.value;
    
    if (prop && order) {
      result.sort((a, b) => {
        const valA = getValueByPath(a, prop);
        const valB = getValueByPath(b, prop);
        
        if (valA === valB) return 0;
        
        const compareRes = valA > valB ? 1 : -1;
        return order === 'ascending' ? compareRes : -compareRes;
      });
    }

    return result;
  });

  const handleSort = (column: TableColumn, prop: string) => {
    // 切换排序逻辑
    if (sortState.value.prop === prop) {
      if (sortState.value.order === 'ascending') {
        sortState.value.order = 'descending';
      } else {
        sortState.value.order = null;
        sortState.value.prop = ''; // Clear prop to reset sort state completely
      }
    } else {
      sortState.value.prop = prop;
      sortState.value.order = 'ascending';
    }
    emit('sort-change', { column, prop, order: sortState.value.order });
  };

  const handleFilterChange = (key: string, values: any[]) => {
      filters.value[key] = values;
      // Emit filter-change event with all filters
      emit('filter-change', { ...filters.value });
  };

  return {
    tableData,
    sortState,
    filters,
    handleSort,
    handleFilterChange
  };
}
