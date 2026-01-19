<template>
  <AmuTable :data="tableData" row-key="id" style="width: 100%">
    <AmuTableColumn type="expand">
      <template #default="{ row }">
        <div style="background-color: var(--amu-fill-color-light);">
          <h4 style="margin: 0 0 12px 0;">Order Items</h4>
          <AmuTable :data="row.items" border size="small">
            <AmuTableColumn prop="name" label="Product Name" />
            <AmuTableColumn prop="sku" label="SKU" width="120" />
            <AmuTableColumn prop="price" label="Price" width="100">
               <template #default="{ row: item }">
                  ${{ item.price }}
               </template>
            </AmuTableColumn>
            <AmuTableColumn prop="qty" label="Quantity" width="100" />
            <AmuTableColumn label="Subtotal" width="120">
               <template #default="{ row: item }">
                  ${{ (item.price * item.qty).toFixed(2) }}
               </template>
            </AmuTableColumn>
          </AmuTable>
        </div>
      </template>
    </AmuTableColumn>
    <AmuTableColumn prop="orderId" label="Order ID" width="180" />
    <AmuTableColumn prop="date" label="Date" width="180" />
    <AmuTableColumn prop="customer" label="Customer" />
    <AmuTableColumn prop="total" label="Total Amount" />
  </AmuTable>
</template>

<script setup lang="ts">
import { AmuTable, AmuTableColumn } from 'amu-ui'

const tableData = [
  {
    id: '1',
    orderId: 'ORD-2024001',
    date: '2024-05-20',
    customer: 'Alice Smith',
    total: '$320.00',
    items: [
      { id: '1-1', name: 'Mechanical Keyboard', sku: 'KB-001', price: 120, qty: 1 },
      { id: '1-2', name: 'Gaming Mouse', sku: 'MS-002', price: 80, qty: 1 },
      { id: '1-3', name: 'Mouse Pad', sku: 'MP-003', price: 20, qty: 6 }
    ]
  },
  {
    id: '2',
    orderId: 'ORD-2024002',
    date: '2024-05-21',
    customer: 'Bob Johnson',
    total: '$1,299.00',
    items: [
      { id: '2-1', name: 'Ultrawide Monitor', sku: 'MN-009', price: 1299, qty: 1 }
    ]
  },
  {
    id: '3',
    orderId: 'ORD-2024003',
    date: '2024-05-22',
    customer: 'Charlie Brown',
    total: '$50.00',
    items: [
      { id: '3-1', name: 'USB-C Cable', sku: 'CB-005', price: 10, qty: 5 }
    ]
  }
]
</script>
