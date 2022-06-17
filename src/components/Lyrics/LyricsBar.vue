<script setup lang="ts">
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
const storeAudio = audioStore();
const storeApp = appStore();
const { playSong } = storeToRefs(storeAudio);
const { showLrcMask } = storeToRefs(storeApp);
function closeLrc(){
  showLrcMask.value = false
}
const emit = defineEmits(['getPosOffsetY'])

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
  emit('getPosOffsetY',position.offsetY)
}
function handleTouchMove(e: TouchEvent){
  //偏差
  let Y = e.changedTouches[0].clientY;
  position.offsetY = position.Y - Y;
  emit('getPosOffsetY',position.offsetY)
}
</script>

<template>
  <div class="navbar">
    <div>
      {{playSong.name}}
    </div>
    <!-- 按住 -->
    <div 
      class="drag-btn"
      @touchstart="handleTouchStart($event)"
      @touchmove="handleTouchMove($event)"
      @touchend="handleTouchEnd($event)"
    >
      <icon-icon-park-twotone-format-brush />
      <!-- <icon-icon-park-solid-format-brush /> -->
    </div>
    <div class="close-btn" @click="closeLrc">
      <icon-icon-park-twotone-coconut-tree />
    </div>

  </div>
</template>


<style lang="scss" scoped>
.navbar{
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  .drag-btn{
    padding: 0 20px;
  }
}
</style>