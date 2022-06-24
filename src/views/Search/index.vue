<script setup lang="ts">
import { ref } from 'vue';
import audioStore from '@/store/audioStore'; 
import { Tsong } from '@/types/audio';
import { Search } from '@/api';

const storeAudio = audioStore()


const searchValue = ref('陈奕迅')



const songs = ref<Tsong[] | []>([])
async function onSearch(){
  try {
    const { result } = await Search({keywords:searchValue.value})
    songs.value = result?.songs || []
  } catch (error) {
    console.log(error)
  }
}
onSearch()
//添加到播放列表
function addPlayList(song: Tsong){
  storeAudio.addPlayList(song)
}


</script>

<template>
  <div>
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-cell 
      v-for="song in songs" 
      :key="song.id" 
      :title="song.name" 
      @click="addPlayList(song)"/>
  </div>
</template>


<style lang="scss" scoped>

</style>