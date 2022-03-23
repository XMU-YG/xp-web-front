import { v4 as uuid } from 'uuid'
export const routerList = [
  {
    id: uuid(),
    title: '学生信息管理',
    path: '/studentInfo-manager',
    icon: 'icon-geren',
    children: [
      {
        id: uuid(),
        title: '已受助学生',
        path: '/alreadyStu-manager',
        params: '/:id(.+)*',
        name: '/alreadyStu-manager',
        component: 'studentInfoManager/oldStu/AlreadyStu.vue'
      },
      {
        id: uuid(),
        title: '预受助学生',
        path: '/prepare-manager',
        params: '/:id(.+)*',
        name: '/prepare-manager',
        component: 'studentInfoManager/newStu/PrepareStu.vue'
      },
      {
        id: uuid(),
        title: '成绩管理',
        path: '/grade-manager',
        params: '/:id(.+)*',
        name: '/grade-manager',
        component: 'studentInfoManager/gradeManager/GradeManager.vue'
      },
      {
        id: uuid(),
        title: '感谢信管理',
        path: '/letter-manager',
        params: '/:id(.+)*',
        name: '/letter-manager',
        component: 'studentInfoManager/letterManager/LetterManager.vue'
      },
      {
        id: uuid(),
        title: '申请管理',
        path: '/apply-manager',
        params: '/:id(.+)*',
        name: '/apply-manager',
        component: 'studentInfoManager/applyManager/ApplyManager.vue'
      }
    ]
  },
  {
    id: uuid(),
    title: '用户管理',
    path: '/user-manager',
    icon: 'icon-geren',
    children: [
      {
        id: uuid(),
        title: '用户管理',
        path: '/user-manager',
        params: '/:id(.+)?',
        name: '/user-manager',
        component: 'userManager/userManager/UserManager.vue'
      },
      {
        id: uuid(),
        title: '组织管理',
        path: '/org-manager',
        params: '',
        name: '/org-manager',
        component: 'userManager/orgManager/OrgManager.vue'
      },
      {
        id: uuid(),
        title: '角色管理',
        path: '/role-manager',
        params: '',
        name: '/role-manager',
        component: 'userManager/roleManager/RoleManager.vue'
      }
    ]
  }
]
