<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const title = ref('')
const isTitleAnimate = ref(true)
watch(route,()=>{
  title.value = route.meta.title as string
  isTitleAnimate.value = true
  setTimeout(() => {
    isTitleAnimate.value = false
  }, 900);
},{immediate:true})
function go(path: string){
  router.push(path)
}
</script>

<template>
  <div class="h-12 w-screen px-2 flex justify-between items-center bg-gray-100 rounded-sm box-border">
    <h1 :class="{shake: isTitleAnimate}" class="text-xl font-semibold tracking-wider">
      {{title}}
    </h1>
    <icon-icon-park-twotone-koala-bear @click="go('/search')" v-title="'搜索'"/>
  </div>
</template>


<style scoped>
.shake {
  animation: shake 0.82s ;
}
@keyframes shake {
  0% {
    transform: translate3d(4px, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0px, 0, 0);
    opacity: 1;
  }
}
</style>