import React from 'react'
import styled from 'styled-components'

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

const End = (props) => (
  <BackgroundContainer>
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-sm-10'>
          <div className='bg-light box-shadow my-4 p-3 rounded text-center'>
            <h2>แล้วพบกันใหม่นะ</h2>
            <div className='row justify-content-center my-4'>
              <div className='col-6'>
                <a
                  href='https://wip.camp'
                  className='btn btn-outline-primary btn-block'
                >ไปที่เว็บ WIP Camp</a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BackgroundContainer>
)

export default End
