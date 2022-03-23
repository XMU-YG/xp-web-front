/**
 *@Description:用于公用的ajax方法
 *@author Toms He
 *@date 2021/1/21 15:12
 */
import localSave from './localSave'
import axios from 'axios'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'
import qs from 'qs'

const pending = new Map()

/**添加请求
 * @param {Object} config
 */
const addPending = config => {
  let url = [config.url, config.method]
  if (config.params) {
    url.push(qs.stringify(config.params))
  }
  if (config.data) {
    url.push(qs.stringify(config.data))
  }
  url = url.join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        pending.set(url, cancel)
      }
    })
}

/**移出请没地方
 * @param {Object} config
 */
const removePending = config => {
  let url = [config.url, config.method]
  if (config.params) {
    url.push(config.params)
  }
  if (config.data) {
    url.push(qs.stringify(config.data))
  }
  url = url.join('&')
  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空pending（在路由跳转时使用）
 */

export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

axios.interceptors.request.use(config => {
  removePending(config)
  addPending(config)

  let token = Cookies.get('token')
  let platformCode = Cookies.get('platformCode')
  if (platformCode) {
    config.headers = {
      ...config.headers,
      // platformCode: platformCode
      platformCode: 'education',
      module: 1
    }
  }

  if (token) {
    config.headers = {
      ...config.headers,
      token: token,
      module: 1
    }
  }
  if (config.params && config.params.all) {
    config.headers = {
      ...config.headers,
      platformCode: 'education',
      module: 1
    }
  }

  return config
})
axios.interceptors.response.use(
  response => {
    removePending(response)
    return response
  },
  error => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.msg
    ) {
      message.error(error.response.data.msg)
    } else {
      message.error('服务器异常')
    }
    console.log(error, 'error')
    if (error.response.data && error.response.data.code === 302000) {
      const { data } = error.response.data
      if (data && data.redirectUrl) {
        window.location.href = data.redirectUrl
      }
    }
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    } else {
      // handle error code
      return Promise.reject(error)
    }
  }
)
class Request {
  get(url, params) {
    if (typeof url !== 'string') {
      return
    }
    const config = {
      url: url,
      method: 'GET',
      params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        role: 1,
        mt: localSave.getSession('mt') ? localSave.getSession('mt') : undefined,
        platformCode: 'education'
      }
    }
    return axios(config).then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
  }
  post(url, data) {
    const config = {
      url: url,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        role: 1,
        mt: localSave.getSession('mt') ? localSave.getSession('mt') : undefined,
        platformCode: 'education'
      }
    }
    return axios(config).then(res => {
      if (res.status === 200) {
        return res.data
      } else {
        return message.error('内部错误')
      }
    })
  }
  put(url, data) {
    const config = {
      url: url,
      method: 'PUT',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        role: 1,
        mt: localSave.getSession('mt') ? localSave.getSession('mt') : undefined,
        platformCode: 'education'
      }
    }
    return axios(config).then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
  }
  patch(url, data) {
    const config = {
      url: url,
      method: 'PATCH',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        role: 1,
        mt: localSave.getSession('mt') ? localSave.getSession('mt') : undefined,
        platformCode: 'education'
      }
    }
    return axios(config).then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
  }
  delete(url, data) {
    const config = {
      url: url,
      method: 'DELETE',
      params: data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        role: 1,
        mt: localSave.getSession('mt') ? localSave.getSession('mt') : undefined,
        platformCode: 'education'
      }
    }
    return axios(config).then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
  }
  all(requests) {
    return axios
      .all(requests)
      .then(res => {
        return res
      })
      .catch(() => {
        message.error('服务器异常')
      })
  }
}
export default new Request()
