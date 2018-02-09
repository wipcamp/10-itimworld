/* global FormData */

import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
import { convertToInt, convertToFloat, dataIsNotNull } from '../../utils/helper'

// Actions
const registerAction = actionCreator('register')
const SET_FIELD = 'SET_FIELD'
const SAVE_PROFILE = registerAction('SAVE_PROFILE', true)
const CHANGE_FILE = registerAction('CHANGE_FILE')
const UPLOAD_FILE = registerAction('CHANGE_FILE', true)
const HIDE_DIALOG = registerAction('HIDE_DIALOG')
const SHOW_DIALOG = registerAction('SHOW_DIALOG')

const initialState = {
  error: false,
  message: '',
  showDialog: false,
  user_id: null,
  registerStep: 1
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

    case SAVE_PROFILE.PENDING: {
      return {
        ...state,
        saving: true,
        error: null
      }
    }

    case SAVE_PROFILE.FULFILLED: {
      return {
        ...state,
        saving: false,
        registerStep: 2
      }
    }

    case SAVE_PROFILE.REJECTED: {
      return {
        ...state,
        saving: false,
        message: action.payload
      }
    }

    case CHANGE_FILE: {
      return {
        ...state,
        file: action.payload
      }
    }

    case UPLOAD_FILE.PENDING: {
      return {
        ...state
      }
    }

    case UPLOAD_FILE.FULFILLED: {
      return {
        ...state,
        message: 'upload susccess',
        data: action.payload
      }
    }

    case UPLOAD_FILE.REJECTED: {
      return {
        ...state,
        message: action.payload
      }
    }

    case 'EIEI': {
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
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  }),
  saveRegister: (values) => {
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
      // 'known_via',
      // 'activities',
      // 'skill_computer',
      // 'past_camp',
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
    console.log(data)
    if (dataIsNotNull(data)) {
      return {
        type: SAVE_PROFILE.ACTION,
        payload: api.post('/profiles', data)
      }
    } else {
      return {
        type: SAVE_PROFILE.REJECTED,
        payload: 'some field are not assigned or incorrect value'
      }
    }
  },
  onSubmitError: () => ({
    type: SHOW_DIALOG,
    message: 'กรุณากรอกฟิลด์ให้ครบ'
  }),
  hideDialog: () => ({
    type: HIDE_DIALOG
  }),
  setRegisterStep: (payload) => ({
    type: 'EIEI',
    payload
  })
}
