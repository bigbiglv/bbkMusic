<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';
import PlayerLyricsVue from '@/components/lyrics/index.vue';
import useTouch from '@/hooks/useTouch';

const storeAudio = audioStore();
const storeApp = appStore();
const { isPause, duration, progress, playList,currentIndex } = storeToRefs(storeAudio)
const { playBarHeight, tabBarHeight } = storeToRefs(storeApp)

//进度条百分比
const linePercent = computed(()=>{
  return (progress.value / duration.value * 100).toFixed(2)
})

const playBar = ref<HTMLElement | null>(null)
onMounted(()=>{
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

const playBarStyle = computed(()=>{
  return {
    height: playBarHeight.value + 'px',
    bottom: playList.value.length ? tabBarHeight.value + 'px' : '-100%'
  }
})

</script>

<template>
  <div 
    class="w-screen fixed left-0 px-1 box-border flex justify-between items-center duration-200 bg-gray-100" 
    :style="playBarStyle"
    ref="playBar"
  >
    <div class="w-10 h-10">
      <img class="w-full h-full" :src="playList[currentIndex]?.album.artist.img1v1Url" alt="封面">
    </div>
    <div class="info" @click="storeApp.showLrcMask = true">
      {{playList[currentIndex]?.name}}
    </div>
    <div class="btns w-1/3 flex justify-between items-center text-3xl">

      <icon-ic-twotone-skip-previous @click="storeAudio.prev"/>

      <icon-ic-twotone-play-circle-filled @click="storeAudio.play" v-show="isPause"/>
      <icon-ic-twotone-pause-circle-filled @click="storeAudio.pause" v-show="!isPause"/>
      
      <icon-ic-twotone-skip-next @click="storeAudio.next"/>

    </div>
    <div class="w-screen h-px absolute left-0 bottom-0 bg-gray-100">
      <div class="progress h-full absolute left-0 bottom-0 duration-200" :style="{ width: `${linePercent}%` }"></div>
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
.btns{
  color: $hiwanglv;
}
.progress{
  background-color: $hiwanglv;
}
</style>