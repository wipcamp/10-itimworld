import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from './reducers'

import Raven from 'raven-js'
import createRavenMiddleware from 'raven-for-redux'

Raven.config('https://84c20434b19a4b789bebc41df8128b47@sentry.io/286316').install()

const middlewares = [promise(), thunkMiddleware, createRavenMiddleware(Raven, {})]

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
