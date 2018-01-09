import actionCreator from '../../utils/actionCreator'

// Actions
const registerAction = actionCreator('register')
const SET_FIELD = registerAction('SET_FIELD')

const initialState = {
  // step 1
  firstName: '',
  lastName: '',
  firstNameEN: '',
  lastNameEN: '',
  nickname: '',
  birthdate: '',
  sex: '',
  blood: '',
  religion: '',
  picture: {},
  previewPicture: '',
  // step 2
  address: '',
  province: '',
  postalCode: '',
  email: '',
  phone: '',
  emergencyPhone: '',
  emergencyName: '',
  emergencyPhoneRelated: '',
  shirtSize: '',
  // step 3
  questions: []
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
