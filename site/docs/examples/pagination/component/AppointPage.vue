<template>
    <a-pagination total="80" :current-page="currentPage" @page-change="pageChange" background  showSizeChanger showQuickJumper/>
 </template>
 
 <script setup>
 import { ref } from 'vue';
 
 const currentPage = ref(1)
 const pageChange = (page)=>{
     currentPage.value = page
 }
 </script>
 