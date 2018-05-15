import React from 'react'
import styled, { keyframes } from 'styled-components'

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
  start () {
    this.props.fetchExam()
  }
  render () {
    const isTime = true
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='row'>
          <div className='col-12'>
            <h1>เจ้าพร้อมหรือยัง ?</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Button disabled={!isTime} onClick={this.start}>
              Start!
            </Button>
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
