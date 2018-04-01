import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

import Alert from '../Core/Alert'

import styled, { keyframes } from 'styled-components'

import { StyledTextArea } from '../Core/Input'
import api from '../../utils/api'
import cookie from '../../utils/cookie'

const loadingIcon = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;

  ${props => props.saving && `
    display: flex;
    cursor: progress;
  `}

    & .waitanim {
      width: 80px;
      height: 80px;
      opacity: 1;
      border-top: 8px solid #fff;
      border-bottom: 8px solid #fff;
      border-right: 8px solid rgba(255,255,255,0); 
      border-left: 8px solid rgba(255,255,255,0); 
      border-radius: 50%;
      animation: ${loadingIcon} 1s linear infinite;
    }

    & .waiting {
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.2);
      height: 100%;
      width: 100%;
      z-index: 10;
    }
`

class ConfirmTwo extends React.Component {
  state = {
    reason: '',
    loading: false,
    showAlert: false,
    alertMess: ''
  }

  _onSubmit = (e) => {
    e.preventDefault()
    const { reason } = this.state
    if (!reason) {
      this.setState({
        alertMess: 'กรุณากรอกเหตุผล ของเจ้า',
        showAlert: true
      })
      return
    } else if (reason.trim().length < 5) {
      this.setState({
        alertMess: 'เหตุผลของเจ้าสั้นเกินไป',
        showAlert: true
      })
      return
    } else if (reason.length > 65535) {
      this.setState({
        alertMess: 'เหตุผลของเจ้าไม่ควรเกิน 65,535 อักขระ',
        showAlert: true
      })
      return
    }
    this.setState({
      loading: true
    })
    const userId = this.props.initialValues.user_id
    const { token } = cookie({req: false})
    api.put(`/leave-campers/${userId}`, {
      userId,
	    reason
    }, {Authorization: `Bearer ${token}`})
      .then(res => {
        Router.push('/accept-camper/end')
      })
      .catch(err => {
        this.setState({
          loading: false,
          alertMess: `พบปัญหา: ${err}`,
          showAlert: true
        })
      })
  }

  _updateReason = (e) => {
    this.setState({
      reason: e.target.value
    })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  render () {
    return (
      <div className='container'>
        <Alert error showDialog={this.state.showAlert} message={this.state.alertMess} hideDialog={this.hideAlert} />
        <div className='row d-flex justify-content-center'>
          <div className='col-lg-6 col-sm-10'>
            <div className='box-shadow my-4 p-3 bg-light position-relative rounded'>
              <form
                onSubmit={this._onSubmit}
              >
                <h2 className='text-center'>ขั้นตอนสุดท้าย</h2>
                <hr />
                <div>
                  ขั้นตอนสุดท้าย พวกพี่ยอมรับในการตัดสินใจของน้องแล้ว เพียงแต่พวกพี่อยากทราบเหตุผลของน้อง ๆ ว่า เหตุอันใด เจ้าถึงสละสิทธิ์อันแสนล้ำค่านี้
                  หากเจ้าเขียนเหตุผลเสร็จ นี่คงเป็นคำสุดท้าย ที่พี่อยากจะบอก "ขอให้เจ้าโชคดี..." <br />
                  <div className='my-2 text-center'>
                    <b>"หากเจ้าเปลี่ยนใจ สามารถติดต่อได้ทางแฟนเพจ <a href='https://www.facebook.com/wipcamp'>WIP Camp</a> <br />เพื่อขอสิทธิ์ในการยืนยันเข้าร่วมกองทัพอีกครั้ง"</b> <br />
                  </div>
                </div>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' />
                  </div>
                  <StyledTextArea
                    className='form-control bg-light'
                    placeholder={`เหตุผลของเจ้า...`}
                    value={this.state.reason}
                    onChange={this._updateReason}
                    required
                  />
                </div>
                <div className='row mt-3 text-center justify-content-center'>
                  <div className='col-6'>
                    <Link href={`/accept-camper`}>
                      <a className='btn btn-outline-primary pointer btn-block'>ย้อนกลับ</a>
                    </Link>
                  </div>
                  <div className='col-6'>
                    <button
                      className='btn btn-danger pointer btn-block'
                    >
                      ส่งเหตุผล
                    </button>
                  </div>
                </div>
              </form>
              <Loading saving={this.state.loading}>
                <div className={`waiting `} >
                  <div className='waitanim' />
                </div>
              </Loading>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmTwo
