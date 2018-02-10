import axios from 'axios'
import {api} from '../env.json'

const createInstance = (headers) => {
  return axios.create({
    baseURL: api,
    headers: {
      // 'x-access-token': ''
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE1MTgyNTY1MTAsImV4cCI6MTUxODI2MDExMCwibmJmIjoxNTE4MjU2NTEwLCJqdGkiOiJmZlFmS1Y4Y1R3eG82ZXU5Iiwic3ViIjoxMDAxMSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.eoU5tR3iaGan8GgvHvs2GHqu8BU6NxjZxD3z9SCOpeA'
    }
  })
}

const handleResponse = res => res.data ? Promise.resolve(res) : Promise.reject(res)

const catchError = err => Promise.reject(err.message)

export default {
  get: (path, headers = {}) => (
    createInstance(headers)
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createInstance(headers)
      .request({
        url: path,
        method: 'POST',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}, headers = {}) => (
    createInstance(headers)
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  )
}
