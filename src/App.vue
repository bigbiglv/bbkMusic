<script setup lang="ts">
import Tabbar from '@/components/Tabbar.vue';
import Player from '@/components/Player.vue';
</script>

<template>
  <!-- <router-view /> -->

  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="Component" :key="route.fullPath"/>
      </transition>
    </template>
  </router-view>

  <Tabbar />
  <Player />
</template>

<style>
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
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
