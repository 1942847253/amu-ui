<template>
  <div style="margin-bottom: 16px;">
     <p>Order #12987122 is expandable, while others are not (simulated permission control).</p>
  </div>
  <AmuTable :data="tableData" style="width: 100%" row-key="id">
    <AmuTableColumn type="expand" :expandable="checkExpandable">
      <template #default="{ row }">
        <div style="padding: 16px 24px;">
           <!-- 模拟订单详情展示 -->
           <div style="margin-bottom: 12px; font-weight: bold;">Order Details: #{{ row.id }}</div>
           <div style="display: flex; gap: 32px; font-size: 13px; color: var(--amu-text-2);">
             <div>
                <div>Shipping Address</div>
                <div style="color: var(--amu-text-1); margin-top: 4px;">{{ row.shippingAddress }}</div>
             </div>
             <div>
                <div>Status Note</div>
                <div style="color: var(--amu-text-1); margin-top: 4px;">{{ row.note }}</div>
             </div>
           </div>
           
           <!-- 子表格模拟（如购买列表） -->
           <div style="margin-top: 16px; border: 1px solid var(--amu-border-color); border-radius: 4px;">
                <div v-for="item in row.items" :key="item.name" style="display: flex; justify-content: space-between; padding: 8px 16px; border-bottom: 1px solid var(--amu-border-color);">
                    <span>{{ item.name }} x {{ item.qty }}</span>
                    <span>${{ item.price }}</span>
                </div>
                <div style="display: flex; justify-content: flex-end; padding: 8px 16px; font-weight: bold; background: var(--amu-fill-1);">
                    Total: ${{ row.total }}
                </div>
           </div>
        </div>
      </template>
    </AmuTableColumn>
    <AmuTableColumn prop="date" label="Date" width="180" />
    <AmuTableColumn prop="name" label="Customer" width="180" />
    <AmuTableColumn prop="total" label="Total Amount" />
    <AmuTableColumn prop="status" label="Status">
        <template #default="{ row }">
            <AmuTag :type="row.status === 'Completed' ? 'success' : 'warning'">{{ row.status }}</AmuTag>
        </template>
    </AmuTableColumn>
  </AmuTable>
</template>

<script setup lang="ts">
import { AmuTable, AmuTableColumn, AmuTag } from 'amu-ui'

const checkExpandable = (row: any) => {
    return row.id === '12987122'
}

const tableData = [
  {
    id: '12987122',
    date: '2024-05-01',
    name: 'Tom',
    shippingAddress: 'No. 189, Grove St, Los Angeles',
    note: 'Delivered on time',
    status: 'Completed',
    total: 129.00,
    items: [
        { name: 'Wireless Keyboard', qty: 1, price: 99.00 },
        { name: 'Mouse Pad', qty: 1, price: 30.00 }
    ]
  },
  {
    id: '12987123',
    date: '2024-05-02',
    name: 'Anne',
    shippingAddress: 'No. 189, Grove St, Los Angeles',
    note: 'Pending payment',
    status: 'Pending',
    total: 85.50,
    items: [
        { name: 'USB-C Cable', qty: 2, price: 15.00 },
        { name: 'Power Bank', qty: 1, price: 55.50 }
    ]
  },
  {
    id: '12987124',
    date: '2024-05-03',
    name: 'Jack',
    shippingAddress: 'No. 189, Grove St, Los Angeles',
    note: 'Customer requested refund',
    status: 'Refunded',
    total: 45.00,
    items: [
        { name: 'Phone Case', qty: 1, price: 45.00 }
    ]
  }
]
</script>
