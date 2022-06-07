import Home from '../views/Home/index.vue'
import Category from '../views/Category/index.vue'
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
export const routes: IRoute[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
      title: '首页',
      tabbar: true
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      keepAlive: true,
      title: '分类',
      tabbar: true
    }
  }
]