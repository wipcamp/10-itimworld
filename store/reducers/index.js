import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import profile from './profile'
import register from './register'
import question from './question'

export default combineReducers({
  profile,
  form,
  register,
  question
})
