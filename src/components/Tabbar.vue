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
  router.replace(path)
}
//监听路由 判断是否显示tabbar
watch(route,(val)=>{
  let isShow = val.meta?.tabbar ? true : false
  storeApp.setTabBar(isShow)
})

</script>

<template>
  <div class="w-screen flex justify-around items-center pt-1 pb-1 box-border fixed bottom-0 left-0" :style="{height: `${tabBarHeight}px`}" v-if="showTabBar">
    <div 
      v-for="(item,index) in tabbar" 
      :key="index" 
      @click="go(item.path)"
      :class="{active: route.path === item.path}"
      class="flex items-center flex-col"
    >
      <icon-icon-park-twotone-home v-if="index === 0"/>
      <icon-icon-park-twotone-category-management v-if="index === 1"/>
      {{item.meta?.title ? item.meta?.title : '---'}}
    </div>
  </div>
</template>


<style lang="scss" scoped>
.active{
  color: $hiwanglv;
}
</style>