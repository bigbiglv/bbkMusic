<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { title } = route.meta
function go(path: string){
  router.push(path)
}
</script>

<template>
  <div class="navbar">
    {{title}}
    <icon-bxs-search-alt-2 @click="go('/search')"/>
  </div>
</template>


<style lang="scss" scoped>
.navbar{
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
</style>