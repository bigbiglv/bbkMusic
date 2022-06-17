<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';
import PlayerLyricsVue from '@/components/lyrics/index.vue';
import useTouch from '@/hooks/useTouch';

const storeAudio = audioStore();
const storeApp = appStore();
const { isPause, showTime, showDuration, duration, progress, playList,currentIndex } = storeToRefs(storeAudio)
const { playBarHeight, tabBarHeight } = storeToRefs(storeApp)

function dragEnd(){
  storeAudio.isDrag = false
  storeAudio.setProgress(progress.value)
}
//进度条百分比
const linePercent = computed(()=>{
  return (progress.value / duration.value * 100).toFixed(2)
})

const playBar = ref<HTMLElement | null>(null)
onMounted(()=>{
  console.log('onMounted',playBar)
  const { x, isTouch } = useTouch(playBar.value)
  watch([x, isTouch],()=>{
    if(!isTouch.value){
      if(x.value > 0){
        //向左滑动执行下一曲
        storeAudio.next()
      }else{
        //向右滑动执行上一曲
        storeAudio.prev()
      } 
    }
  })
})

</script>

<template>
  <div 
    class="play-bar" 
    :style="{height: `${playBarHeight}px`, bottom: `${playList.length ? tabBarHeight+'px' : '-100%'}`}"
    ref="playBar"
  >
    <div class="cove">
      <img :src="playList[currentIndex]?.album.artist.img1v1Url" alt="封面">
    </div>
    <div class="info" @click="storeApp.showLrcMask = true">
      {{playList[currentIndex]?.name}}
    </div>
    <div class="btns">

      <icon-ic-twotone-skip-previous @click="storeAudio.prev"/>

      <icon-ic-twotone-play-circle-filled @click="storeAudio.play" v-show="isPause"/>
      <icon-ic-twotone-pause-circle-filled @click="storeAudio.pause" v-show="!isPause"/>
      
      <icon-ic-twotone-skip-next @click="storeAudio.next"/>

    </div>
    <div class="line">
      <div class="progress" :style="{ width: `${linePercent}%` }"></div>
    </div>
    <!-- {{showTime}}
    <van-slider 
      v-model.value="progress" 
      :min="0" 
      :max="duration" 
      @dragStart="storeAudio.isDrag = true"
      @dragEnd="dragEnd"
    />
    {{showDuration}} -->
  </div>
  <PlayerLyricsVue />
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
  background-color: $yueyingbai;
  transition: .25s;
  .cove{
    width: 40px;
    height: 40px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .info{
    
  }
  .btns{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32px;
    color: $hiwanglv;
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
      background-color: $hiwanglv;
      transition: .25s;
    }
  }
}
</style>