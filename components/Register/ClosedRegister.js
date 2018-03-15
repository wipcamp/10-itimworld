import React from 'react'
import styled from 'styled-components'

const CenterContainer = styled.div`
  min-height: 100vh;
  background-image: url('/static/img/bg.png');
  background-size: cover;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  text-align: center;
  background-position: center;
  @media (min-width: 576px) {
    font-size: 2.5em;
  }
`

const ImgLogo = styled.img`
  width: 280px;
  display: flex;
  margin: 0 auto 20px;
  @media (min-width: 576px) {
    width: 500px;
  }
`

const ClosedRegister = (props) => (
  <CenterContainer>
    <div>
      <ImgLogo src='/static/img/logo.svg' alt='wipcamp-logo' />
      <p>
        หมดเวลารับสมัครแล้ว<br />ขอขอบใจออเจ้าทั้งหลายที่ให้ความสนใจ<br />แล้วพนกันใหม่ศกหน้า
      </p>
    </div>
  </CenterContainer>
)

export default ClosedRegister
