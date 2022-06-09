<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';

const storeAudio = audioStore();
const storeApp = appStore();
const { isPause, showTime, showDuration, duration, progress } = storeToRefs(storeAudio)
const { playBarHeight, tabBarHeight } = storeToRefs(storeApp)

function dragEnd(){
  storeAudio.isDrag = false
  storeAudio.setProgress(progress.value)
}
//进度条百分比
const linePercent = computed(()=>{
  return (progress.value / duration.value * 100).toFixed(2)
})
</script>

<template>
  <div class="play-bar" :style="{height: `${playBarHeight}px`, bottom: `${tabBarHeight}px`}">
    <div class="cove"></div>
    <div class="info"></div>
    <div class="btn">
      <icon-bxs-skip-previous-circle @click="storeAudio.prev"/>

      <icon-bxs-caret-right-circle @click="storeAudio.play" v-show="isPause"/>
      <icon-bxs-building-house @click="storeAudio.pause" v-show="!isPause"/>
      
      <icon-bxs-skip-next-circle @click="storeAudio.next"/>
    </div>
    <div class="line">
      <div class="progress" :style="{ width: `${linePercent}%` }"></div>
    </div>
    {{showTime}}
    <van-slider 
      v-model.value="progress" 
      :min="0" 
      :max="duration" 
      @dragStart="storeAudio.isDrag = true"
      @dragEnd="dragEnd"
    />
    {{showDuration}}
  </div>
</template>


<style lang="scss" scoped>
.play-bar{
  width: 100%;
  position: fixed;
  left: 0;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // transition: .25s;
  .info{
    
  }
  .btn{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
  }
  .line{
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #eee;
    .progress{
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: rgb(255, 196, 196);
      transition: .25s;
    }
  }
}
</style>