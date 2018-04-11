import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
  background-image: url('/static/img/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  font-size: 2.5em;
  text-align: center;
  color: #000;

  .col-12 {
    box-shadow: 0 4px 4px rgba(0, 0, 0, .1),
                0 8px 8px rgba(0, 0, 0, .1), 
                0 16px 16px rgba(0, 0, 0, .1), 
                0 32px 32px rgba(0, 0, 0, .15);
  }
`

const Timeup = (props) => (
  <BackgroundContainer>
    <div className='container'>
      <div className='row'>
        <div className='col-12 mt-5 p-3 rounded' style={{backgroundColor: 'rgba(255,255,255,0.4)'}}>
          <img className='img-fluid' src='/static/img/logo-white.svg' alt='wipcamp-logo' />
          <div>
            หมดเวลาการยืนยันสิทธิ์ของเจ้าแล้ว เห็นทีเราคงไม่ได้พบกันแล้วหล่ะ<br />
            หากเจ้ามีข้อสงสัยสามารถติดต่อได้ที่แฟนเพจ <a href='https://www.facebook.com/wipcamp' target='_blank'>WIP Camp</a>
          </div>
        </div>
      </div>
    </div>
  </BackgroundContainer>
)

export default Timeup
