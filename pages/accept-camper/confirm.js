import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
    padding:30px;
`
const Box = styled.div`
    background-color:white;
    border-radius:5px;
    padding:20px;
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
                <button type='button' className='btn col-3'>back</button>
                <button type='button' className='btn col-3'>ok</button>
              </DivButton>
            </Box>
          </div>
        </BackgroundContainer>
      )
    }
}
