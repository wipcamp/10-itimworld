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
  font-size: 1.5em;
  text-align: center;
  color: #000;

  .box-shadow {
    min-height: 150px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .1),
                0 8px 8px rgba(0, 0, 0, .1), 
                0 16px 16px rgba(0, 0, 0, .1), 
                0 32px 32px rgba(0, 0, 0, .15);
  }
`

const Timeup = (props) => (
  <BackgroundContainer>
    <div className='container'>
      <div className='row d-flex justify-content-center align-items-center flex-column'>
        <div className='col-12 mt-5'>
          <img style={{maxWidth: '300px'}} className='img-fluid' src='/static/img/logo-white.svg' alt='wipcamp-logo' />
        </div>
        <div className='box-shadow col-12 col-md-6 p-3 rounded card'>
          <div>
            <span className='text-danger'>หมดเวลาการยืนยันสิทธิ์</span>ของเจ้าแล้ว <br />
            เห็นทีเราคงไม่ได้พบกันแล้วหล่ะ <br />
            หากเจ้ามีข้อสงสัยสามารถติดต่อได้ที่ <br />
            <a href='https://www.facebook.com/wipcamp' target='_blank'>Facebook WIP Camp</a>
          </div>
          <div className='mt-4 mb-0'><a className='btn btn-primary' href='https://wip.camp'>ย้อนกลับไปหน้าหลัก</a></div>
        </div>
      </div>
    </div>
  </BackgroundContainer>
)

export default Timeup
