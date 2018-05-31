import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  background-color: brown;
  background-image: url('../../static/img/bg.png');
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  height: 100%;
  min-height: 100vh;
  color: white;
`

export default (props) => {
  return (
    <Container {...props}>
      {props.children}
    </Container>
  )
}
