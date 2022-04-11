import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/Login'
import Home from '@/views/portal/home/Home'
import TutorServices from '@/views/portal/tutorServices/TutorServices'
import PersonalHomePage from '@/views/portal/personalHomePage/PersonalHomePage'
import VolunteerServices from '@/views/portal/volunteerServices/VolunteerServices'
import AboutAssisted from '@/views/portal/aboutAssisted/AboutAssisted'
import Article from '@/views/portal/article/Article'
import Publish from '@/views/portal/article/components/Publish'
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
    name: '/',
    component: () => import('..//views/portal/home/Home.vue'),
    meta: {
      name: '首页',
      isLogin: false
    }
  },
  {
    id: Math.random(),
    path: '/home',
    name: '/home',
    component: () => import('..//views/portal/home/Home.vue'),
    meta: {
      name: '首页',
      isLogin: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    children: null
  },
  {
    path: '/volunteer-service',
    name: 'volunteerServices',
    component: VolunteerServices,
    children: null
  },
  {
    path: '/about-assisted',
    name: 'aboutAssisted',
    component: AboutAssisted,
    children: null
  },
  {
    path: '/tutor-service',
    name: 'tutorServices',
    component: TutorServices,
    children: null
  },
  {
    id: Math.random(),
    path: '/article',
    name: '/article',
    component: () => import('../views/portal/article/Article.vue'),
    meta: {
      name: '文章帖子',
      isLogin: false
    }
  },
  {
    id: Math.random(),
    path: '/article-detail/:id(.*)?',
    name: '/article-detail',
    component: () =>
      import('../views/portal/article/components/ArticleDetail.vue'),
    meta: {
      name: '文章帖子',
      isLogin: false
    }
  },
  {
    id: Math.random(),
    path: '/article-publish/:id(.*)?',
    name: '/article-publish',
    component: () => import('../views/portal/article/components/Publish.vue'),
    meta: {
      name: '文章帖子',
      isLogin: false
    }
  },
  {
    path: '/personal-page',
    name: 'personalHomePage',
    component: PersonalHomePage,
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
