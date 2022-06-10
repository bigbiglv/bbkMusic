<script setup lang="ts">
import { ref } from 'vue';
import audioStore from '@/store/audioStore'; 
import { useFetch } from '@vueuse/core'

const storeAudio = audioStore()


const searchValue = ref('')
const songs = ref([])
async function onSearch(){
  console.log(searchValue.value)
  let url = `http://localhost:3000/search?keywords=${searchValue.value}`
  const { data } = await useFetch(url).json()
  songs.value = data.value.result.songs || []
}
async function getMusicUrl(id: number){
  let url = `http://localhost:3000/song/url?id=${id}`
  const { data } = await useFetch(url).json()
  let musicUrl = data.value.data[0].url
  console.log(musicUrl)
  storeAudio.addPlayList(musicUrl)

}
</script>

<template>
  <div>
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-cell 
      v-for="item in songs" 
      :key="item['id']" 
      :title="item['name']" 
      @click="getMusicUrl(item['id'])"/>
  </div>
</template>


<style lang="scss" scoped>

</style>