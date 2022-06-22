<script setup lang="ts">
import audioStore from '@/store/audioStore'
import appStore from '@/store/appStore'
import { ref, watch, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useTouch from '@/hooks/useTouch'
const storeAudio = audioStore()
const storeApp = appStore()
const { playSong } = storeToRefs(storeAudio)
const { showLrcMask } = storeToRefs(storeApp)
function closeLrc(){
  showLrcMask.value = false
}
const emit = defineEmits(['getPosOffsetY'])


const offsetY = ref(0)
const dragBtn = ref<HTMLElement | null>(null)
onMounted(() => {
  const { y, isTouch } = useTouch(dragBtn.value as HTMLElement)
  watch([y, isTouch],()=>{
    //滑动距离大于300就关闭
    if(y.value > 300 && !isTouch.value){
      showLrcMask.value = false
    }
    if(isTouch.value){
      offsetY.value = y.value
      emit('getPosOffsetY',y.value)
    }else{
      offsetY.value = 0
      emit('getPosOffsetY',0)
    }
  })
})
const rotateStyle = computed(()=>{
  return `transform: rotate(${offsetY.value * 3}deg)`
})

</script>

<template>
  <div class="flex justify-between items-center p-2 relative">
    <div class="w-40">
      {{playSong.name}}
    </div>
    <!-- 按住 -->
    <div 
      class="px-4"
      ref="dragBtn"
    >
      <icon-icon-park-twotone-format-brush />
      <!-- <icon-icon-park-solid-format-brush /> -->
    </div>
    <div class="" @click="closeLrc" :style="rotateStyle" v-title="'关闭'">
      <icon-icon-park-twotone-coconut-tree />
    </div>

  </div>
</template>


<style lang="scss" scoped>
</style>