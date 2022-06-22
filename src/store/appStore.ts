import { defineStore, storeToRefs } from "pinia"
import audioStore from "@/store/audioStore"
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
    //全局底栏高度
    tabBarHeight(): number{
      return this.showTabBar ? 50 : 0
    },
    //播放器高度
    playBarHeight(): number{
      return audioStore().playList.length ? 50 : 0
    }
  },
  actions: {
    setTabBar(isShow: boolean){
      this.showTabBar = isShow
    }
  }
})