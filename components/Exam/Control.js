import React from 'react'
import styled, { keyframes } from 'styled-components'
import socket from './socket'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

const ContainerControl = styled.div`
  min-height: calc(100vh - 57px);
  font-size: 130%;

  button {
    cursor: pointer;
  }
`

const List = styled.div`
  background: white;
  height: 700px;
  
  ul {
    list-style: none;
    padding: 0;
    max-height: 100%;
    overflow-y: scroll;

    li {
      
      border-bottom: 1px solid #eee;
      padding: 5px 0;
    }
  }
`

const Timer = styled.div`
  font-size: 200px;
  text-align: center;
`

class Control extends React.Component {
  state = {
    status: 'ยังไม่เริ่ม',
    users: [],
    time: 0
  }

  loadUser = () => {
    console.log('loadUser')
    socket.emit('getUser')
  }

  async componentWillMount () {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('setUser', users => {
      console.log('user ')
      this.setState({ users })
    })
    socket.on('getTime', (data) => {
      this.setState({time: data})
    })
  }

  sendStart = () => {
    let d = new Date()
    socket.emit('examStart', d.getTime())
    this.setState({
      status: 'เริ่มแล้ว!'
    })
  }
  render () {
    return (
      <ContainerControl className='container-fluid text-dark'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='bg-white rounded p-3 text-dark mt-4 text-center'>
              <span className='h2'>
                รายชื่อน้องที่ส่ง ({this.state.users.length})&nbsp;
                <button className='btn btn-info' onClick={this.loadUser} >
                  <i className='fas fa-sync-alt' />
                </button>
              </span>
            </div>
            <List className='bg-white rounded p-3 text-dark mt-4'>
              <ul>
                {
                  this.state.users.map((d, i) => (
                    <li key={i}>
                      {d}
                    </li>
                  ))
                }
              </ul>
            </List>
          </div>
          <div className='col-md-8 mt-4'>
            <div className='card'>
              <div className='card-body'>
                <button className='btn btn-primary btn-lg btn-block' onClick={this.sendStart}>เริ่มสอบ</button>
                <div className='mt-2'>
                  สถานะ: {this.state.status}
                </div>
                <Timer className='h1' onClick={() => console.log('click')}>
                  20:00<br />
                  {this.state.time}
                </Timer>
              </div>
            </div>
          </div>
        </div>
      </ContainerControl>
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
