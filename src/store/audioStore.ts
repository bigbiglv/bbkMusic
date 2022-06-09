import { defineStore } from 'pinia'
import { formatSeconds } from '@/utils'
export default defineStore('audioStore', {
  state: () => {
    return {
      audioEl: null as HTMLAudioElement | null,
      isPause: true,   //是否暂停
      playList: [] as string[],  //播放列表
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
    //获取播放列表
    getPlayList(){
      this.playList = [
        'http://music.163.com/song/media/outer/url?id=413859.mp3',
        'http://music.163.com/song/media/outer/url?id=413860.mp3',
        'http://music.163.com/song/media/outer/url?id=413861.mp3'
      ]
      this.playByIndex(0)
    },
    setDrag(isDrag: boolean){
      this.isDrag = isDrag
    },
    // region 控制方法
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
    //下一曲
    next(){
      if(this.audioEl){
        this.currentIndex++
        if(this.currentIndex >= this.playList.length){
          this.currentIndex = 0
        }
        this.listenCanplay()?.then(()=>{
          if(!this.isPause){
            this.play()
          } 
        })
      }
    },
    //上一曲
    prev(){
      if(this.audioEl){
        this.currentIndex--
        if(this.currentIndex < 0){
          this.currentIndex = this.playList.length - 1
        }
        this.listenCanplay()?.then(()=>{
          if(!this.isPause){
            this.play()
          } 
        })
      }
    },
    //播放指定的音频
    playByIndex(index: number){
      if(this.audioEl){
        this.audioEl.src = this.playList[index]
        this.currentIndex = index
      }
    },
    //设置音量
    setVolume(volume: number){
      if(this.audioEl){
        this.audioEl.volume = volume
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
        console.log('播放王弼')
        this.next()
      }
    }
    //endregion
  }
})