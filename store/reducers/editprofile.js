import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
import cookie from '../../utils/cookie'

import { convertToInt, convertToFloat, dataIsNotNull } from '../../utils/helper'

// Actions
const editProfileAction = actionCreator('edit_profile')
const SAVE_PROFILE = editProfileAction('SAVE_PROFILE', true)
const SHOW_DIALOG = editProfileAction('SHOW_DIALOG')
const HIDE_DIALOG = editProfileAction('HIDE_DIALOG')

const initialState = {
  saving: false,
  error: false,
  message: '',
  showDialog: false
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG: {
      return action.payload && {
        ...state,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้องนะครับ',
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

const getOnlyNum = (value) => value.replace(/[^\d]/g, '')

const prepareData = (form, fields) => {
  const data = {}
  fields.map(field => {
    if (['gender_id', 'religion_id'].includes(field)) {
      data[field] = convertToInt(form[field])
    } else if (['edu_gpax'].includes(field)) {
      data[field] = convertToFloat(form[field])
    } else if (field === 'blood_group' && form.blood_group === 'other') {
      data[field] = form.other_blood_group
    } else if (field === 'birth_at' && form.birth_at) {
      data[field] = form[field].format('YYYY-MM-DD')
    } else if (['telno_personal', 'telno_parent', 'citizen_id'].includes(field)) {
      data[field] = getOnlyNum(form[field])
    } else {
      data[field] = form[field]
    }
  })
  return data
}

// Action Creators
export const actions = {
  saveProfile: (values) => {
    const fields = [
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
      'parent_relation',
      'telno_parent',

      'known_via',
      'activities',
      'past_camp',
      'skill_computer'
    ]

    const data = prepareData(values, fields)
    let {token} = cookie({req: false})
    if (dataIsNotNull(data)) {
      return {
        type: SAVE_PROFILE.ACTION,
        payload: api.put('/profiles', data, {Authorization: `Bearer ${token}`})
      }
    } else {
      return {
        type: SAVE_PROFILE.REJECTED,
        payload: 'some field are not assigned or incorrect value'
      }
    }
  },
  onSubmitError: (err) => ({
    type: SHOW_DIALOG,
    payload: err
  }),
  hideDialog: () => ({
    type: HIDE_DIALOG
  })
}
