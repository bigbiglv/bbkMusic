import { defineStore } from "pinia"
export default defineStore('appStore', {
  state: () => {
    return {
      playBarHeight: 50,
      showTabBar: true,
      //是否显示歌词遮罩
      showLrcMask: false,

    }
  },
  getters: {
    tabBarHeight(): number{
      return this.showTabBar ? 50 : 0
    },
  },
  actions: {
    setTabBar(isShow: boolean){
      this.showTabBar = isShow
    }
  }
})