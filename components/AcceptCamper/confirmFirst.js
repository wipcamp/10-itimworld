import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export default class index extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-8'>
            <div className='box-shadow my-4 p-3 bg-light rounded'>
              <h2 className='text-center'>ยืนยันอีกครั้ง</h2>
              <hr />
              <div className='text-center'>
                เจ้าแน่ใจแล้วจริง ๆ นะ... <br />
                ข้าขอร้องให้เจ้า พิจารณา และ ไตร่ตรองอีกครั้ง <br />
                <b>หากเปลี่ยนใจ จงกด <span className='text-danger'>"ย้อนกลับ"</span> เถิด</b> <br />
                <b>หากแน่ใจที่จะสละแล้ว จงกด <span className='text-danger'>"ลาก่อน"</span> ...</b>
                <div className='row my-3'>
                  <div className='col-6 d-flex align-items-end'>
                    <img className='img-responsive col' src='/static/img/mongkeycry.png' />
                  </div>
                  <div className='col-6 d-flex align-items-end'>
                    <img className='img-responsive col' src='/static/img/giantcry.png' />
                  </div>
                </div>
              </div>
              <div className='row text-center justify-content-center'>
                <div className='col-12 col-md-8 mb-3'>
                  <Link href='/accept-camper'>
                    <a className='btn btn-outline-primary btn-block pointer'>ย้อนกลับ</a>
                  </Link>
                </div>
                <div className='col-12 col-md-4 mb-3'>
                  <button
                    onClick={this.props.nextStep}
                    type='button'
                    className='btn btn-danger btn-block pointer'
                  >
                        ลาก่อน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
