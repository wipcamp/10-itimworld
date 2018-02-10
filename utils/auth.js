import {Router} from '../routes'
import axios from './api'
import getCookie from './cookie'
import cookie from 'cookie'

export const auth = async (res, setToken) => {
  let {data} = await axios.post('/auth/login', { ...res }, null)
  document.cookie = cookie.serialize('token', data.accessToken, { maxAge: 60 * 60 * 24 * 5 })
  setToken(data.accessToken)
  Router.pushRoute('/register')
}

export const logout = async () => {
  let { token } = await getCookie({req: false})
  await axios.post('/auth/logout', null, {Authorization: `Bearer ${token}`})
  document.cookie = cookie.serialize('token', null)
  Router.pushRoute('/logout')
}

export const postData = async res => {
  let { data } = await axios.post('/users', { ...res }, null)
  if (data) {
    return data
  }
  return null
}

export const getUserData = res => axios.post(`/users/${res.id}`, { ...res }, null)

export const responser = async (res, setToken, setLoad) => {
  let user = await getUserData(res)
  if (!user.data.data) {
    user = await postData(res)
  }
  setLoad(false)
  auth(res, setToken)
}
