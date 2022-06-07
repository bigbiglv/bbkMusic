<script setup lang="ts">
import { routes } from '../router/routes'
import { useRouter } from 'vue-router'
const router = useRouter()
const tabbar = routes.filter(el => el.meta?.tabbar)

function go(path : string){
  router.push(path)
}

console.log( tabbar )
</script>

<template>
  <div class="tabbar">
    <div v-for="(item,index) in tabbar" :key="index" @click="go(item.path)">
      <icon-ep-home-filled />
      {{item.name}}
    </div>
  </div>
</template>


<style scoped>
.tabbar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>