<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';

const storeApp = appStore();
const storeAudio = audioStore();
const { showLrcMask } = storeToRefs(storeApp);

const { lrc, lrcIndex } = storeToRefs(storeAudio);

const emit = defineEmits(['isDrag'])
//监听歌词变化
watch(lrcIndex,()=>{
  if(showLrcMask.value && !isMoveLrc.value) setLrcLoc()
})
const lrcList = ref<HTMLElement | null>(null)
//设置当前歌词段落的位置
function setLrcLoc(){
  let listHeight = lrcList.value.offsetHeight
  let lyrRef = lrcList.value.children[lrcIndex.value].offsetTop
  lrcList.value?.scrollTo({top:lyrRef-listHeight/2,behavior: "smooth"})
}
//是否正在滑動歌詞
const isMoveLrc = ref(false)
function handleTouchStartLrc(){
  isMoveLrc.value = true
  emit('isDrag',isMoveLrc.value)
}
function handleTouchEndLrc(){
  isMoveLrc.value = false
  emit('isDrag',isMoveLrc.value)
}
</script>

<template>
  <div 
    class="lrc" 
    ref="lrcList"
    @touchstart="handleTouchStartLrc"
    @touchend="handleTouchEndLrc"
  >
    <p 
      v-for="(item,keys,index) in lrc" 
      :class="[index === lrcIndex  ? 'on' : '']"
      :key="keys" 
    >
      {{item}}
    </p>
  </div>
</template>


<style lang="scss" scoped>
.lrc{
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
</style>