import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import register from './register'
import question from './question'

export default combineReducers({
  register,
  form,
  question
})
