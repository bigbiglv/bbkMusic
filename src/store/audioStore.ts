import { defineStore } from 'pinia'
import { formatSeconds,formatLrc } from '@/utils'
import { useFetch } from '@vueuse/core'
import appStore from './appStore'
import { Tsong, TcurrentSong, Tlyric } from '@/types/audio'

export default defineStore('audioStore', {
  state: () => {
    return {
      audioEl: null as HTMLAudioElement | null,
      isPause: true,   //是否暂停
      playList: [] as Tsong[] | [],  //播放列表
      currentSong: {} as TcurrentSong, //当前播放的歌曲
      currentIndex: 0, //当前播放的音乐的下标
      duration: 0,     //当前播放音乐的总时长
      progress: 0,     //当前播放音乐的进度
      isLoop: false,   //是否循环播放
      isMute: false,   //是否静音
      volume: 1,       //音量
      isDrag: false,   //是否正在拖拽进度条
      lyric: {} as Tlyric, //歌词
      lrcIndex: 0,     //播放到的歌词的下标
    }
  },
  getters: {
    //当前播放的歌曲信息
    playSong(state): Tsong | undefined {
      return state.playList.length > 0 ? state.playList[state.currentIndex] : undefined
    },
    //显示的音频时间
    showTime(state): string {
      return formatSeconds(state.progress)
    },
    //显示的总时间
    showDuration(state): string {
      return formatSeconds(state.duration)
    },
    //歌词
    lrc(state): object {
      return state.lyric.lrc ? formatLrc(state.lyric.lrc.lyric) : {}
    }
  },
  actions:{
    //添加播放列表
    addPlayList(obj: Tsong){
      this.playList = [...this.playList, obj]
      //播放刚添加的歌曲
      this.playByIndex(this.playList.length - 1)

    },
    //是否正在拖动进度条
    setDrag(isDrag: boolean){
      this.isDrag = isDrag
    },
    //region 控制方法
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
    //播放指定的音频 切歌
    async playByIndex(index: number){
      if(this.audioEl){
        //获取播放url
        await this.getCurrentSong(this.playList[index].id)
        //url设置到audio元素
        this.audioEl.src = this.currentSong.url
        this.currentIndex = index
        this.play()
        //歌词层打开的时候请求歌词
        if(appStore().showLrcMask){

          this.getLrc(this.playList[index].id)
        }
      }
    },
    //根据id 请求获取播放url
    async getCurrentSong(id: number){
      let url = `http://localhost:3000/song/url?id=${id}`
      const { data } = await useFetch(url).json() || {}
      this.currentSong = data.value.data[0]
    },
    //根据id 请求获取歌词
    async getLrc(id: number){
      let url = `http://localhost:3000/lyric?id=${id}`
      const { data } = await useFetch(url).json() || {}
      this.lyric = data.value
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
    //设置歌词进度的下标
    setLrcIndex(){
      //打开歌词层的时候才设置歌词进度
      if(appStore().showLrcMask && Object.keys(this.lrc).length){
        for( let i = 0; i < Object.keys(this.lrc).length; i++){
          if(this.progress >= Number(Object.keys(this.lrc)[i])){
            this.lrcIndex = i
          } 
        }  
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
        //歌词进度 
        this.setLrcIndex()
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