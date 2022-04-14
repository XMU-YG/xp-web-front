import { v4 as uuid } from 'uuid'
export const routerList = [
  {
    id: uuid(),
    title: '学生管理',
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
      }
      // {
      //   id: uuid(),
      //   title: '成绩管理',
      //   path: '/grade-manager',
      //   params: '/:id(.+)*',
      //   name: '/grade-manager',
      //   component: 'studentInfoManager/gradeManager/GradeManager.vue'
      // },
      // {
      //   id: uuid(),
      //   title: '感谢信管理',
      //   path: '/letter-manager',
      //   params: '/:id(.+)*',
      //   name: '/letter-manager',
      //   component: 'studentInfoManager/letterManager/LetterManager.vue'
      // },
      // {
      //   id: uuid(),
      //   title: '申请管理',
      //   path: '/apply-manager',
      //   params: '/:id(.+)*',
      //   name: '/apply-manager',
      //   component: 'studentInfoManager/applyManager/ApplyManager.vue'
      // }
    ]
  },
  {
    id: uuid(),
    title: '角色管理',
    path: '/role-manager',
    icon: 'icon-geren',
    children: [
      {
        id: uuid(),
        title: '导师',
        path: '/role-manager/mentor-manager',
        params: '/:id(.+)?',
        name: '/role-manager/mentor-manager',
        children: [
          {
            id: uuid(),
            title: '香港导师',
            path: '/role-manager/mentor-manager/hk',
            params: '/:id(.+)?',
            name: '/role-manager/mentor-manager/hk',
            component: 'roleManager/mentor/hk/Hk.vue'
          },
          {
            id: uuid(),
            title: '学生导师',
            path: '/role-manager/mentor-manager/stu',
            params: '/:id(.+)?',
            name: '/role-manager/mentor-manager/stu',
            component: 'roleManager/mentor/stu/Stu.vue'
          }
        ]
      },
      {
        id: uuid(),
        title: '管理员',
        path: '/role-manager/system-manager',
        params: '',
        name: '/role-manager/system-manager',
        component: 'roleManager/system/System.vue'
      },
      {
        id: uuid(),
        title: '志愿者',
        path: '/role-manager/volunteer',
        params: '',
        name: '/role-manager/volunteer',
        component: 'roleManager/volunteer/Volunteer.vue'
      }
    ]
  },
  {
    id: uuid(),
    title: '申请审核',
    path: '/apply-manager',
    icon: 'icon-geren',
    children: [
      {
        id: uuid(),
        title: '助学金申请',
        path: '/fundApply',
        params: '/:id(.+)?',
        name: '/fundApply',
        component: 'applyManager/fundApply/FundApply.vue'
      },
      {
        id: uuid(),
        title: '其他申请',
        path: '/otherApply',
        params: '',
        name: '/otherApply',
        component: 'userManager/orgManager/OrgManager.vue'
      }
    ]
  }
]
