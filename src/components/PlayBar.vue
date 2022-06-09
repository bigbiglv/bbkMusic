<script setup lang="ts">
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
const store = audioStore();
let { showTime, showDuration } = storeToRefs(store)


</script>

<template>
  <div class="play-bar">
    {{showTime}}
    {{showDuration}}
    <div class="icon">
      <icon-bxs-skip-previous-circle @click="store.prev"/>
      <icon-bxs-skip-next-circle @click="store.next"/>
      <icon-bxs-caret-right-circle @click="store.play"/>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.play-bar{
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 50px;
  left: 0;
  display: flex;
  align-items: center;
  .icon{
    font-size: 24px;
  }
}
</style>