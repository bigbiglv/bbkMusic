<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import audioStore from '@/store/audioStore'
const store = audioStore()
let { audioEl, currentIndex } = storeToRefs(store)


onMounted(() => {
  audioEl.value = document.getElementById('appAudio') as HTMLAudioElement
  //获取列表
  store.getPlayList()
  setTimeout(() => {
    store.next()
  }, 2000);
})
//监听播放的下标 更新当前播放的歌曲
watch(currentIndex, (newVal) => {
  store.playByIndex(newVal)
})

</script>

<template>
  <audio id="appAudio" controls  />
</template>


<style scoped>

</style>