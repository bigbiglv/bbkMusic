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
})
function go(path: string){
  router.push(path)
}
</script>

<template>
  <div class="navbar">
    <span :class="{shake: isTitleAnimate}">
      {{title}}
    </span>
    <icon-icon-park-twotone-koala-bear  @click="go('/search')"/>
  </div>
</template>


<style lang="scss" scoped>
.navbar{
  font-size: 20px;
  height: 50px;
  font-weight: 600;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: aliceblue;
}
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