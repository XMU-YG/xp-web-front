import { createRouter, createWebHistory } from 'vue-router'
import MainTemplate from '@/components/mainTemplate/MainTemplate'
import Login from '@/views/login/Login'
import { routerList } from './menu'

function floatRoute(data) {
  let result = []
  data.forEach(item => {
    result.push(item)
    if (item.children && item.children.length) {
      result = result.concat(floatRoute(item.children))
    }
  })
  return result
}

let routeBakList = floatRoute(routerList)
routeBakList = routeBakList.filter(item => item.component)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    children: null
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
routeBakList.forEach(item => {
  router.addRoute('main', {
    path: item.path + item.params,
    name: item.name,
    component: () => import(`@/views/${item.component}`)
  })
})

export default router
