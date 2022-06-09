import { defineStore } from "pinia"
import { useRoute } from "vue-router"
const route = useRoute()
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