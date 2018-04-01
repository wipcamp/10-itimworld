import React from 'react'
import Link from 'next/link'
import { StyledTextArea } from '../Core/Input'

class ConfirmTwo extends React.Component {
  state = {
    reason: ''
  }

  _onSubmit = (e) => {
    e.preventDefault()
    // console.log(this.state.reason)
  }

  _updateReason = (e) => {
    this.setState({
      reason: e.target.value
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-lg-6 col-sm-10'>
            <div className='box-shadow my-4 p-3 bg-light'>
              <form
                onSubmit={this._onSubmit}
              >
                <h2 className='text-center'>ขั้นตอนสุดท้าย</h2>
                <hr />
                <div>
                  ขั้นตอนสุดท้าย พวกพี่ยอมรับในการตัดสินใจของน้องแล้ว เพียงแต่พวกพี่อยากทราบเหตุผลของน้อง ๆ ว่า เหตุอันใด เจ้าถึงสละสิทธิ์อันแสนล้ำค่านี้
                  หากเจ้าเขียนเหตุผลเสร็จ นี่คงเป็นคำสุดท้าย ที่พี่อยากจะบอก "ขอให้เจ้าโชคดี..." <br />
                  <div className='my-2 text-center'>
                    <b>"หากเจ้าเปลี่ยนใจ สามารถติดต่อได้ทางแฟนเพจ <a href='https://www.facebook.com/wipcamp'>WIP Camp</a> เพื่อขอคืนค่าการยืนยันสิทธิ์"</b> <br />
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmTwo
