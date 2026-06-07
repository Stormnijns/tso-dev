<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 id="title">{{ name }}</h1>
</template>

<style scoped></style>
