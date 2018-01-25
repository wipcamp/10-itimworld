import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'
import axios from 'axios'
import {Link} from '../../routes'

export const MainQuestion = props => {
  const { question: { questions: allQuestion }, setQuestion } = props
  return (
    <div>
      <h1>Questions</h1>
      { allQuestion.map((question) => (
        <Link route={`/question/answer/${question.id}`} prefetch  key={question.id}>
          <button>{question.id + ': ' + question.data}</button>
        </Link>
      ))}
    </div>
  )
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
      let {setQuestion} = this.props
      axios.get('http://localhost:8000/api/v1/questions')
      .then(function(response) {
        setQuestion(response.data)
      })
    }
  })
)(MainQuestion)
