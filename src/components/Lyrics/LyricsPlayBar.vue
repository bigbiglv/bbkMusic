<script setup lang="ts">
import audioStore from '@/store/audioStore';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
const storeAudio = audioStore();
const { showTime, showDuration, duration, progress, isPause, playList, currentIndex } = storeToRefs(storeAudio)
function dragEnd(){
  storeAudio.isDrag = false
  storeAudio.setProgress(progress.value)
}

const isShowList = ref(false)
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

    <icon-icon-park-twotone-music-list @click="isShowList = true"/> 

    <van-popup 
      v-model:show="isShowList"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-cell 
        v-for="(song,index) in playList" 
        :key="song['id']" 
        :title="song['name']" 
      >
      <icon-icon-park-twotone-play v-if="currentIndex === index"/>
      </van-cell>
    </van-popup>
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