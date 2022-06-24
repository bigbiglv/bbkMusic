/*
* 存放音频相关数据的type类型
*/

//获取到的playlist列表下的数据
export type Tsong = {
  id: number,
  name: string,
  artists: {
    name: string,
    img1v1Url: string,
    id: number,
  }[],
  album: {
    name: string,
    id: number,
    picId: number,
    alia: string[],
    artist: {
      name: string,
      id: number,
      img1v1Url: string,
      picUrl: string,
      picId: number,
    },
  },
}
//当前播放的歌曲的信息 currentSong
export type TcurrentSong = {
  id: number,
  br: number,
  encodeType: string,
  size: number,
  type: string,
  url: string,
}
//获取到的歌词所有信息
export type Tlyric = {
  lrc: Tlrc
}
//歌词的信息
export type Tlrc = {
  lyric: string,
  version: number,
}