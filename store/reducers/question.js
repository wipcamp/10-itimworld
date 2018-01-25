import actionCreator from '../../utils/actionCreator'

// Actions
const questionAction = actionCreator('answer')
const SET_FIELD = questionAction('SET_FIELD')
const SET_ANSWER = questionAction('SET_ANSWER')

const initialState = {
  questions: [
    {
      id: 1,
      data: 'Question 1'
    },
    {
      id: 2,
      data: 'Question 2'
    }
  ],
  answers: [
    {
      questionid: 1,
      data: ''
    }
  ]
  /*
  another way to assign answer object that easy to find
  answers: {
    questionid: '',
    data: ''
  },
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

    case SET_ANSWER: {
      // find answer
      const answerFromState = state.answers.find(data => data.questionid === action.qid)
      answerFromState.data = action.answer
      return {
        ...state
        answers: {
          questionid: action.qid,
          data: action.answer
        }
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
  }),
  setAnswer: (qid, answer) => ({
    type: SET_ANSWER,
    qid,
    answer
  })
}
