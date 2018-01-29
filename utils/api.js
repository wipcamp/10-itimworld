import axios from 'axios'

const createInstance = () => (
  axios.create({
    baseURL: process.env.API,
    headers: {
      // 'x-access-token': ''
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    }
  })
)

const handleResponse = res => res.data ? Promise.resolve(res) : Promise.reject(res)

const catchError = err => Promise.reject(err.message)

export default {
  get: path => (
    createInstance()
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createInstance()
      .request({
        url: path,
        method: 'POST',
        headers,
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}) => (
    createInstance()
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  )
}
