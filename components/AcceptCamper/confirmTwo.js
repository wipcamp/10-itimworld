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
                <div className='d-flex justify-content-center'><h3>ยอมแล้ว บอกเหตุผลหน่อย</h3></div>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' />
                  </div>
                  <textarea className='form-control' aria-label='With textarea' />
                </div>
                <DivButton>
                  <a href='index'><button type='button' className='btn'><h3>back</h3></button></a>
                  <a href='end'><button type='button' className='btn'><h3>ok</h3></button></a>
                </DivButton>
              </Box>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}
