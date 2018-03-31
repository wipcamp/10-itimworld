import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
    padding:60px;

    .box-shadow {
      box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .1);
    }
  
    .pointer {
      cursor: pointer;
    }
`

export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
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
        </BackgroundContainer>
      )
    }
}
