<script setup lang="ts">
import { ref, onMounted } from 'vue'

const audioSrc = ref('http://music.163.com/song/media/outer/url?id=413859.mp3')
onMounted(() => {
  const appAudio = document.getElementById('appAudio') as HTMLAudioElement
  appAudio.src = audioSrc.value || ''
  console.log(appAudio)
})
</script>

<template>
  <audio id="appAudio" controls  />
</template>


<style scoped>

</style>