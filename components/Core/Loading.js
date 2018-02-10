import React from 'react'
import styled, { keyframes } from 'styled-components'

const Spinner = keyframes`
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 1.5s ease-in-out;
  opacity: ${props => props.loading ? 1 : 0};
  visibility: ${props => props.loading ? 'visible' : 'hidden'};
  flex-direction: column;
  display: flex;
  
  & i {
    color: #222;
    font-size: 10em;  
    animation: ${Spinner} 2s linear infinite;
  }
`

export default () => (
  <Loading loading className='justify-content-center align-items-center'>
    <div className='text-center'>
      <i className='fas fa-sync-alt' />
      <h1 className='animated pulse infinite mt-3'>กรุณาคอยสักประเดี๋ยว..</h1>
      <h4 className='animated pulse infinite'>รู้หมือไร่? หน้าเว็บเลือกทีมได้นะ!</h4>
    </div>
  </Loading>
)
