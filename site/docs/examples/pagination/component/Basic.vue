<template>
   <a-pagination total="50" :current-page="currentPage" @page-change="pageChange"/>
</template>

<script setup>
import { ref } from 'vue';
const currentPage = ref(1)
const pageChange = (page)=>{
    currentPage.value = page
}
</script>
