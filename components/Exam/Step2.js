import React from 'react'
import styled, { keyframes } from 'styled-components'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

import QuestionSet from './QuestionSet'
import swal from 'sweetalert2'

const Button = styled.button`
  width: 200px;
  height: 100px;
  font-size: 36px;
`

const swalMixin = swal.mixin({
  confirmButtonClass: 'btn btn-primary mr-2',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false
})

class Step2 extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTimeUp = this.handleTimeUp.bind(this)
  }

  handleSubmit () {
    if (this.checkIsAllAnswered()) {
      swalMixin({
        title: 'ยืนยันส่งข้อสอบ',
        text: 'แน่ใจนะว่าตรวจทานดีแล้ว ?',
        showCancelButton: true,
        confirmButtonText: 'ส่งคำตอบ',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.sendAnswer()
        }
      })
    } else {
      swalMixin({
        title: 'ผิดพลาด',
        text: 'ยังตอบไม่ครบ',
        confirmButtonText: 'ตกลง'
      })
    }
  }

  handleTimeUp () {
    // if (this.checkIsAllAnswered()) {
    //   swalMixin({
    //     title: 'ยืนยันส่งข้อสอบ',
    //     text: 'แน่ใจนะว่าตรวจทานดีแล้ว ?',
    //     showCancelButton: true,
    //     confirmButtonText: 'ส่งคำตอบ',
    //     cancelButtonText: 'ยกเลิก'
    //   }).then((result) => {
    //     if (result.value) {
    //       this.sendAnswer()
    //     }
    //   })
    this.sendAnswer()
  }

  checkIsAllAnswered () {
    const questionIds = []
    const unAnswered = []
    let isAllAnswered = true
    console.log(this.props.exam.exam)
    this.props.exam.exam.forEach(element => {
      questionIds.push(element.id)
    })
    console.log(questionIds)
    questionIds.forEach(element => {
      if (!this.props.exam['question' + element]) {
        unAnswered.push(element)
        isAllAnswered = false
      }
    })
    console.log('unAns', unAnswered)
    return isAllAnswered
  }

  sendAnswer () {
    const userId = JSON.parse(window.localStorage.getItem('user')).id
    const answers = []
    const questionIds = []
    this.props.exam.exam.forEach(element => {
      questionIds.push(element.id)
    })
    questionIds.forEach(element => {
      answers.push({
        user_id: userId,
        question_id: element,
        choice_id: this.props.exam['question' + element] || '0'
      })
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
                return <div><QuestionSet question={val} number={key + 1} /><hr /></div>
              })}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='container'>
              <button onClick={this.handleSubmit}>Submit</button>
              <button onClick={this.handleTimeUp}>Timeup</button>
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
