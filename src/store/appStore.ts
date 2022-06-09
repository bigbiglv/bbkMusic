import { defineStore } from "pinia"
export default defineStore('appStore', {
  state: () => {
    return {
      playBarHeight: 50,
      showTabBar: true,
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