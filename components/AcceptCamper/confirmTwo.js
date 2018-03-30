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
    font-size:1.2em;
 `
export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row d-flex justify-content-center'>
              <Box className='col-lg-6 col-sm-10'>
                <div className='d-flex justify-content-center'><label>ยอมแล้ว บอกเหตุผลหน่อย</label></div>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' />
                  </div>
                  <textarea className='form-control' aria-label='With textarea' />
                </div>
                <div className='row mt-3 text-center justify-content-center'>
                  <div className='col-6'>
                    <a href='index'><button type='button' className='btn btn-outline-primary'>back</button></a>
                  </div>
                  <div className='col-6'>
                    <a href='end'><button type='button' className='btn btn-outline-danger'>ok</button></a>
                  </div>
                </div>

              </Box>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}
