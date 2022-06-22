<script setup lang="ts">
import Tabbar from '@/components/Tabbar.vue'
import Player from '@/components/Player/index.vue'
import NavBar from '@/components/NavBar.vue'
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import appStore from '@/store/appStore'
const storeApp = appStore()
const { playBarHeight, tabBarHeight } = storeToRefs(storeApp)
const paddingBottom = computed(()=>{
  return `padding-bottom: ${playBarHeight.value + tabBarHeight.value}px`
})


</script>

<template>
    <router-view>
      <template #default="{ Component, route }">
        <NavBar v-if="route.meta.navbar"/>
        <transition name="fade-slide" mode="out-in" appear>
          <component :is="Component" :key="route.fullPath" :style="paddingBottom" />
        </transition>
      </template>
    </router-view>

    <Tabbar />
    <Player />
</template>

<style>
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.25s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
