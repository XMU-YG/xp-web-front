/**
 *@Description:用于读取和存储本地存储和本地session
 *@author Toms He
 *@date 2021/1/21 15:11
 */
export default class LocalSave {
  static saveString(key, str) {
    window.localStorage.setItem(key, str)
  }
  static getString(key) {
    return window.localStorage.getItem(key)
  }
  static removeStorage() {
    return window.localStorage.clear()
  }
  static saveJson(key, val) {
    let str
    if (typeof val === 'string') {
      str = val
    } else {
      str = JSON.stringify(val)
    }
    window.localStorage.setItem(key, str)
  }
  static getJson(key) {
    let val = window.localStorage.getItem(key)
    return JSON.parse(val)
  }
  static saveSession(key, val) {
    if (typeof val === 'object') {
      window.sessionStorage.setItem(key, JSON.stringify(val))
    } else {
      window.sessionStorage.setItem(key, val)
    }
  }
  static getSession(key) {
    return window.sessionStorage.getItem(key)
  }
}
