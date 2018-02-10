import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
import { convertToInt, convertToFloat, dataIsNotNull } from '../../utils/helper'
import cookie from '../../utils/cookie'

// Actions
const registerAction = actionCreator('register')
const SET_REGISTER_STEP = registerAction('SET_REGISTER_STEP')
const SAVE_PROFILE_STEP_ONE = registerAction('SAVE_PROFILE_STEP_ONE', true)
const SAVE_PROFILE_STEP_TWO = registerAction('SAVE_PROFILE_STEP_TWO', true)
const HIDE_DIALOG = registerAction('HIDE_DIALOG')
const SHOW_DIALOG = registerAction('SHOW_DIALOG')

const initialState = {
  error: false,
  message: '',
  showDialog: false,
  user_id: null,
  registerStep: 2
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG: {
      return {
        ...state,
        message: action.message,
        error: true,
        showDialog: true
      }
    }

    case HIDE_DIALOG: {
      return {
        ...state,
        showDialog: false
      }
    }

    case SAVE_PROFILE_STEP_ONE.PENDING:
    case SAVE_PROFILE_STEP_TWO.PENDING:
    {
      return {
        ...state,
        saving: true,
        error: null
      }
    }

    case SAVE_PROFILE_STEP_ONE.FULFILLED:
    case SAVE_PROFILE_STEP_TWO.FULFILLED:
    {
      return {
        ...state,
        saving: false,
        registerStep: state.registerStep + 1
      }
    }

    case SAVE_PROFILE_STEP_ONE.REJECTED:
    case SAVE_PROFILE_STEP_TWO.REJECTED:
    {
      return {
        ...state,
        saving: false,
        message: action.payload
      }
    }

    case SET_REGISTER_STEP: {
      return {
        ...state,
        registerStep: action.payload
      }
    }

    default:
      return state
  }
}

const prepareData = (form, fields) => {
  const data = {}
  fields.map(field => { data[field] = form[field] })
  return data
}

const getOnlyNum = (value) => value.replace(/[^\d]/g, '')

// Action Creators
export const actions = {
  setRegisterStep: (step) => ({
    type: SET_REGISTER_STEP,
    payload: step
  }),
  saveRegisterStep1: (values) => {
    const field = [
      'user_id',
      'first_name',
      'last_name',
      'first_name_en',
      'last_name_en',
      'nickname',
      'gender_id',
      'citizen_id',
      'religion_id',
      'birth_at',
      'blood_group',
      'congenital_diseases',
      'allergic_foods',
      'congenital_drugs',

      'addr_prov',
      'addr_dist',
      'telno_personal',
      'edu_name',
      'edu_lv',
      'edu_major',
      'edu_gpax',
      'birth_at',
      'parent_relation',
      'telno_parent'
    ]

    const data = prepareData(values, field)
    data.gender_id = convertToInt(data.gender_id)
    data.religion_id = convertToInt(data.religion_id)
    data.edu_gpax = convertToFloat(data.edu_gpax)

    if (values.blood_group === 'other') {
      data.blood_group = values.other_blood_group
    }
    if (data.birth_at) {
      data.birth_at = data.birth_at.format('YYYY-MM-DD')
    }
    data.telno_personal = getOnlyNum(data.telno_personal)
    data.telno_parent = getOnlyNum(data.telno_parent)
    data.citizen_id = getOnlyNum(data.citizen_id)
    let { token } = cookie({req: false})
    if (dataIsNotNull(data)) {
      return {
        type: SAVE_PROFILE_STEP_ONE.ACTION,
        payload: api.post('/profiles', data, {Authorization: `Bearer ${token}`})
      }
    } else {
      return {
        type: SAVE_PROFILE_STEP_ONE.REJECTED,
        payload: 'some field are not assigned or incorrect value'
      }
    }
  },
  saveRegisterStep2: (values) => {
    const field = [
      'user_id',
      'known_via',
      'activities',
      'skill_computer',
      'past_camp'
    ]

    const data = prepareData(values, field)
    let { token } = cookie({req: false})
    if (dataIsNotNull(data)) {
      return {
        type: SAVE_PROFILE_STEP_TWO.ACTION,
        payload: api.put('/profiles', data, {Authorization: `Bearer ${token}`})
      }
    } else {
      return {
        type: SAVE_PROFILE_STEP_TWO.REJECTED,
        payload: 'some field are not assigned or incorrect value'
      }
    }
  },
  onSubmitError: () => ({
    type: SHOW_DIALOG,
    message: 'กรุณากรอกฟิลด์ให้ครบถ้วน และถูกต้องนะครับ'
  }),
  hideDialog: () => ({
    type: HIDE_DIALOG
  })
}
