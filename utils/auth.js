import Router from 'next/router'
import axios from './api'

export const auth = async (res, setToken) => {
  let {data} = await axios.post('/auth/login', { ...res }, null)
  document.cookie = `token=${data.accessToken}; expires=${60 * 60 * 24 * 5};`
  setToken(data.accessToken)
  Router.push('/register')
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
