import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
    padding:60px;
`
const Box = styled.div`
    background-color:white;
    border-radius:5px;
    padding:20px;
    border:1px solid black;
`
const DivButton = styled.div`
    display:flex;
    justify-content:space-around;
`
export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <Box>
              <div className='d-flex justify-content-center'>แน่ใจนะ</div>
              <DivButton>
                <a href='index'><button type='button' className='btn'>back</button></a>
                <a href='end'><button type='button' className='btn'>ok</button></a>
              </DivButton>
            </Box>
          </div>
        </BackgroundContainer>
      )
    }
}
