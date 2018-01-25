import actionCreator from '../../utils/actionCreator'

// Actions
const questionAction = actionCreator('answer')
const SET_QUESTION = questionAction('SET_QUESTION')
const SET_ANSWER = questionAction('SET_ANSWER')

const initialState = {
  questions: [],
  answers: {
    questionid: '',
    data: ''
  },
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION: {
      return {
        ...state,
        questions:action.questions
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
  setQuestion: (questions) => ({
    type: SET_QUESTION,
    questions,
  }),
  setAnswer: (qid, answer) => ({
    type: SET_ANSWER,
    qid,
    answer
  })
}
