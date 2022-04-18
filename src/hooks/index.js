import {
  getAlreadyStuInfoService,
  getNoStuInfoService,
  getSystem,
  getVolunteer,
  getStuMentors,
  getHkMentors,
  getFundApplyList,
  getOtherApplyList,
  getHighSchoolNames,
  getArticleDetails,
  getStudentByMentorId,
  getStudentByVolunteerId,
  getFundApplyByUserId,
  getAllArticle,
  getArticleByUserId
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
        state.notStuList = data.list
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

//获取所有申请
export function getAllFundApply() {
  const state = reactive({
    fundApplyList: [],
    total: 0,
    loading: false
  })
  async function setFundApplyList() {
    try {
      state.loading = true
      const { msg, data, success } = await getFundApplyList()
      state.loading = false
      if (success === true) {
        state.fundApplyList = data
      } else {
        message.warn(msg)
      }
    } catch (error) {
      state.loading = false
      throw new Error(error)
    }
  }

  onMounted(() => {
    setFundApplyList()
  })
  return { ...toRefs(state), setFundApplyList }
}

//获取所有申请
export function getOtherApplyByStatus(status) {
  const state = reactive({
    ApplyList: [],
    total: 0,
    loading: false
  })
  async function setApplyList() {
    try {
      state.loading = true
      const { msg, data, success } = await getOtherApplyList({
        status: status
      })
      state.loading = false
      if (success === true) {
        state.ApplyList = data
      } else {
        message.warn(msg)
      }
    } catch (error) {
      state.loading = false
      throw new Error(error)
    }
  }

  onMounted(() => {
    setApplyList()
  })
  return { ...toRefs(state), setApplyList }
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

//获取高中学校
export function getHighSchools() {
  const state = reactive({
    list: []
  })
  //获取高中学校列表
  async function getHighSchool() {
    try {
      const { msg, data, success } = await getHighSchoolNames()
      if (success === true) {
        state.list = data
      } else {
        message.warn(msg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  // onMounted(() => {
  //   getHighSchool()
  // })
  return { ...toRefs(state), getHighSchool }
}

//获取文章详情
export function getArticleDetail(id) {
  const state = reactive({
    article: undefined
  })
  async function getArticle(id) {
    try {
      const { errMsg, data, success } = await getArticleDetails(id)
      if (success === true) {
        state.article = data
      } else {
        message.warn(errMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  onMounted(() => {
    getArticle(id)
  })
  return { ...toRefs(state), getArticle }
}

//获取导师学生
export function getStudentsByMentorId(mentorId) {
  const state = reactive({
    list: [],
    loading: false
  })
  async function setList(mentorId) {
    try {
      state.loading = true
      const { errMsg, data, success } = await getStudentByMentorId(mentorId)
      state.loading = false
      if (success === true) {
        state.list = data
      } else {
        message.warn(errMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  onMounted(() => {
    setList(mentorId)
  })
  return { ...toRefs(state), setList }
}

//获取家访学生
export function getStudentsByVolunteerId(volunteerId) {
  const state = reactive({
    list: [],
    loading: false
  })
  async function setList(mentorId) {
    try {
      state.loading = true
      const { errMsg, data, success } = await getStudentByVolunteerId(
        volunteerId
      )
      state.loading = false
      if (success === true) {
        state.list = data
      } else {
        message.warn(errMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  onMounted(() => {
    setList(volunteerId)
  })
  return { ...toRefs(state), setList }
}

//根据id获取学生申请信息
export function getFundApply(userId) {
  const state = reactive({
    info: {}
  })
  async function setInfo(userId) {
    try {
      const { errMsg, data, success } = await getFundApplyByUserId(userId)
      console.log(data, 'http')
      if (success === true) {
        state.info = data
      } else {
        message.warn(errMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  onMounted(() => {
    setInfo(userId)
  })
  return { ...toRefs(state), setInfo }
}

//获取所有可见文章
export function allArticles(params) {
  const state = reactive({
    list: [],
    total: 0,
    loading: false
  })
  async function setList() {
    try {
      state.loading = true
      const { errMsg, data, success } = await getAllArticle(params)
      state.loading = false
      if (success === true) {
        state.list = data.list
        state.total = data.total
      } else {
        message.warn(errMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  onMounted(() => {
    setList(params)
  })
  return { ...toRefs(state), setList }
}

//获取某人文章
export function selfArticles(userId) {
  const state = reactive({
    articles: [],
    loading: false
  })
  async function setArticles(userId) {
    try {
      state.loading = true
      const { errMsg, data, success } = await getArticleByUserId(userId)
      state.loading = false
      if (success === true) {
        state.list = data
      } else {
        message.warn(errMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  onMounted(() => {
    setArticles(userId)
  })
  return { ...toRefs(state), setArticles }
}
