<script setup lang="ts">
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';

const storeAudio = audioStore();
const storeApp = appStore();
const { showTime, showDuration, duration, progress } = storeToRefs(storeAudio)
const { playBarHeight, tabBarHeight } = storeToRefs(storeApp)

function dragEnd(){
  storeAudio.isDrag = false
  storeAudio.setProgress(progress.value)
}
</script>

<template>
  <div class="play-bar" :style="{height: `${playBarHeight}px`, bottom: `${tabBarHeight}px`}">
    {{showTime}}
    <van-slider 
      v-model.value="progress" 
      :min="0" 
      :max="duration" 
      @dragStart="storeAudio.isDrag = true"
      @dragEnd="dragEnd"
    />
    {{showDuration}}
    <div class="icon">
      <icon-bxs-skip-previous-circle @click="storeAudio.prev"/>
      <icon-bxs-caret-right-circle @click="storeAudio.play"/>
      <icon-bxs-skip-next-circle @click="storeAudio.next"/>
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