import { defineStore } from 'pinia'

export default defineStore('audioStore', {
  state: () => {
    return {
      audioEl: null as HTMLAudioElement | null,
      //是否暂停
      isPause: true,
      //播放列表
      playList: [] as string[],
      //当前播放的音乐的下标
      currentIndex: 0,
    }
  },
  getters: {
    //当前播放的链接
    audioSrc(state){
      return state.audioEl?.src
    },
  },
  actions:{
    //播放音频
    play(){
      if(this.audioEl){
        this.audioEl.play()
        this.isPause = false
      }
    },
    //暂停音频
    pause(){
      if(this.audioEl){
        this.audioEl.pause()
        this.isPause = true
      }
    },
    //获取播放列表
    getPlayList(){
      this.playList = [
        'http://music.163.com/song/media/outer/url?id=413859.mp3',
        'http://music.163.com/song/media/outer/url?id=413860.mp3',
        'http://music.163.com/song/media/outer/url?id=413861.mp3'
      ]
      this.playByIndex(0)
    },
    //下一曲
    next(){
      if(this.audioEl){
        this.pause()
        this.currentIndex++
        if(this.currentIndex >= this.playList.length){
          this.currentIndex = 0
        }
      }
    },
    //上一曲
    prev(){
      if(this.audioEl){
      }
    },
    //播放指定的音频
    playByIndex(index: number){
      if(this.audioEl){
        this.audioEl.src = this.playList[index]
        this.currentIndex = index
      }
    }
  }
})