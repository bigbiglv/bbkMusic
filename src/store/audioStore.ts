import { defineStore } from 'pinia'
import { formatSeconds } from '@/utils'
import { useFetch } from '@vueuse/core'

export default defineStore('audioStore', {
  state: () => {
    return {
      audioEl: null as HTMLAudioElement | null,
      isPause: true,   //是否暂停
      playList: [] as object[],  //播放列表
      currentSong: {} as object, //当前播放的歌曲
      currentIndex: 0, //当前播放的音乐的下标
      duration: 0,     //当前播放音乐的总时长
      progress: 0,     //当前播放音乐的进度
      isLoop: false,   //是否循环播放
      isMute: false,   //是否静音
      volume: 1,       //音量
      isDrag: false,   //是否正在拖拽进度条
    }
  },
  getters: {
    //显示的音频时间
    showTime(state): string {
      return formatSeconds(state.progress)
    },
    //显示的总时间
    showDuration(state): string {
      return formatSeconds(state.duration)
    }
  },
  actions:{
    //添加播放列表
    addPlayList(obj: object){
      this.playList.push(obj)
      //播放刚添加的歌曲
      this.playByIndex(this.playList.length - 1)

    },
    //是否正在拖动进度条
    setDrag(isDrag: boolean){
      this.isDrag = isDrag
    },
    // region 控制方法
    //播放音频
    async play(){
      if(this.audioEl){
        //先判断准备好播放了没有
        await this.listenCanplay()
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
    //下一曲
    next(){
      console.log('下一曲')
      if(this.audioEl){
        this.currentIndex++
        if(this.currentIndex >= this.playList.length){
          this.currentIndex = 0
        }
        this.playByIndex(this.currentIndex)
      }
    },
    //上一曲
    prev(){
      console.log('上一曲')
      if(this.audioEl){
        this.currentIndex--
        if(this.currentIndex < 0){
          this.currentIndex = this.playList.length - 1
        }
        this.playByIndex(this.currentIndex)
      }
    },
    //播放指定的音频
    async playByIndex(index: number){
      if(this.audioEl){
        await this.getCurrentSong(this.playList[index].id)
        this.audioEl.src = this.currentSong.url
        this.currentIndex = index
        this.play()
      }
    },
    //根据id 请求获取播放url
    async getCurrentSong(id: number){
      let url = `http://localhost:3000/song/url?id=${id}`
      const { data } = await useFetch(url).json()
      this.currentSong = data.value.data[0]
    },
    //设置音量
    setVolume(volume: number){
      if(this.audioEl){
        this.audioEl.volume = volume
      }
    },
    //设为静音
    setMute(){
      if(this.audioEl){
        this.isMute = !this.isMute
        this.audioEl.muted = this.isMute
      }
    },
    //设置当前进度
    setProgress(progress: number){
      if(this.audioEl){
        this.audioEl.currentTime = progress
      }
    },
    //endregion

    //region 监听方法
    //监听音频可以播放
    listenCanplay(){
      if(this.audioEl){
        this.duration = this.audioEl.duration
        return new Promise (resolve => {
          resolve(true)
        })
      }
    },
    //监听音频进度
    listenTimeUpdate(){
      if(this.audioEl && !this.isDrag){
        this.progress = this.audioEl.currentTime
      }
    },
    //监听音频音量
    listenVolumeChange(){
      if(this.audioEl){
        this.volume = this.audioEl.volume
      }
    },
    //监听音频播放结束
    listenEnded(){
      if(this.audioEl){
        this.next()
      }
    }
    //endregion
  }
})