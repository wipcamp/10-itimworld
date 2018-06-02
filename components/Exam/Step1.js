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
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-10 col-12 bg-white mt-5 rounded p-4'>
            <div className=''>
              <h1 className='text-center'>เจ้าพร้อมหรือยัง ?</h1>
              <OrderList>
                <li>การสอบจักมีเวลาทั้งหมดยี่สิบนาที</li>
                <li>ณ การทดสอบนี้ ออเจ้าจักมี ข้อกากบาท และ ข้อเขียน</li>
                <li>อย่าคิดจะโกงแม้เพียงนิด แต่หากเป็นเช่นนั้นเจ้ากำลังดูหมิ่นสติปัญญาของตัวเจ้าเอง</li>
                <li>ข้าอวยพรให้เจ้าได้เพียงโชคดี</li>
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
