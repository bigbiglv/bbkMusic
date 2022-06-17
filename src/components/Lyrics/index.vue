<script setup lang="ts">
import appStore from '@/store/appStore';
import audioStore from '@/store/audioStore';
import LyricsBar from '@/components/Lyrics/LyricsBar.vue';
import LyricsPlayBar from '@/components/Lyrics/LyricsPlayBar.vue';
import { storeToRefs } from 'pinia';
import { watch, reactive, ref, computed } from 'vue';
import { useDocumentVisibility } from '@vueuse/core'
const storeApp = appStore();
const storeAudio = audioStore();
const { showLrcMask } = storeToRefs(storeApp);
const { playList, currentIndex, lrc, lrcIndex } = storeToRefs(storeAudio);

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
//监听歌词变化
watch(lrcIndex,()=>{
  if(showLrcMask.value && !isMoveLrc.value) setLrcLoc()
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
//设置当前歌词段落的位置
function setLrcLoc(){
  let list = document.getElementById('list')
  let listHeight = list.offsetHeight
  let id = `lyrRef${lrcIndex.value}`
  let lyrRef = document.getElementById(id).offsetTop
  list?.scrollTo({top:lyrRef-listHeight/2,behavior: "smooth"})
}


//歌词层top的位置
const top = computed(()=>{
  if(showLrcMask.value){
    //滑动的偏移量超过20才动
    if(posOffsetY.value < -20){
      return -posOffsetY.value + 'px'
    }else{
      return '0'
    }
  }else{
    return '100%'
  }
})

//是否正在滑動歌詞
const isMoveLrc = ref(false)
function handleTouchStartLrc(e: TouchEvent){
  e.stopPropagation();
  isMoveLrc.value = true
  console.log('lrctouch')
}
function handleTouchMoveLrc(e: TouchEvent){
  e.stopPropagation();
  console.log('lrctouch')
}
function handleTouchEndLrc(){
  isMoveLrc.value = false
  console.log('lrctouch')
}
const posOffsetY = ref(0)
function getPosOffsetY(val){
  posOffsetY.value = val
}
</script>

<template>
  
  <div 
    class="lyr-wrap" 
    :class="{transition: !posOffsetY}"
    :style="{top: top}"

  >
    <LyricsBar @getPosOffsetY="getPosOffsetY"/>
    <div 
      class="lyr-list" 
      id="list"
      @touchstart="handleTouchStartLrc($event)"
      @touchend="handleTouchEndLrc($event)"
      @touchmove="handleTouchMoveLrc($event)"
    >
      <p 
        v-for="(item,keys,index) in lrc" 
        :class="[index === lrcIndex  ? 'on' : '']"
        :key="keys" 
        :id="'lyrRef' + index"
      >
        {{item}}
      </p>
    </div>
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
  .lyr-list{
    width: 80%;
    height: 80%;
    margin: 0 auto;
    overflow-y: scroll;
    text-align: center;
    &::-webkit-scrollbar{
      display: none;
    }
    .on{
      color: $hiwanglv;
      font-size: 18px;
      transition: .25s;
    }
  }
}
</style>