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
                <h2 className='text-center'>ยอมแล้ว บอกเหตุผลหน่อย</h2>
                <hr />
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' />
                  </div>
                  <StyledTextArea
                    className='form-control bg-light'
                    placeholder={`ช่วยใส่เหตุผลให้หน่อย`}
                    value={this.state.reason}
                    onChange={this._updateReason}
                    required
                  />
                </div>
                <div className='row mt-3 text-center justify-content-center'>
                  <div className='col-6'>
                    <Link href={`/accept-camper`}>
                      <a className='btn btn-outline-primary pointer btn-block'>ย้อนกลับไปหน้ายืนยันสิทธิ</a>
                    </Link>
                  </div>
                  <div className='col-6'>
                    <button
                      className='btn btn-outline-danger pointer btn-block'
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
