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
`
const DivButton = styled.div`
    margin-top:5px;
    display:flex;
    justify-content:space-around;
`
export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row d-flex justify-content-center'>
              <Box className='col-6'>
                <div className='d-flex justify-content-center'><h3>ตกลงแล้วนะ</h3></div>
                <div className='d-flex justify-content-center'><h5>หมายเหตุ หากสลิปมีปัญหาจะมีการติดต่อไปภายหลัง</h5></div>
                <DivButton>
                  <button type='button' className='btn'><h3>เข้ากลุ่มดิ๊</h3></button>
                </DivButton>
              </Box>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}
