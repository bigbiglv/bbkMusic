<script setup lang="ts">
import appStore from '@/store/appStore';
import audioStore from '@/store/audioStore';
import { storeToRefs } from 'pinia';
import { watch, reactive, ref, computed } from 'vue';
import { useDocumentVisibility } from '@vueuse/core'
const storeApp = appStore();
const storeAudio = audioStore();
const { showLrcMask } = storeToRefs(storeApp);
const { playList, currentIndex, lrc, progress } = storeToRefs(storeAudio);

//监听是否打开歌词层
watch(showLrcMask,(val) => {
  if(val){
    console.log('显示')
    let id = playList.value[currentIndex.value].id
    storeAudio.getLrc(id)
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
    if(position.offsetY < -20){
      return -position.offsetY + 'px'
    }else{
      return '0'
    }
  }else{
    return '100%'
  }
})
interface IPos{
  Y: number,
  offsetY: number
}
//歌词层y轴的偏移量
const position = reactive<IPos>({
  Y: 0,
  offsetY: 0
})

function handleTouchStart(e: TouchEvent){
  // console.log('touchstart',e)
  //阻止默认事件
  e.preventDefault();
  //初始化位置
  position.Y = e.changedTouches[0].clientY;
}
function handleTouchEnd(e: TouchEvent){
  //向下滑动 超过一定值就关闭歌词层
  position.offsetY < -300 ? showLrcMask.value = false : ''  
  position.offsetY = 0

}
function handleTouchMove(e: TouchEvent){
  //偏差
  let Y = e.changedTouches[0].clientY;
  position.offsetY = position.Y - Y;
}
//当前播放的下标
let lrcIndex = ref(0)
let lrcKeys = Object.keys(lrc.value)
//监听进度设置当前唱到的歌词的下标
watch(progress,(value)=>{
  for( let i = 0; i < lrcKeys.length; i++){
    if(value >= Number(lrcKeys[i])){
      lrcIndex.value = i
    }
  }
})
</script>

<template>
  <div 
    class="lyr-wrap" 
    :style="{top: top}"
    @touchstart="handleTouchStart($event)"
    @touchmove="handleTouchMove($event)"
    @touchend="handleTouchEnd($event)"
  >
    <div class="" @click="showLrcMask.value = false">关闭</div>
    <div class="lyr-list">
      <p v-for="(item,keys,index) in lrc" :key="keys" :class="[index === lrcIndex  ? 'on' : '']">
        {{item}}{{index}}
      </p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.lyr-wrap{
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  position: fixed;
  left: 0;
  transition: .25s;
  .lyr-list{
    width: 80%;
    height: 80%;
    margin: 0 auto;
    overflow-y: scroll;
    text-align: center;
    .on{
      color: aquamarine;
    }
  }
}
</style>