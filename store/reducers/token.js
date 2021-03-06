import actionCreator from '../../utils/actionCreator'

// Actions
const profileAction = actionCreator('token')
const SET_TOKEN = profileAction('SET_TOKEN')

const initialState = {
  token: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        token: action.token
      }
    }
    default:
      return state
  }
}

// Action Creators
export const actions = {
  setToken: token => ({
    type: SET_TOKEN,
    token
  })
}
