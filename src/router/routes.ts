import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import NotFound from '@/views/Error/404.vue'
import Login from '@/views/Login/index.vue'
interface IRoute {
  path: string
  name: string
  meta?: {
    title: string
    keepAlive?: boolean
    tabbar?: boolean
    navbar?:{
      show?: boolean
      search?: boolean
    }
  }
  component: any
  children?: IRoute[]
}
export const routes: IRoute[] = [
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    meta:{
      title: '错误页',
    },
    component: NotFound
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
      title: '首页',
      tabbar: true,
      navbar: {
        show: true,
        search: true
      }
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      keepAlive: true,
      title: '分类',
      tabbar: true,
      navbar: {
        show: true
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: true,
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/index.vue'),
    meta: {
      keepAlive: true,
      title: '注册'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/index.vue'),
    meta: {
      title: '搜索'
    }
  }
]