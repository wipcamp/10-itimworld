import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

export const initStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      devtools
    )
  )
}
