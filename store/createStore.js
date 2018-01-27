import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from './reducers'

const middlewares = [promise(), thunkMiddleware]

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f
if (process.env.NODE_ENV !== 'production' && process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
  middlewares.push(logger)
}

export const initStore = (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devtools
    )
  )
  return store
}
