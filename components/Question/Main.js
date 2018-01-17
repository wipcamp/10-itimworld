import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'

export const MainQuestion = props => {
  const { question } = props
  return (
    <div>
      <h1>Questions</h1>
      {question.questions.map((question)=>(
        <button key={question.id}>{question.data}</button>
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
  )
)(MainQuestion)
