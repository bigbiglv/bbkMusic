<script setup lang="ts">
import appStore from '@/store/appStore';
import audioStore from '@/store/audioStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
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
</script>

<template>
  <div class="lyr-wrap" :style="{top: `${showLrcMask ? '0' : '100%'}`}">
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