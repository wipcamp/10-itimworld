import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'

const BackgroundContainer = styled.div`
  background-image: url("../../static/img/background.png");
  min-height : 100vh;
  width : 100%;
  background-size : cover;
  background-position : center;
`

const Box = styled.div`
  background-color : white;
  padding : 2em;
  border-radius : 10px;
  margin-top : 5em;
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

const Where = styled.div`
  min-height: 35px;
  margin-top : 0.8em;
`

const Modal = (props) => (
  <ModalContainer isShow={props.Show}>
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
                  <button
                    className='btn btn-block'
                    onClick={props.toggle}
                  >
                    ยกเลิก
                  </button>
                </div>
                <div className='col-6'>
                  <button className='btn btn-success btn-block' onClick={() => Router.push('/accept-camper/finish')}>
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
)

const Modal2 = (props) => (
  <ModalContainer isShow={props.Show2}>
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-10'>
          <div className='mt-4 card'>
            <div className='card-body'>
              <h1 className='text-center'>แน่ใจป่าว</h1>
              <hr />
              <div>
                แน่ใจแล้วหรอ คิดดีๆน๊าาาา
              </div>
              <hr />
              <div className='row'>
                <div className='col-6'>
                  <button
                    className='btn btn-block'
                    onClick={props.toggle}
                  >
                    ยกเลิก
                  </button>
                </div>
                <div className='col-6'>
                  <button className='btn btn-success btn-block' onClick={() => Router.push('/accept-camper/confirm')}>
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
)

export default class index extends React.Component {
    state = {
      isShow: false,
      isShow2: false,
      comeByYourself: ''
    }

    toggle = () => {
      let isShow = this.state.isShow
      this.setState({
        isShow: !isShow
      })
    }

    toggle2 = () => {
      let isShow = this.state.isShow2
      this.setState({
        isShow2: !isShow
      })
    }

    selectComeByYourself = (value) => {
      this.setState({
        comeByYourself: value
      })
    }

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-10'>
                <Box className=''>
                  <div>
                    <h1>ยืนยันสิทธิ</h1>
                    <form>
                      <div className='col-12 form-check'>
                        <input
                          id='comeBy-y-input'
                          type='radio'
                          name='comeByYourself'
                          value='y'
                          onChange={() => this.selectComeByYourself('y')}
                        />
                        <label className='form-check-label lead' htmlFor='comeBy-y-input'>มาเอง</label>
                      </div>
                      <div className='col-12 form-check'>
                        <input
                          id='comeBy-y-input2'
                          type='radio'
                          name='comeByYourself'
                          value='n'
                          onChange={() => this.selectComeByYourself('n')}
                        />
                        <label className='form-check-label lead' htmlFor='comeBy-y-input2'>มารับหน่อย</label>
                      </div>
                      <Where>
                        {
                          this.state.comeByYourself === 'n' && (
                            <select name='where'>
                              <option value=''>ที่ไหนดี</option>
                              <option value=''>1</option>
                              <option value=''>2</option>
                            </select>
                          )
                        }
                      </Where>
                      <div className='my-2'>
                        <select name='size'>
                          <option value=''>ไซส์เสื้อ</option>
                          <option value='s'>s</option>
                          <option value='m'>m</option>
                          <option value='f'>f</option>
                          <option value='l'>l</option>
                          <option value='xl'>xl</option>
                          <option value='2xl'>2xl</option>
                          <option value='3xl'>3xl</option>
                        </select> <br />
                      </div>
                      <input className='my-2' type='file' />
                    </form>
                    <div className='row mt-3'>
                      <div className='col-6 text-center'>
                        <button className='btn btn-outline-primary btn-lg' onClick={this.toggle}>OK</button>
                      </div>
                      <div className='col-6 text-center'>
                        <button className='btn btn-outline-danger' onClick={this.toggle2}>สละสิทธิ</button>
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>
          <Modal Show={this.state.isShow} toggle={this.toggle} {...this.state} />
          <Modal2 Show2={this.state.isShow2} toggle={this.toggle2} {...this.state} />
        </BackgroundContainer>
        // <div>
        // </div>
      )
    }
}
