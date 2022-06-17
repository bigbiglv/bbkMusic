<script setup lang="ts">
import audioStore from '@/store/audioStore';

import { storeToRefs } from 'pinia';
const storeAudio = audioStore();
const { showTime, showDuration, duration, progress } = storeToRefs(storeAudio)
function dragEnd(){
  storeAudio.isDrag = false
  storeAudio.setProgress(progress.value)
}
</script>

<template>
  {{showTime}}
  <van-slider 
    v-model.value="progress" 
    :min="0" 
    :max="duration" 
    @dragStart="storeAudio.isDrag = true"
    @dragEnd="dragEnd"
  />
  {{showDuration}}
</template>


<style lang="scss" scoped>

</style>