import { defineStore } from 'pinia'

export default defineStore('audioStore', {
  state: () => {
    return {
      audioEl: null as HTMLAudioElement | null,
    }
  },
  getters: {
    //当前播放的链接
    audioSrc(state){
      return state.audioEl?.src
    },
    isPaused(state){
      return state.audioEl?.paused
    }
  },
  actions:{
    //播放音频
    play(){
      if(this.audioEl){
        this.audioEl.play()
      }
    },
    //暂停音频
    pause(){
      if(this.audioEl){
        this.audioEl.pause()
      }
    }
  }
})