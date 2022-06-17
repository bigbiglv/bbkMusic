<script setup lang="ts">
import audioStore from '@/store/audioStore';
import { storeToRefs } from 'pinia';
const storeAudio = audioStore();
const { playSong } = storeToRefs(storeAudio);
</script>

<template>
  <div class="navbar">
    <div>
      {{playSong.name}}
    </div>
    <!-- 按住 -->
    <div class="drag-btn">
      <icon-icon-park-twotone-format-brush />
      <!-- <icon-icon-park-solid-format-brush /> -->
    </div>
    <icon-icon-park-twotone-coconut-tree />

  </div>
</template>


<style lang="scss" scoped>
.navbar{
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  .drag-btn{
    padding: 0 20px;
  }
}
</style>