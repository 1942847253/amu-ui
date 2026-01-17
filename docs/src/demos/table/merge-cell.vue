<template>
  <div>
    <h4>合并行</h4>
    <p>多行共用一个单元格。</p>
    <AmuTable 
      :data="tableData" 
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
    >
      <AmuTableColumn type="selection" width="55" />
      <AmuTableColumn prop="id" label="ID" width="180" />
      <AmuTableColumn prop="name" label="Name" min-width="120" />
      <AmuTableColumn prop="amount1" label="Amount 1" min-width="120" sortable />
      <AmuTableColumn prop="amount2" label="Amount 2" min-width="120" sortable />
      <AmuTableColumn prop="amount3" label="Amount 3" min-width="120" sortable />
    </AmuTable>

    <h4 style="margin-top: 20px">合并列</h4>
    <p>多列共用一个单元格。</p>
    <AmuTable
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <AmuTableColumn prop="id" label="ID" width="180" />
      <AmuTableColumn prop="name" label="Name" min-width="120" />
      <AmuTableColumn prop="amount1" label="Amount 1" min-width="120" sortable />
      <AmuTableColumn prop="amount2" label="Amount 2" min-width="120" sortable />
      <AmuTableColumn prop="amount3" label="Amount 3" min-width="120" sortable />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { AmuTable, AmuTableColumn } from 'amu-ui/table'

interface User {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

interface SpanMethodProps {
  row: User
  column: any
  rowIndex: number
  columnIndex: number
}

const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  // 0: Selection, 1: ID, 2: Name, 3: Amount 1, ...
  if (columnIndex === 3) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}

const arraySpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2]
    } else if (columnIndex === 1) {
      return [0, 0]
    }
  }
}

const tableData: User[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
]
</script>
