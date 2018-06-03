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
  cursor: pointer;
`
const WaitText = styled.p`
  font-size: 24px;
  margin-top: 100px;
`

const OrderList = styled.ol`
  font-size: 130%;
`

const Highlight = styled.span`
  color: red;
`
class Step1 extends React.Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
  }
  async componentWillMount () {
    socket.on('examStart', data => {
      console.log('socket examStart', data)
      if (data.status === 'start') {
        this.start()
      }
    })
  }
  start () {
    this.props.fetchExam()
  }
  render () {
    const {isAdmin} = this.props.exam
    return (
      <div className='container mb-5'>
        <div className='row justify-content-center'>
          <div className='col-md-10 col-12 bg-white mt-5 rounded p-4'>
            <div className=''>
              <h1 className='text-center'>กฎ และ กติกา ในการสอบ</h1>
              <OrderList>
                <li>การสอบจะมีเวลาทั้งหมด <b>20 นาที</b></li>
                <li>น้อง ๆ จะเริ่มทำข้อสอบได้<u>เมื่อพี่วิชาการให้สัญญานเริ่มสอบ</u></li>
                <li>ในการทดสอบนี้ มี <b>ข้อปรนัย(ข้อตัวเลือก) <Highlight>20 ข้อ</Highlight></b> และ <b>ข้ออัตนัย(ข้อเขียน) <Highlight>1 ข้อ</Highlight></b></li>
                <li>ข้อเขียนจะอยู่ข้อสุดท้าย ให้ทำลงบน<b>กระดาษ</b>ที่พี่ได้แจกให้</li>
                <li>เมื่อทำข้อสอบเสร็จ ให้<Highlight><u>รอจนกว่าเวลาจะหมด</u></Highlight></li>
                <li>หากเวลาหมด แล้วมีข้อที่ไม่ได้ทำจะถือว่า <Highlight><b>ไม่นับคะแนน</b></Highlight></li>
                <li>การโกงเป็นสิ่งที่ห้ามไม่ได้ แต่พี่ ๆ เชื่อว่าน้อง ๆ จะทำด้วยความสามารถของตนเองอย่างเต็มที่</li>
                <li>เมื่อหมดเวลาทำข้อสอบ ให้น้อง ๆ ตอบแบบสอบถามโดยกดปุ่ม <b>ตอบแบบสอบถาม</b> ที่ขึ้นบนหน้าจอ</li>
                <li>ขอให้โชคดีกับการทำข้อสอบ</li>
              </OrderList>
            </div>
            <div className='text-center'>
              {!isAdmin ? <WaitText className='animated pulse infinite'>กรุณารอสักครู่ ...</WaitText>
                : <Button className='btn btn-danger' disabled={!isAdmin} onClick={this.start}>
                Start!
                </Button>
              }
            </div>
          </div>
        </div>
      </div>
      // <div className='d-flex flex-column justify-content-center align-items-center'>
      //   <div className='row'>
      //     <div className='col-12'>
      //     </div>
      //   </div>
      //   <div className='row'>
      //     <div className='col-12'>
      //       {!isAdmin ? <p>กรุณารอสักประเดี๋ยว ...</p>
      //         : <Button disabled={!isAdmin} onClick={this.start}>
      //           Start!
      //         </Button>
      //       }
      //     </div>
      //   </div>
      // </div>
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
