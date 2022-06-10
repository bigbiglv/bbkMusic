<script setup lang="ts">
import appStore from '@/store/appStore';
import audioStore from '@/store/audioStore';
import { storeToRefs } from 'pinia';
import { watch, reactive } from 'vue';
import { useDocumentVisibility } from '@vueuse/core'
const storeApp = appStore();
const storeAudio = audioStore();
const { showLrcMask } = storeToRefs(storeApp);
const { playList, currentIndex } = storeToRefs(storeAudio);
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
interface IPos{
  Y: number,
  offsetY: number
}
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
  // console.log('touchend',e)
  let Y = e.changedTouches[0].clientY;
  //偏差
  position.offsetY = position.Y - Y;
}
function handleTouchMove(e: TouchEvent){
  // console.log('touchmove',e)
  if(position.offsetY > 0 && Math.abs(position.offsetY) > 20){
    console.log('向下滑动')
    //关闭遮罩
    showLrcMask.value = false
  } 
  if(position.offsetY < 0 && Math.abs(position.offsetY) > 20) console.log('向上滑动');
}

</script>

<template>
  <div 
    class="lyr-wrap" 
    :style="{top: `${showLrcMask ? '0' : '100%'}`}"
    @touchstart="handleTouchStart($event)"
    @touchmove="handleTouchMove($event)"
    @touchend="handleTouchEnd($event)"
  >
    <div class="lyr-mask" @click="showLrcMask = false">关闭</div>
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
}
</style>