<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { UserInfo } from '@/api'
UserInfo().then(res => {
  console.log(res)
}).catch(err => {
  console.log('err',err)
})
</script>

<template>
  <div>
    <!-- <NavBar /> -->
    <router-link to="/login">login</router-link>
  </div>
</template>


<style scoped>
</style>