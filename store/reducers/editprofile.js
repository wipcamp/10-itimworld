import actionCreator from '../../utils/actionCreator'

// Actions
const editProfileAction = actionCreator('edit_profile')
const SAVE_PROFILE = editProfileAction('SAVE_PROFILE', true)

const initialState = {
  saving: false,
  error: false,
  message: '',
  showDialog: false
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROFILE.PENDING: {
      return {
        ...state,
        saving: true,
        showDialog: false
      }
    }

    case SAVE_PROFILE.FULFILLED: {
      return {
        ...state,
        saving: false,
        message: action.payload,
        showDialog: true
      }
    }

    case SAVE_PROFILE.REJECTED: {
      return {
        ...state,
        saving: false,
        message: action.payload,
        showDialog: true,
        error: true
      }
    }

    default:
      return state
  }
}

// Action Creators
export const actions = {
  saveProfile: (values) => {
    console.log(values)
  }
}
