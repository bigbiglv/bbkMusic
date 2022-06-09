<script setup lang="ts">
import appStore from '@/store/appStore';
import { storeToRefs } from 'pinia';
const storeApp = appStore();
const { showLrcMask } = storeToRefs(storeApp);
</script>

<template>
  <div class="lyr-wrap" :style="{top: `${showLrcMask ? '0' : '100%'}`}">

  </div>
</template>


<style lang="scss" scoped>
.lyr-wrap{
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  position: fixed;
  left: 0;
  
}
</style>