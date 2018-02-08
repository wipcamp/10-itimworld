import actionCreator from '../../utils/actionCreator'

// Actions
const dropdownAction = actionCreator('dropdown')
const SET_FIELD = dropdownAction('SET_FIELD')

const initialState = {
  files: {
    transcript: {
      error: false,
      file: null,
      uploaded: true,
      saving: false
    },
    allowByParent: {
      error: false,
      file: null,
      uploaded: false,
      saving: false
    }
  },
  message: ''
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD: {
      return {
        ...state,
        [action.field]: action.value
      }
    }

    default:
      return state
  }
}

// Action Creators
export const actions = {
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  })
}
