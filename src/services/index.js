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
  return request.get('/api/user/student/highSchNames')
}
/**
 * 预受助学生信息列表服务
 * @returns Promise<{code: number, data: Array, msg: string}>
 */
export const getNoStuInfoService = async () => {
  return request.get('/api/user/student/list/not_fund')
}
