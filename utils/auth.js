import {Router} from '../routes'
import axios from './api'
import getCookie from './cookie'
import cookie from 'cookie'

export const auth = async (res, setToken) => {
  let {data} = await axios.post('/auth/login', { ...res }, null)
  document.cookie = cookie.serialize('token', data.accessToken, { maxAge: 60 * 60 * 24 * 5 })
  setToken(data.accessToken)
  Router.pushRoute('/accept-camper')
}

export const logout = async () => {
  let { token } = await getCookie({req: false})
  await axios.post('/auth/logout', null, {Authorization: `Bearer ${token}`})
  let allCookie = cookie.parse(document.cookie)
  for (const key of Object.keys(allCookie)) {
    document.cookie = await cookie.serialize(key, allCookie[key], { maxAge: 0 })
  }
  Router.pushRoute('/logout')
  setTimeout(() => window.location.replace('https://wip.camp'), 2500)
}

export const postData = async res => {
  let { data } = await axios.post('/users', { ...res }, null)
  if (data) {
    return data
  }
  return null
}

export const getUserData = res => axios.post(`/users/${res.id}`, { ...res }, null)

export const responser = async (res, setToken) => {
  let user = await getUserData(res)
  if (!user.data.data) {
    user = await postData(res)
  }
  auth(res, setToken)
}
