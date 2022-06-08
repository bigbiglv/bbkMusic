<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import audioStore from '@/store/audioStore'
const store = audioStore()
let { audioEl } = storeToRefs(store)


const audioSrc = ref('http://music.163.com/song/media/outer/url?id=413859.mp3')
onMounted(() => {
  audioEl.value = document.getElementById('appAudio') as HTMLAudioElement

  audioEl.value.src = audioSrc.value || ''
})
</script>

<template>
  <audio id="appAudio" controls  />
</template>


<style scoped>

</style>