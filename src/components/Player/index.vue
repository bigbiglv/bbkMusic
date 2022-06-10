<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import audioStore from '@/store/audioStore'

const store = audioStore()
let { audioEl, currentIndex, isLoop } = storeToRefs(store)


onMounted(() => {
  audioEl.value = document.getElementById('appAudio') as HTMLAudioElement
})


</script>

<template>
  <audio 
    id="appAudio" 
    @timeupdate="store.listenTimeUpdate()"
    @canplay="store.listenCanplay()"
    @volumechange="store.listenVolumeChange()"
    @ended="store.listenEnded()"
    :loop="isLoop"
  />
  <PlayBar />
</template>


<style scoped>

</style>