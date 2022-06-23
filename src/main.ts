import { createApp } from 'vue'
import App from './App.vue'
//路由
import router from './router'
import { createPinia } from 'pinia'
//自定义指令
import Directive from '@/directive'
//index.css
import './index.css'
import 'vant/lib/index.css'
const app = createApp(App) 

Directive(app)


app.use(createPinia())
app.use(router)
app.mount('#app')
