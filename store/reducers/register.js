import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
import { convertToInt, convertToFloat, dataIsNotNull } from '../../utils/helper'

// Actions
const registerAction = actionCreator('register')
const SET_FIELD = 'SET_FIELD'
const SAVE_PROFILE = registerAction('SAVE_PROFILE', true)
const CHANGE_FILE = registerAction('CHANGE_FILE')

const initialState = {
  saving: false,
  error: null,
  data: null,
  message: '',
  file: null
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
        saving: false
      }
    }

    case SAVE_PROFILE.REJECTED: {
      return {
        ...state,
        saving: false,
        error: action.message
      }
    }

    case CHANGE_FILE: {
      return {
        ...state,
        file: action.payload
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
      'known_via',
      'activities',
      'skill_computer',
      'past_camp',
      'parent_relation',
      'telno_parent'
    ]

    const data = prepareData(values, field)
    if (values.dob_dd &&
        values.dob_mm &&
        values.dob_yyyy) {
      data.birth_at = `${values.dob_yyyy}-${values.dob_mm}-${values.dob_dd}`
    }
    data.gender_id = convertToInt(data.gender_id)
    data.religion_id = convertToInt(data.religion_id)
    data.edu_gpax = convertToFloat(data.edu_gpax)

    if (values.blood_group === 'other') {
      data.blood_group = values.other_blood_group
    }

    console.log('data -> ', data)
    console.log('values ', values)
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
  changeFileUpload: (event) => ({
    type: CHANGE_FILE,
    payload: event.target.files[0]
  })
}
