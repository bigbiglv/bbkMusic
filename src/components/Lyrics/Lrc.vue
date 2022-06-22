<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import audioStore from '@/store/audioStore';
import appStore from '@/store/appStore';
import useTouch from '@/hooks/useTouch';

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
onMounted(()=>{
  const { isTouch } = useTouch(lrcList.value)
  watch([isTouch],()=>{
    isMoveLrc.value = isTouch.value 
    emit('isDrag',isMoveLrc.value)
  })
})

</script>

<template>
  <div 
    class="w-5/6 h-4/5 text-center overflow-y-scroll mx-auto" 
    ref="lrcList"
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
.on{
  color: $hiwanglv;
  font-size: 18px;
  transition: .25s;
}
</style>