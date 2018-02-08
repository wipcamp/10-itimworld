import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import token from './token'
import register from './register'
import dashboard from './dashboard'
import question from './question'

export default combineReducers({
  token,
  form,
  register,
  dashboard,
  question
})
