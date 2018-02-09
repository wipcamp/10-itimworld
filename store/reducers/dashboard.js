import actionCreator from '../../utils/actionCreator'

// Actions
const dropdownAction = actionCreator('dropdown')
const SET_FIELD_FILE = dropdownAction('SET_FIELD')

const initialState = {
  files: {
    transcript: {
      error: false,
      file: [],
      uploaded: true,
      saving: false,
      dropzoneActive: false
    },
    allowByParent: {
      error: false,
      file: [],
      uploaded: false,
      saving: false,
      dropzoneActive: false
    }
  },
  message: ''
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_FILE: {
      return {
        ...state,
        files: {
          ...state.files,
          [action.field]: {
            ...state.files[action.field],
            [action.attr]: action.value
          }
        }
      }
    }

    default:
      return state
  }
}

// Action Creators
export const actions = {
  setDragActive: ({field, dropActive}) => ({
    type: SET_FIELD_FILE,
    field,
    value: dropActive,
    attr: 'dropzoneActive'
  }),
  onDropFile: (field, files) => ({
    type: SET_FIELD_FILE,
    field,
    value: files,
    attr: 'files'
  })
}
