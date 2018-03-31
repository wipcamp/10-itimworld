import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export default class index extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-sm-10 col-lg-6'>
            <div className='box-shadow my-4 p-3 bg-light'>
              <h2 className='text-center'>แน่ใจนะ</h2>
              <hr />
              <div className='row text-center justify-content-center'>
                <div className='col-8'>
                  <Link href='/accept-camper'>
                    <a className='btn btn-outline-primary btn-block pointer'>ย้อนกลับ</a>
                  </Link>
                </div>
                <div className='col-4'>
                  <button
                    onClick={this.props.nextStep}
                    type='button'
                    className='btn btn-outline-danger btn-block pointer'
                  >
                        ยืนยันอีกครั้ง
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
