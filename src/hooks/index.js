import { getAlreadyStuInfoService, getNoStuInfoService } from '@/services'
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
