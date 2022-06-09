<script setup lang="ts">
import { routes } from '../router/routes'
import { useRouter, useRoute } from 'vue-router'
import appStore from '@/store/appStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
const router = useRouter()
const route = useRoute()
//根据meta信息 过滤渲染的tabbar列表
const tabbar = routes.filter(el => el.meta?.tabbar)
const storeApp = appStore()
const { tabBarHeight, showTabBar } = storeToRefs(storeApp)
function go(path : string){
  router.push(path)
}
//监听路由 判断是否显示tabbar
watch(route,(val)=>{
  let isShow = val.meta?.tabbar ? true : false
  storeApp.setTabBar(isShow)
})

</script>

<template>
  <div class="tabbar" :style="{height: `${tabBarHeight}px`}" v-if="showTabBar">
    <div v-for="(item,index) in tabbar" :key="index" @click="go(item.path)">
      <icon-ep-home-filled />
      {{item.name}}
    </div>
  </div>
</template>


<style scoped>
.tabbar{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>