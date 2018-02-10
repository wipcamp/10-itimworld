/* global FormData */
import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
import cookie from '../../utils/cookie'

// Actions
const dashboardAction = actionCreator('dropdown')
const SET_FIELD_FILE = dashboardAction('SET_FIELD')
const HIDE_DIALOG = dashboardAction('HIDE_DIALOG')
const UPLOAD_TRANSCRIPT = dashboardAction('UPLOAD_TRANSCRIPT', true)
const UPLOAD_PARENTAL_AUTHORIZATION = dashboardAction('UPLOAD_PARENTAL_AUTHORIZATION', true)
const SET_FILE_PATH = dashboardAction('SET_FILE_PATH')

const initialState = {
  files: {
    transcription_record: {
      filePath: '',
      uploaded: true,
      saving: false,
      dropzoneActive: false
    },
    parental_authorization: {
      filePath: '',
      uploaded: false,
      saving: false,
      dropzoneActive: false
    }
  },
  error: false,
  showDialog: false,
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

    case HIDE_DIALOG: {
      return {
        ...state,
        showDialog: false
      }
    }

    case UPLOAD_TRANSCRIPT.PENDING: {
      return {
        ...state,
        files: {
          ...state.files,
          transcription_record: {
            ...state.files.transcription_record,
            saving: true,
            dropzoneActive: false
          }
        },
        showDialog: false
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
        },
        showDialog: false
      }
    }

    case UPLOAD_TRANSCRIPT.FULFILLED: {
      return {
        ...state,
        files: {
          ...state.files,
          transcription_record: {
            ...state.files.transcription_record,
            saving: false,
            filePath: action.payload.data.data.path
          }
        },
        error: false,
        showDialog: true,
        message: `อัพโหลด ปพ.1 เรียบร้อย`
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
        },
        error: false,
        showDialog: true,
        message: `อัพโหลด เอกสารขออนุญาตผู้ปกครองเรียบร้อย`
      }
    }

    case UPLOAD_TRANSCRIPT.REJECTED: {
      return {
        ...state,
        files: {
          ...state.files,
          transcription_record: {
            ...state.files.transcription_record,
            saving: false,
            dropzoneActive: false
          }
        },
        error: true,
        showDialog: true,
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
            saving: false,
            dropzoneActive: false
          }
        },
        error: true,
        showDialog: true,
        message: action.payload
      }
    }

    case SET_FILE_PATH: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            filePath: action.parent
          },
          transcription_record: {
            ...state.files.transcription_record,
            filePath: action.transcript
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
  onDropFile: (field, files, userId) => {
    const action = {
      transcription_record: UPLOAD_TRANSCRIPT,
      parental_authorization: UPLOAD_PARENTAL_AUTHORIZATION
    }
    if (files.length === 1) {
      const formData = new FormData()
      if (files[0].size > 2097152) {
        return {
          type: action[field].REJECTED,
          payload: 'ขนาดไฟล์เกิน 2 MB กรุณาอัพโหลดใหม่'
        }
      }

      formData.append('file', files[0])
      formData.append('fileType', field)
      formData.append('userId', userId)

      let {token} = cookie({req: false})
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
      return {
        type: action[field].ACTION,
        payload: api.post('/uploads', formData, headers)
      }
    } else if (files.length > 1) {
      return {
        type: action[field].REJECTED,
        payload: 'จำนวนไฟล์เกินที่กำหนด'
      }
    } else {
      return {
        type: action[field].REJECTED,
        payload: 'นามสกุลไฟล์ไม่ถูกต้อง'
      }
    }
  },
  hideDialog: () => {
    return {
      type: HIDE_DIALOG
    }
  },
  setFilePath: ({parent, transcript}) => ({
    type: SET_FILE_PATH,
    parent,
    transcript
  })
}
