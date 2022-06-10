<script setup lang="ts">
import appStore from '@/store/appStore';
import audioStore from '@/store/audioStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
const storeApp = appStore();
const storeAudio = audioStore();
const { showLrcMask } = storeToRefs(storeApp);
const { playList, currentIndex } = storeToRefs(storeAudio);
watch(showLrcMask,(val) => {
  if(val){
    console.log('显示')
    let id = playList.value[currentIndex.value].id
    storeAudio.getLrc(id)
  }else{
    console.log('隐藏')
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