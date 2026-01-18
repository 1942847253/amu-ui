<template>
  <div>
    <div style="margin-bottom: 16px">
      <AmuRadioGroup v-model="size">
        <AmuRadioButton label="large">Large</AmuRadioButton>
        <AmuRadioButton label="default">Default</AmuRadioButton>
        <AmuRadioButton label="small">Small</AmuRadioButton>
      </AmuRadioGroup>
    </div>
    
    <AmuTable 
      :data="tableData" 
      :size="size"
      border
    >
      <AmuTableColumn prop="sku" label="SKU 编号" width="140" />
      <AmuTableColumn prop="product" label="商品名称" width="180" />
      <AmuTableColumn prop="category" label="分类" width="120" />
      <AmuTableColumn prop="price" label="单价" width="100" />
      <AmuTableColumn prop="stock" label="库存" />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref('default')

const tableData = [
  { sku: 'SP-100234', product: '无线降噪耳机', category: '数码音频', price: '¥1,299', stock: 45 },
  { sku: 'SP-100235', product: '机械键盘 Pro', category: '电脑外设', price: '¥899', stock: 120 },
  { sku: 'SP-100236', product: '4K 显示器', category: '电脑外设', price: '¥2,499', stock: 18 },
  { sku: 'SP-100237', product: '智能手表 Gen5', category: '智能穿戴', price: '¥1,599', stock: 60 },
]
</script>
