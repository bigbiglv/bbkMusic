<script setup lang="ts">
import { ref } from 'vue';
import audioStore from '@/store/audioStore'; 
import { useFetch } from '@vueuse/core'

const storeAudio = audioStore()


const searchValue = ref('陈奕迅')
const songs = ref([])
async function onSearch(){
  console.log(searchValue.value)
  let url = `http://localhost:3000/search?keywords=${searchValue.value}`
  const { data } = await useFetch(url).json()
  songs.value = data.value.result.songs || []
}
onSearch()
//添加到播放列表
function addPlayList(song: object){
  storeAudio.addPlayList(song)
}
</script>

<template>
  <div>
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-cell 
      v-for="song in songs" 
      :key="song['id']" 
      :title="song['name']" 
      @click="addPlayList(song)"/>
  </div>
</template>


<style lang="scss" scoped>

</style>