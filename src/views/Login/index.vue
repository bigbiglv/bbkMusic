<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/api'
const router = useRouter()


const username = ref('bigbigking')
const password = ref('123456')
const loading = ref(false)
async function onSubmit(){
  loading.value = true
  try{
    const { result } = await Login({username:username.value,password:password.value})
    console.log(result)
    localStorage.setItem('token',result.token)
    router.replace('/')

  }catch(error){
    console.log(error)
  }
  loading.value = false
}
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class=" pt-5 rounded-sm shadow-lg">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading="loading">
            登录
          </van-button>
          <van-button round block type="primary" to="/register" style="margin-top: 10px;">
            去注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>