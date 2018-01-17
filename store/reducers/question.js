import actionCreator from '../../utils/actionCreator'

// Actions
// const registerAction = actionCreator('register')
// const SET_FIELD = registerAction('SET_FIELD')

const initialState = {
  questions: [
    {
      id: 1,
      data: 'Question 1',
    },
    {
      id: 2,
      data: 'Question 2'
    }
  ],
  answers: [
    {
      questionid: 1,
      data: 'answerrr'
    }
  ]
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    // case SET_FIELD: {
    //   return {
    //     ...state,
    //     [action.field]: action.value
    //   }
    // }

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
