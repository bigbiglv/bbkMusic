import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
//导出路由
export default createRouter({
  history: createWebHashHistory(),
  routes
})