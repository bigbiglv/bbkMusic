<script setup lang="ts">
import { Register } from '@/api'
import { Toast } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const username = ref('')
const password = ref('')
const email = ref('')
const phone = ref('')
const loading = ref(false)
async function register(){
  loading.value = true
  try{
    let data = await Register({username:username.value,password:password.value,email:email.value,phone:phone.value})
    Toast.success(data.msg)
    setTimeout(() => {
      router.go(-1)
    }, 1500);
  }catch{

  }
  loading.value = false
}
</script>

<template>
  <van-form @submit="register">
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
      <van-field
        v-model="phone"
        name="手机号码"
        label="手机号码"
        placeholder="手机号码（选填）"
      />
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱（选填）"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" :loading="loading">
        注册
      </van-button>
    </div>
  </van-form>
</template>


<style lang="scss" scoped>

</style>