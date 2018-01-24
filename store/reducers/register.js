/* global FormData */

import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
// Actions
const registerAction = actionCreator('register')
const SET_FIELD = 'SET_FIELD'
const SAVE_PROFILE = registerAction('SAVE_PROFILE', true)

const initialState = {
  saving: false,
  error: null,
  data: null,
  message: ''
}

// Reducer
export default (state = initialState, action) => {
  console.log('action inject > ', action)
  switch (action.type) {
    case SET_FIELD: {
      return {
        ...state,
        [action.field]: action.value
      }
    }

    case SAVE_PROFILE.PENDING: {
      console.log('pending -> res: ', action)
      return {
        ...state,
        saving: true,
        error: null
      }
    }

    case SAVE_PROFILE.FULFILLED: {
      console.log('resolve -> res: ', action)
      return {
        ...state,
        saving: false
      }
    }

    case SAVE_PROFILE.REJECTED: {
      console.log('reject -> err: ', action)
      return {
        ...state,
        saving: false,
        error: action.message
      }
    }

    default:
      return state
  }
}

const prepareFormData = (form, fields) => {
  const data = new FormData()
  fields.forEach((field) => {
    data.append(field, form[field])
  })
  return data
}

const prepare = (form, fields) => {
  const data = {}
  fields.map(e => {
    data[e] = form[e]
  })
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
      // 'user_id',
      'first_name',
      'last_name',
      'first_name_en',
      'last_name_en',
      'nickname',
      // 'gender_id',
      'citizen_id',
      'religion_id',
      // 'birth_at',
      'blood_group',
      'congenital_diseases',
      'allergic_foods',
      'congenital_drugs',

      // 'addr',
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
      'parent_first_name',
      'parent_last_name',
      'parent_relation',
      'telno_parent'
    ]

    const temp = prepare(values, field)
    if (values.dob_dd &&
        values.dob_mm &&
        values.dob_yyyy) {
      temp['birth_at'] = `${values.dob_yyyy}-${values.dob_mm}-${values.dob_dd}`
    } else {
      console.log('d > ', values.dob_dd)
      console.log('m > ', values.dob_mm)
      console.log('y > ', values.dob_yyyy)
      temp['birth_at'] = '2017-1-1'
    }

    if (values.gender_id) {
      try {
        temp['gender_id'] = +values.gender_id
      } catch (err) {
        temp['gender_id'] = 2
      }
    } else {
      temp['gender_id'] = 2
    }
    // temp['user_id'] = 1
    temp['addr'] = 'ที่อยู่'
    // temp['religion_id'] = 1

    const data = prepareFormData(values, field)
    data.append('birth_at', '2017-1-1')
    data.append('user_id', 3)
    data.append('addr', 'ที่อยู่')

    console.log('temp -> ', temp)
    console.log('values ', values)
    return {
      type: SAVE_PROFILE.ACTION,
      payload: api.post('/profiles', temp)
    }
  }
}
