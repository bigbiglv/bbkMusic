/*
* v-title
* 实现长按显示输入文本的功能
*/
import type { App } from 'vue'
import { Toast } from 'vant'
import { useVibrate } from '@vueuse/core'
const { vibrate} = useVibrate({ pattern: 30 })

export default function title(app : App){
  app.directive('title',  {
    mounted(el:HTMLElement, binding){
      let value:string = binding.value
      let time = 0
      let timer : NodeJS.Timer
      el.addEventListener('touchstart',(e: TouchEvent)=>{
        timer = setInterval(()=>{
          time++
          if(time === 2){
            e.preventDefault() 
            if(value) Toast(value) 
            vibrate()
          }
        },1000)
      })  
      el.addEventListener('touchend',()=>{
        clearInterval(timer)
        time = 0
      })
    }
  })
}

