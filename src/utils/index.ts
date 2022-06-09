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