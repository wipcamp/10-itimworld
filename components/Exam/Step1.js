import React from 'react'
import styled, { keyframes } from 'styled-components'
import socket from './socket'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

const Button = styled.button`
  width: 200px;
  height: 100px;
  font-size: 36px;
`
class Step1 extends React.Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
  }
  async componentWillMount () {
    socket.on('examStart', data => {
      console.log(data)
      if (data.status === 'start') {
        this.start()
      }
    })
  }
  async componentDidMount () {
  }
  start () {
    this.props.fetchExam()
  }
  render () {
    const {isAdmin} = this.props.exam
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='row'>
          <div className='col-12'>
            <h1>เจ้าพร้อมหรือยัง ?</h1>
            <p>1. การสอบจักมีเวลาทั้งหมดยี่สิบนาที</p>
            <p>2. ณ การทดสอบนี้ ออเจ้าจักมี ข้อกากบาท และ ข้อเขียน</p>
            <p>3. อย่าคิดจะโกงแม้เพียงนิด แต่หากเป็นเช่นนั้นเจ้ากำลังดูหมิ่นสติปัญญาของตัวเจ้าเอง</p>
            <p>4. ข้าอวยพรให้เจ้าได้เพียงโชคดี</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            {!isAdmin ? <p>กรุณารอสักประเดี๋ยว ...</p>
              :<Button disabled={!isAdmin} onClick={this.start}>
                Start!
              </Button>
            }
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
)(Step1)
