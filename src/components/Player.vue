<script setup lang="ts">
import { ref, onMounted } from 'vue'

const audioSrc = ref('http://music.163.com/song/media/outer/url?id=413859.mp3')
onMounted(() => {
})
</script>

<template>
  <audio ref="appAudio" controls  ></audio>
</template>


<style scoped>

</style>