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
export const putAlreadyStu = async params => {
  return request.put('/api/user/student/updateInfo?studentInfo=' + params)
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
  return request.get('/api/user/student/list/not_fund')
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
  console.log('xxxxxxxxxxx')
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
  return request.get('/api/user/mentor/' + currentUserId)
}

/**
 * 获取志愿者家访学生
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getStudentByVolunteerId = async currentUserId => {
  return request.get('/api/user/volunteer/' + currentUserId)
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
export const createArticle = async params => {
  return request.post('/api/article/create', params)
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
