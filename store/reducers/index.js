import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import register from './register'

export default combineReducers({
  register,
  form
})
