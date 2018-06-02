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

const OrderList = styled.ol`
  font-size: 130%;
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
                <li>การสอบจักมีเวลาทั้งหมด 20 นาที</li>
                <li>ออเจ้าจักเริ่มทำข้อสอบได้เมื่อพี่วิปโป้ให้สัญญานเริ่มสอบ</li>
                <li>ณ การทดสอบนี้ ออเจ้าจักมี ข้อกากบาท และ ข้อเขียน</li>
                <li>ข้อเขียนจักอยู่ด้านล่างสุด ให้ออเจ้าเขียนคำตอบลงบนกระดาษที่วางอยู่ตรงหน้าออเจ้า</li>
                <li>เมื่อทำข้อสอบเสร็จแล้ว ให้ออเจ้ารอจนกว่าเวลาจักหยุดเดิน</li>
                <li>หากเวลาได้หยุดเดินก่อนที่ออเจ้าจักทำเสร็จ ข้อที่ออเจ้าไม่ได้ตอบ จัก ไม่นับคะแนน</li>
                <li>อย่าคิดจะโกงแม้เพียงนิด แต่หากเป็นเช่นนั้นออเจ้ากำลังดูหมิ่นสติปัญญาของตัวออเจ้าเอง</li>
                <li>ข้าอวยพรให้ออเจ้าได้เพียงโชคดี</li>
              </OrderList>
            </div>
            <div className='text-center'>
              {!isAdmin ? <p>กรุณารอสักประเดี๋ยว ...</p>
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
