<script setup lang="ts">
import { ref, onMounted } from 'vue'
import audioStore from '@/store/audioStore'
const store = audioStore()
console.log(store)


const audioSrc = ref('http://music.163.com/song/media/outer/url?id=413859.mp3')
onMounted(() => {
  const appAudio = document.getElementById('appAudio') as HTMLAudioElement
  store.audioEl = appAudio
  appAudio.src = audioSrc.value || ''
  console.log(store)
})
</script>

<template>
  <audio id="appAudio" controls  />
</template>


<style scoped>

</style>