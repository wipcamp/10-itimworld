import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'

// Actions
const questionAction = actionCreator('answer')
const SET_QUESTION = questionAction('SET_QUESTION')
const SET_ANSWER = questionAction('SET_ANSWER')
const SET_CURRENT_QUESTION = questionAction('SET_CURRENT_QUESTION')
const SAVE_ANSWER = questionAction('SAVE_ANSWER')

const initialState = {
  questions: [],
  answers: {
    questionid: '',
    data: ''
  },
  currentQuestion:''
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
      return {
        ...state,
        answers: {
          questionid: action.qid,
          data: action.answer
        }
      }
    }

    case SET_CURRENT_QUESTION: {
      return {
        ...state,
        currentQuestion: action.questionData
      }
    }

    case SAVE_ANSWER: {
      console.log('posted')
      api.post(`/answers`,{
        question_id: action.qid,
        user_id: action.uid,
        data: action.answerData, 
      })
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
  }),
  setCurrentQuestion: (questionData) => ({
    type: SET_CURRENT_QUESTION,
    questionData
  }),
  saveAnswer: (qid,uid,answerData) => ({
    type: SAVE_ANSWER,
    qid,uid,answerData
  })
}
