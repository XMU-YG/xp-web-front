import {
  getAlreadyStuInfoService,
  getNoStuInfoService,
  getSystem,
  getVolunteer,
  getStuMentors,
  getHkMentors
} from '@/services'
import { reactive, toRefs, onMounted } from 'vue'
import { message } from 'ant-design-vue'

//获取已受助学生信息列表
export function useAlreadyStuList() {
  const state = reactive({
    alreadyStuList: [],
    total: 0,
    loading: false
  })
  async function setAlreadyStuList(params) {
    try {
      state.loading = true
      const { errMsg, data, success } = await getAlreadyStuInfoService(params)
      state.loading = false
      if (success === true) {
        state.alreadyStuList = data.list
        state.total = data.total
      } else {
        message.warn(errMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  onMounted(() => {
    setAlreadyStuList({
      pageIndex: 1,
      pageSize: 10
    })
  })
  return { ...toRefs(state), setAlreadyStuList }
}

//获取预受助学生信息列表
export function useNotStuList() {
  const state = reactive({
    notStuList: [],
    total: 0,
    loading: false
  })
  async function setNotStuList() {
    try {
      state.loading = true
      const { msg, data, success } = await getNoStuInfoService()
      state.loading = false
      if (success === true) {
        state.notStuList = data
      } else {
        message.warn(msg)
      }
    } catch (error) {
      state.loading = false
      throw new Error(error)
    }
  }

  onMounted(() => {
    setNotStuList()
  })
  return { ...toRefs(state), setNotStuList }
}

//获取管理员
export function getSystemList() {
  const state = reactive({
    systemList: [],
    total: 0,
    loading: false
  })
  async function setSystemList() {
    try {
      state.loading = true
      const { msg, data, success } = await getSystem()
      state.loading = false
      if (success === true) {
        state.systemList = data
        console.log(data)
      } else {
        message.warn(msg)
      }
    } catch (error) {
      state.loading = false
      throw new Error(error)
    }
  }

  onMounted(() => {
    setSystemList()
  })
  return { ...toRefs(state), setSystemList }
}

//获取志愿者
export function getVolunteerLists() {
  const state = reactive({
    volunteerList: [],
    total: 0,
    loading: false
  })
  async function setVolunteerList() {
    try {
      state.loading = true
      const { msg, data, success } = await getVolunteer()
      state.loading = false
      if (success === true) {
        state.volunteerList = data
      } else {
        message.warn(msg)
      }
    } catch (error) {
      state.loading = false
      throw new Error(error)
    }
  }

  onMounted(() => {
    setVolunteerList()
  })
  return { ...toRefs(state), setVolunteerList }
}

//获取学生导师
export function getStuMentorList(params) {
  const state = reactive({
    stuMentorList: [],
    total: 0,
    loading: false
  })
  async function setStuMentorList() {
    try {
      state.loading = true
      const { msg, data, success } = await getStuMentors(params)
      state.loading = false
      if (success === true) {
        state.stuMentorList = data.list
        state.total = data.total
      } else {
        message.warn(msg)
      }
    } catch (error) {
      state.loading = false
      throw new Error(error)
    }
  }

  onMounted(() => {
    setStuMentorList()
  })
  return { ...toRefs(state), setStuMentorList }
}

//获取香港导师
export function getHkMentorList(params) {
  const state = reactive({
    stuMentorList: [],
    total: 0,
    loading: false
  })
  async function setStuMentorList() {
    try {
      state.loading = true
      const { msg, data, success } = await getHkMentors(params)
      state.loading = false
      if (success === true) {
        state.stuMentorList = data.list
        state.total = data.total
      } else {
        message.warn(msg)
      }
    } catch (error) {
      state.loading = false
      throw new Error(error)
    }
  }

  onMounted(() => {
    setStuMentorList()
  })
  return { ...toRefs(state), setStuMentorList }
}
