import Cookies from 'js-cookie'
export default function setToken() {
  if (window.location.search) {
    let query = window.location.search
      .substring(1)
      .split('&')
      .reduce((prev, curr) => {
        let params = curr.split('=')
        prev[params[0]] = params[1]
        return prev
      }, {})

    if (query && query.token) {
      Cookies.set('token', query.token, { expires: 7 })
    }
  }
}
