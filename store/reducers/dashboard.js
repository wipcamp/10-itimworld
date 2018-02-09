/* global FormData */
import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'

// Actions
const dashboardAction = actionCreator('dropdown')
const SET_FIELD_FILE = dashboardAction('SET_FIELD')
const UPLOAD_FILE = dashboardAction('UPLOAD_FILE', true)
const UPLOAD_TRANSCRIPT = dashboardAction('UPLOAD_TRANSCRIPT', true)
const UPLOAD_PARENTAL_AUTHORIZATION = dashboardAction('UPLOAD_PARENTAL_AUTHORIZATION', true)

const initialState = {
  files: {
    transcript: {
      error: false,
      filePath: '',
      uploaded: true,
      saving: false,
      dropzoneActive: false
    },
    parental_authorization: {
      error: false,
      filePath: '',
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

    case UPLOAD_FILE.PENDING: {
      console.log('pending ==========')
      console.log(action)
      return {
        ...state,
        files: {
          ...state.files,
          [action.field]: {
            ...state.files[action.field],
            saving: true,
            dropzoneActive: false
          }
        }
      }
    }

    case UPLOAD_FILE.FULFILLED: {
      return {
        ...state,
        files: {
          ...state.files,
          [action.field]: {
            ...state.files[action.field],
            saving: false,
            file: action.file
          }
        }
      }
    }

    case UPLOAD_FILE.REJECTED: {
      return {
        ...state,
        files: {
          ...state.files,
          transcript: {
            ...state.files[action.field],
            saving: false
          },
          parental_authorization: {
            ...state.files[action.field],
            saving: false
          }
        },
        message: action.payload
      }
    }

    case UPLOAD_TRANSCRIPT.PENDING: {
      return {
        ...state,
        files: {
          ...state.files,
          transcript: {
            ...state.files.transcript,
            saving: true,
            dropzoneActive: false
          }
        }
      }
    }

    case UPLOAD_PARENTAL_AUTHORIZATION.PENDING: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            saving: true,
            dropzoneActive: false
          }
        }
      }
    }

    case UPLOAD_TRANSCRIPT.FULFILLED: {
      return {
        ...state,
        files: {
          ...state.files,
          transcript: {
            ...state.files.transcript,
            saving: false,
            filePath: action.payload.data.data.path
          }
        }
      }
    }

    case UPLOAD_PARENTAL_AUTHORIZATION.FULFILLED: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            saving: false,
            filePath: action.payload.data.data.path
          }
        }
      }
    }

    case UPLOAD_TRANSCRIPT.REJECTED: {
      return {
        ...state,
        files: {
          ...state.files,
          transcript: {
            ...state.files.transcript,
            saving: false
          }
        },
        message: action.payload
      }
    }

    case UPLOAD_PARENTAL_AUTHORIZATION.REJECTED: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            saving: false
          }
        },
        message: action.payload
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
  onDropFile: (field, file) => {
    const action = {
      transcript: UPLOAD_TRANSCRIPT,
      parental_authorization: UPLOAD_PARENTAL_AUTHORIZATION
    }
    if (file) {
      const formData = new FormData()
      formData.append('file', file[0])
      formData.append('fileType', field)
      formData.append('userId', 10000)
      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      return {
        type: action[field].ACTION,
        payload: api.post('/uploads', formData, headers)
      }
    } else {
      return {
        type: action[field].REJECTED,
        payload: 'no file found!'
      }
    }
  }
}
