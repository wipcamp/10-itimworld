import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
`

const Box = styled.div`
    background-color : white;
    
`

const ModalContainer = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  ${props => props.isShow ? `
    display: block;
  ` : `
    display: none;
  `}
`

export default class index extends React.Component {
    state = {
      isShow: false
    }

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-10'>
                <Box>
                  <h2>ยืนยันสิทธิ</h2>
                  <form>
                    <input type='radio' name='comeByYourself' value='y' />มาเอง
                    <input type='radio' name='comeByYourself' value='n' />มารับหน่อย
                    <select name='size'>
                      <option value=''>ไซส์เสื้อ</option>
                      <option value='s'>s</option>
                      <option value='m'>m</option>
                      <option value='l'>l</option>
                      <option value='xl'>xl</option>
                    </select>
                    <input type='file' />
                  </form>
                  <button>OK</button>
                  <button>สละสิทธิ</button>
                </Box>
              </div>
            </div>
          </div>
          <ModalContainer isShow={this.state.isShow}>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-10'>
                  <div className='mt-4 card'>
                    <div className='card-body'>
                      <h1 className='text-center'>ยืนยัน</h1>
                      <hr />
                      <div>
                        content
                      </div>
                      <hr />
                      <div className='row'>
                        <div className='col-6'>
                          <button className='btn btn-block'>
                            ยกเลิก
                          </button>
                        </div>
                        <div className='col-6'>
                          <button className='btn btn-success btn-block'>
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalContainer>

          {/* <!-- Button trigger modal --> */}
          <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>
            Launch demo modal
          </button>

          {/* <!-- Modal --> */}
          <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>Modal title</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  ...
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                  <button type='button' className='btn btn-primary'>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}
