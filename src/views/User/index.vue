<script setup lang="ts">
import { UserInfo } from '@/api'
import { ref } from 'vue'
type UserInfoResData = {
  avatar: string,
  nickname: string,
  id: number,
  email: string,
  phone: string,
} 
const userInfo = ref<UserInfoResData>()

async function getUserinfo() {
  let { result } = await UserInfo()
  userInfo.value = result
}
getUserinfo()
</script>

<template>
  <div class="px-2">
    <div class="w-screen flex p-2 items-center ">
      <div class="w-16 h-16">
        <img class="w-full h-full" :src="userInfo?.avatar" alt="头像">
      </div>
      <span >{{userInfo?.nickname}}</span>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>