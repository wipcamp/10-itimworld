import React from 'react'
import styled, { keyframes } from 'styled-components'
import socket from './socket'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

class Step3 extends React.Component {

  async componentWillMount () {
    const user = await JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      socket.emit('finish', user.id)
    }
  }

  checkCorrectAnswer () {
    let {exam, answers} = this.props.exam
    let totalScore = 0
    let score = 0
    let answered = 0
    let correct = 0
    let totalQuestion = 0
    exam.forEach(ele1 => {
      totalScore += ele1.score
      totalQuestion++
      let correctAnsId = ele1.exam_choices.find(ele2 => ele2.is_corrected === 1).id
      let isCorrect = answers.find(ans => ans.choice_id - 0 === correctAnsId)
      let isAnswered = answers.find(ans => ans.question_id === ele1.id && ans.choice_id !== '0')
      if (isCorrect) {
        score += ele1.score
        correct++
      }
      if (isAnswered) {
        answered++
      }
    })

    const result = { totalScore, score, correct, answered, totalQuestion }
    console.log(result)
    window.localStorage.removeItem('user')
    return result
  }

  componentWillUnmount () {
    if (window) {
      window.localStorage.removeItem('user')
    }
  }

  render () {
    const result = this.checkCorrectAnswer()
    return (
      // <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-8 bg-white rounded mt-5 p-4'>
            <h1 className='text-center'>หมดเวลาสอบ</h1>
            <hr />
            <h3>คะแนนที่ได้ {result.score} / {result.totalQuestion - 1} คะแนน</h3>
            <h3>มีข้อที่ไม่ได้ตอบ {result.totalQuestion - 1 - result.answered} ข้อ</h3>
            <h4 className='text-center mt-4'>" น้องทำได้ดีมาก ๆ สู้ต่อไป! จงอย่าละทิ้งความฝันและความพยายามนะครับ"</h4>
          </div>
          <div className='col-12 col-md-8 bg-white rounded mt-5 p-4 text-center'>
            <a href='https://goo.gl/forms/JfhICkBtLUwbpNH62' target='_blank'><button className='btn btn-success btn-lg'>ตอบแบบสอบถาม</button></a>
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
)(Step3)
