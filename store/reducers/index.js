import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import register from './register'
import dashboard from './dashboard'
import question from './question'

export default combineReducers({
  register,
  form,
  dashboard,
  question
})
