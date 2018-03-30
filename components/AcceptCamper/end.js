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
    background-color : white;
    padding : 2em;
    border-radius : 10px;
    margin-top : 5em;
    font-size:1.05em;
`
export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row d-flex justify-content-center'>
              <Box className='col-6 d-flex justify-content-center'>
                <div><h3>แล้วพบกันใหม่นะ</h3></div>
              </Box>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}
