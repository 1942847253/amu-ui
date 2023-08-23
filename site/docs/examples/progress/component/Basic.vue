<template>
  <div style="line-height: 30px">
    <AProgress style="width: 500px" :percentage="50" />
    <AProgress style="width: 500px" :percentage="100" :format="format" />
    <AProgress style="width: 500px" :percentage="100" status="success" />
    <AProgress style="width: 500px" :percentage="100" status="prompt" />
    <AProgress style="width: 500px" :percentage="50" status="error" />
  </div>
</template>

<script setup>
const format = (percentage) => (percentage === 100 ? "Full" : `${percentage}%`);
</script>
