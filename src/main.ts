import { createApp } from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
import { createPinia } from 'pinia'
//index.css
import './index.css'
import 'vant/lib/index.css'
import { Toast } from 'vant'
import { useVibrate } from '@vueuse/core'
const { vibrate} = useVibrate({ pattern: 30 })
const app = createApp(App) 

app.directive('title',  {
  mounted(el:HTMLElement, binding){
    let value = binding.value
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



app.use(createPinia())
app.use(router)
app.mount('#app')
