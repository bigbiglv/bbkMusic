<script setup lang="ts">
import { ref } from 'vue';

import { useFetch } from '@vueuse/core'

const searchValue = ref('')
const songs = ref([])
async function onSearch(){
  console.log(searchValue.value)
  let url = `http://localhost:3000/search?keywords=${searchValue.value}`
  const { data } = await useFetch(url).json()
  songs.value = data.value.result.songs || []
}
</script>

<template>
  <div>
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-cell v-for="item in songs" :key="item['id']" :title="item['name']"/>
  </div>
</template>


<style lang="scss" scoped>

</style>