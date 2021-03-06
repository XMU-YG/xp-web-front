import request from '@/utils/request'

/**
 * 已受助学生信息列表服务
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getAlreadyStuInfoService = async params => {
  return request.get('/api/user/student/query', params)
}

/**
 * 香港导师列表服务
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getHkMentors = async params => {
  return request.get('/api/user/mentor/hk_mentors', params)
}

/**
 * 学生导师列表服务
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getStuMentors = async params => {
  return request.get('/api/user/mentor/stu_mentors', params)
}

/**
 * 删除已受助学生信息
 * @returns Promise<{code: number, msg: string}>
 */
export const deleteAlreadyStu = async id => {
  return request.put('/api/user/delete/' + id)
}

/**
 * 修改已受助学生信息
 * @returns Promise<{code: number, msg: string}>
 */
export const putAlreadyStu = async info => {
  return request.put('/api/user/student/updateInfo', info)
}

/**
 * 修改已受助学生大学列表
 * @returns Promise<{code: number, msg: string}>
 */
export const getUniversityNames = async () => {
  return request.get('/api/user/student/universityNames')
}

/**
 * 修改已受助学生大学列表
 * @returns Promise<{code: number, msg: string}>
 */
export const getHighSchoolNames = async () => {
  return request.get('/api/user/school/list')
}
/**
 * 预受助学生信息列表服务
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getNoStuInfoService = async () => {
  return request.get('/api/user/student/listPage/not_fund')
}

/**
 * 获取门户首页推荐图片
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getIndexImages = async () => {
  return request.get('/api/system/images')
}

/**
 * 获取首页推荐文章
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getIndexArticle = async () => {
  return request.get('/api/article/recommend')
}

/**
 * 获取菜单栏
 * params: userId=xx
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getMenuList = async params => {
  return request.get('/api/user/menuList', params)
}

/**
 * 获取导师下的学生
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getStudentByMentorId = async currentUserId => {
  return request.get('/api/user/student/mentor/' + currentUserId)
}

/**
 * 获取志愿者家访学生
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getStudentByVolunteerId = async currentUserId => {
  return request.get('/api/user/student/volunteer/' + currentUserId)
}

/**
 * 获取某人成绩报告
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getReportsByUserId = async userId => {
  return request.get('/api/article/user/' + userId + '/gradeReports')
}

/**
 * 根据文章id查看文章详细信息
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getArticleDetails = async articleId => {
  return request.get('/api/article/detail/' + articleId)
}

/**
 * 获取所有可见文章 分页接口
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getAllArticle = async params => {
  return request.get('/api/article/allCanSee', params)
}

/**
 * 根据userId获取某人文章
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getArticleByUserId = async userId => {
  return request.get('/api/article/user/' + userId)
}

/**
 * 创建文章
 * @returns Promise<{code: ntumber, data: Array, msg: string}>
 */
export const createArticle = async article => {
  return request.post('/api/article/create', article)
}

/**
 * 上传图片
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const uploadFile = async params => {
  return request.post('/api/file/upload', params)
}

/**
 * 获取管理员
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getSystem = async () => {
  return request.get('/api/user/managers')
}

/**
 * 获取志愿者
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getVolunteer = async () => {
  return request.get('/api/volunteer/list')
}

/**
 * 获取助学金申请
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getFundApplyList = async () => {
  return request.get('/api/apply/fund/list')
}

/**
 * 修改助学申请状态
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const editFundApplyStatus = async (applyId, userId, status) => {
  return request.post(
    '/api/apply/fund/status/' + userId + '/' + applyId,
    status
  )
}

/**
 * 按状态获取其他所有申请
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getOtherApplyList = async params => {
  return request.get('/api/apply/normal/list', params)
}

/**
 * 修改普通申请状态
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const editOtherApplyStatus = async (applyId, status) => {
  return request.put('/api/apply/normal/check/' + applyId, status)
}

/**
 * 登录
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const login = async params => {
  return request.get('/api/user/student/login', params)
}

/**
 * 修改或者增加志愿者信息
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const editVolunteer = async data => {
  return request.post('/api/volunteer/edit', data)
}

/**
 * 根据用户id获取申请信息
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getFundApplyByUserId = async userId => {
  return request.get('/api/apply/student/' + userId)
}

/**
 * 修改创建反馈表单
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const editFeedBack = async feedback => {
  return request.post('/api/volunteer/feedback/edit', feedback)
}

/**
 * 根据学生id获取反馈表单
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getFeedBack = async studentId => {
  return request.get('/api/volunteer/feedback/selectByStudentId', {
    studentId: studentId
  })
}

/**
 * 根据学生id获取用户信息
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getUsersbyIds = async studentId => {
  return request.get('/api/user/student/list/' + studentId)
}

/**
 * 重置密码
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const reset = async vo => {
  return request.put('/api/user/reset', vo)
}

/**
 * 发送验证码
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const sendCode = async parmas => {
  return request.get('/api/code/send', parmas)
}

/**
 * 校验登录态
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const checkLogin = async userId => {
  return request.get('/api/user/checkLogin', {
    userId: userId
  })
}

/**
 * 登出
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const logout = async userId => {
  return request.get('/api/user/logout', {
    userId: userId
  })
}
