import React from 'react'
import styled, { keyframes } from 'styled-components'
import io from 'socket.io-client'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

import env from '../../utils/env'

class Control extends React.Component {
  constructor (props) {
    super(props)
    this.sendStart = this.sendStart.bind(this)
  }
  componentDidMount () {
    this.socket = io.connect(env.SOCKET_URL)
  }
  sendStart () {
    this.socket.emit('examStart')
  }
  render () {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <button onClick={this.sendStart}>เริ่มสอบ</button>
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
)(Control)
