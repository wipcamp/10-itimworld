import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import checkUser from './checkUser'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
     
    .box-shadow {
      box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .1);
    }
  
    .pointer {
      cursor: pointer;
    }
`

const End = (props) => (
  <BackgroundContainer>
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-12'>
          <div className='bg-light box-shadow my-4 p-3 rounded text-center'>
            <h2>แล้วพบกันใหม่นะ</h2>
            <div className='my-4'>
              <a
                href='https://wip.camp'
                className='btn btn-outline-primary btn-block'
              >ไปที่เว็บ WIP Camp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BackgroundContainer>
)

export default compose(
  checkUser('/accept-camper/end')
)(End)
