import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  color: #fff;
  background: linear-gradient(to top,rgba(255, 255, 255, 0),rgb(0, 76, 97));
`

const Background = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  margin-top: -100vh;
  background: url('/static/img/background.png');
  background-size: cover;
  background-position: center;
`

const Logout = () => {
  setTimeout(() => window.location.replace('https://wip.camp'), 4000)
  return (
    <div className='container-fluid'>
      <div className='row'>
        <Container className='col-12 text-center d-flex flex-column justify-content-center align-items-center'>
          <h1 className='animated pulse infinite'>จะไปแล้วหรอ..</h1>
          <h1 className='animated pulse infinite'>อยู่ด้วยกันก่อนได้ไหม?</h1>
          <h6 className='mt-5'>ออกจากระบบสำเร็จ</h6>
        </Container>
        <Background />
      </div>
    </div>
  )
}

export default Logout
