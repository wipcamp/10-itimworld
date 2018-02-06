import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import register from './register'
import dashboard from './dashboard'

export default combineReducers({
  register,
  form,
  dashboard
})
