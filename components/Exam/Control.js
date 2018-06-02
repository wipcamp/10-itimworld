import React from 'react'
import styled, { keyframes } from 'styled-components'
import io from 'socket.io-client'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

import env from '../../utils/env'

const AdminSection = styled.div`
  background-color: #449122;
  padding: 10px 0 10px 0;
`

class Control extends React.Component {
  constructor (props) {
    super(props)
    this.sendStart = this.sendStart.bind(this)
    this.state = {
      status: 'ยังไม่เริ่ม'
    }
  }
  componentDidMount () {
    this.socket = io.connect(env.SOCKET_URL)
  }
  sendStart () {
    this.socket.emit('examStart')
    this.setState({
      status: 'เริ่มแล้ว!'
    })
  }
  render () {
    return (
      <AdminSection className='d-flex flex-column justify-content-center align-items-center'>
        <button onClick={this.sendStart}>
          เริ่มสอบ
        </button>
        <p className='h4 mt-2'>
          สถานะ: {this.state.status}
        </p>
      </AdminSection>
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
)(Control)
