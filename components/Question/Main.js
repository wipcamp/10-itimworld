import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'

export const MainQuestion = props => {
  const { question: { questions: allQuestion } } = props
  return (
    <div>
      <h1>Questions</h1>
      { allQuestion.map((question) => (
        <button key={question.id}>{question.data}</button>
      ))}
      <Editor {...props} />
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
