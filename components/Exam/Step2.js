import React from 'react'
import styled, { keyframes } from 'styled-components'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

import QuestionSet from './QuestionSet'

const Button = styled.button`
  width: 200px;
  height: 100px;
  font-size: 36px;
`
class Step2 extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    const answers = []
    const questionIds = []
    this.props.exam.exam.forEach(element => {
      questionIds.push(element.question_id)
    })
    questionIds.forEach(element => {
      answers.push({exam_question_id: element, answer_id: this.props.exam['question' + element]})
    })
    this.props.submitExam(answers)
  }

  render () {
    const {exam} = this.props.exam
    console.log(exam)
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <h1>เริ่มได้</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='container'>
              {exam.map((val, key) => {
                return <div><QuestionSet question={val} /><hr /></div>
              })}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='container'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
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
)(Step2)
