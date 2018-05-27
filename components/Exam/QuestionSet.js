import React from 'react'
import styled, { keyframes } from 'styled-components'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

class QuestionSet extends React.Component {
  constructor (props) {
    super(props)
    this.handleChoose = this.handleChoose.bind(this)
  }
  handleChoose (event) {
    const questionId = event.target.name
    const answerId = event.target.value
    console.log(questionId, answerId)
    this.props.setAnswer({questionId, answerId})
  }
  render () {
    const {data} = this.props.question
    const {number} = this.props
    const answers = this.props.question.exam_choices
    const questionId = this.props.question.id
    return (
      <div>
        <p>{number}.  <span dangerouslySetInnerHTML={{__html: data}} /></p>
        <form>
          {answers.map((val, key) => {
            return (
              <div className='form-check'>
                <input className='form-check-input' type='radio' name={questionId} value={val.id} id={val.id} onClick={this.handleChoose} />
                <label className='form-check-label' htmlFor={val.id}>
                  {val.data}
                </label>
              </div>
            )
          })}
        </form>
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      exam: state.exam
    }),
    {...ExamActions}
  )
)(QuestionSet)
