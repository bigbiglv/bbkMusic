<script setup lang="ts">
import appStore from '@/store/appStore';
import audioStore from '@/store/audioStore';
import LyricsBar from '@/components/Lyrics/LyricsBar.vue';
import LyricsPlayBar from '@/components/Lyrics/LyricsPlayBar.vue';
import Lrc from '@/components/Lyrics/Lrc.vue';
import { storeToRefs } from 'pinia';
import { watch, reactive, ref, computed } from 'vue';
import { useDocumentVisibility } from '@vueuse/core'
const storeApp = appStore();
const storeAudio = audioStore();
const { showLrcMask } = storeToRefs(storeApp);
const { playList, currentIndex } = storeToRefs(storeAudio);

//监听是否打开歌词层
watch(showLrcMask,async (val) => {
  if(val){
    console.log('显示')
    let id = playList.value[currentIndex.value].id
    await storeAudio.getLrc(id)
      
  }else{
    console.log('隐藏')
  }
})

const visibility = useDocumentVisibility()
//监听是否在前台  
watch(visibility, (current, previous) => {
  if (current === 'visible' && previous === 'hidden') {
    console.log('visibility显示')
  }else{
    console.log('visibility隐藏')
  }
})



//歌词层top的位置
const top = computed(()=>{
  if(showLrcMask.value){
    //滑动的偏移量超过20才动
    if(posOffsetY.value > 20){
      return posOffsetY.value + 'px'
    }else{
      return '0'
    }
  }else{
    return '100%'
  }
})

// 滑动的y轴偏移量
const posOffsetY = ref(0)
function getPosOffsetY(y: number) {
  posOffsetY.value = y
}
// 是否正在滑动歌词
const isMoveLrc = ref(false)
function getisDrag(idDrag: boolean) {
  isMoveLrc.value = idDrag
}
</script>

<template>
  <div 
    class="lyr-wrap" 
    :class="{transition: !posOffsetY}"
    :style="{top: top}"
  >
    <LyricsBar @getPosOffsetY="getPosOffsetY"/>
    <Lrc @isDrag="getisDrag" />
    <LyricsPlayBar />
  </div>
</template>


<style lang="scss" scoped>
.lyr-wrap{
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  position: fixed;
  left: 0;
  &.transition{
    transition: .25s;
  }

}
</style>