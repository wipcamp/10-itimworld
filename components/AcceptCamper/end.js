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
    padding:40px;
    border:1px solid black;
    width:40vw;
    text-align:center;
`
export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='d-flex justify-content-center'>
              <Box >
                <div><h3>แล้วพบกันใหม่นะ</h3></div>
              </Box>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}
