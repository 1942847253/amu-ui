<template>
    <a-pagination showTotal total="60" :pageSize="7" :current-page="currentPage" @page-change="pageChange" background  showSizeChanger/>
 </template>
 <script setup>
 
 import { ref } from 'vue';
 const currentPage = ref(1)
 const pageChange = (page)=>{
     currentPage.value = page
 }
 </script>
 