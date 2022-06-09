<script setup lang="ts">
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';

const storeAudio = audioStore();
const storeApp = appStore();
const { showTime, showDuration } = storeToRefs(storeAudio)
const { playBarHeight, tabBarHeight } = storeToRefs(storeApp)

</script>

<template>
  <div class="play-bar" :style="{height: `${playBarHeight}px`, bottom: `${tabBarHeight}px`}">
    {{showTime}}
    {{showDuration}}
    <div class="icon">
      <icon-bxs-skip-previous-circle @click="storeAudio.prev"/>
      <icon-bxs-skip-next-circle @click="storeAudio.next"/>
      <icon-bxs-caret-right-circle @click="storeAudio.play"/>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.play-bar{
  width: 100%;
  position: fixed;
  left: 0;
  display: flex;
  align-items: center;
  transition: .25s;
  .icon{
    font-size: 24px;
  }
}
</style>