import { createApp } from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
import { createPinia } from 'pinia'
//index.css
import './index.css'
import 'vant/lib/index.css'
const app = createApp(App) 
app.use(createPinia())
app.use(router)
app.mount('#app')
