/*
* 秒格式的时间转为 xx:xx:xx格式
*/
export const formatSeconds = (seconds: number) => {
  let time = ''
  let hour = Math.floor(seconds / 3600)
  let minute = Math.floor((seconds % 3600) / 60)
  let second = Math.floor(seconds % 60)
  if (hour < 10) {
    if (hour > 0) {
      time += '0' + hour + ':'
    }
  } else {
    time += hour + ':'
  }
  if (minute < 10) {
    time += '0' + minute + ':'
  } else {
    time += minute + ':'
  }
  if (second < 10) {
    time += '0' + second
  } else {
    time += second
  }
  return time
}
/*
* 格式化歌词数组
*/ 
export const formatLrc = (lrc: string) => {
  interface Ilrc {
    [key : string]: string
  }
  let lrcArr = lrc.split('\n')
  let lrcObj: Ilrc = {}
  lrcArr.forEach(item => {
    let time = item.match(/\[\d{2,3}:\d{2}\.\d{2,3}\]/)
    let content = item.replace(/\[\d{2,3}:\d{2}\.\d{2,3}\]/g, '')
    if (time) {
      let timeStr = time[0].slice(1, -1)
      let timeArr = timeStr.split(':')
      let timeNum = (parseInt(timeArr[0]) * 60 *1000 + parseFloat(timeArr[1]) * 1000) /1000
      if(content) lrcObj[timeNum] = content
    }
  })
  return lrcObj
}