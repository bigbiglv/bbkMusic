<script setup lang="ts">
import Tabbar from '@/components/Tabbar.vue';
import Player from '@/components/Player.vue';
</script>

<template>
  <router-view />
  <Tabbar />
  <Player />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
