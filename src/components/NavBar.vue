<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const { title } = route.meta
</script>

<template>
  <div class="navbar">
    {{title}}
  </div>
</template>


<style lang="scss" scoped>
.navbar{
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}
</style>