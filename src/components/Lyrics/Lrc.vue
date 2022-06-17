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
//设置当前歌词段落的位置
function setLrcLoc(){
  let list = document.getElementById('list')
  let listHeight = list.offsetHeight
  let id = `lyrRef${lrcIndex.value}`
  let lyrRef = document.getElementById(id).offsetTop
  list?.scrollTo({top:lyrRef-listHeight/2,behavior: "smooth"})
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
    class="lyr" 
    id="list"
    @touchstart="handleTouchStartLrc"
    @touchend="handleTouchEndLrc"
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
</template>


<style lang="scss" scoped>
.lyr{
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