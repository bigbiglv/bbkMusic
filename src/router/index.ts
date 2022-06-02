import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/index.vue'
interface IRoute {
  path: string
  name: string
  meta?: {
    title: string
    keepAlive?: boolean
    tabbar?: boolean
  }
  component: any
  children?: IRoute[]
}
const routes: IRoute[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
      title: '首页',
      tabbar: true
    }
  }
]
//导出路由
export default createRouter({
  history: createWebHashHistory(),
  routes
})