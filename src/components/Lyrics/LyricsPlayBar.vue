<script setup lang="ts">
import audioStore from '@/store/audioStore';

import { storeToRefs } from 'pinia';
const storeAudio = audioStore();
const { showTime, showDuration, duration, progress, isPause } = storeToRefs(storeAudio)
function dragEnd(){
  storeAudio.isDrag = false
  storeAudio.setProgress(progress.value)
}
</script>

<template>
<div>

  <van-slider 
    v-model.value="progress" 
    :min="0" 
    :max="duration" 
    @dragStart="storeAudio.isDrag = true"
    @dragEnd="dragEnd"
  />
  <div>
    {{showTime}}
    {{showDuration}}
  </div>
</div>
  <div class="btns">
    <icon-ic-twotone-skip-previous @click="storeAudio.prev"/>

    <icon-ic-twotone-play-circle-filled @click="storeAudio.play" v-show="isPause"/>
    <icon-ic-twotone-pause-circle-filled @click="storeAudio.pause" v-show="!isPause"/>
    
    <icon-ic-twotone-skip-next @click="storeAudio.next"/>
  </div>
</template>


<style lang="scss" scoped>
.btns{
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 32px;
   color: $hiwanglv;
}
</style>