import { createRouter, createWebHistory } from 'vue-router'
import MainTemplate from '@/components/mainTemplate/MainTemplate'
import AlreadyStu from '@/views/studentInfoManager/oldStu/AlreadyStu'
import Login from '@/views/login/Login'
import Home from '@/views/portal/home/Home'
import AssistedStudent from '@/views/portal/assistedStudent/AssistedStudent'
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
    name: 'home',
    component: Home,
    children: null
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    children: null
  },
  {
    path: '/portal-home',
    name: 'home',
    component: Home,
    children: null
  },
  {
    path: '/assisted-student',
    name: 'assistedStudent',
    component: AssistedStudent,
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
    path: '/article',
    name: 'article',
    component: Article,
    children: null
  },
  {
    path: '/publish',
    name: 'publish',
    component: Publish,
    children: null
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
