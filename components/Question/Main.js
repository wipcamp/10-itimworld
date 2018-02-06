import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'
import api from '../../utils/api'
import {Link} from '../../routes'

export const MainQuestion = props => {
  const { question: { questions: allQuestion }, setQuestion } = props
  return (
    <div>
      <h1>Questions</h1>
      { allQuestion.map((question) => (
        <Link route={`/question/answer/${question.id}`} prefetch key={question.id}>
          <button>{question.id + ': ' + question.data}</button>
        </Link>
      ))}
    </div>
  )
}

const getQuestions = (props) => {
  console.log('getQuestions')
  let {setQuestion} = props
  api.get('/questions')
  .then((response)=>{
    setQuestion(response.data)
  })
}

export default compose(
  connect(
    state => ({
      question: state.question
    }),
    { ...questionActions }
  ),
  lifecycle({
    componentWillMount() {
      getQuestions(this.props)
    }
  })
)(MainQuestion)
