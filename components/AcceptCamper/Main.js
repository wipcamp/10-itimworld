import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { RadioContainer, CheckRadio, Label, StyledSelect, StyledTextArea } from '../Core/Input'

const BackgroundContainer = styled.div`
  background-image: url("../../static/img/background.png");
  min-height : 100vh;
  width : 100%;
  background-size : cover;
  background-position : center;

  .box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .1);
  }

  .pointer {
    cursor: pointer;
  }
`

const ModalContainer = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  z-index: 10;
  .card {
    opacity: 0;
    transition: all .3s;
  }
  ${props => props.isShow ? `
    display: block;
    
    .card {
      opacity: 1;
    }
  ` : `
    display: none;
  `}
`

const BlockValidate = styled.div.attrs({
  className: 'p-2 rounded my-1'
})`
  transition: all .3s;
  ${props => props.valid === 1 && `
    background: #008DC4;
  
  `}
  input {
    color: black;
  }
  ${props => props.valid === -1 && `
    background: #E3454B;
    color: white;

    input {
      color: white;
    }
  `}

  
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
                ตรวจสอบข้อมูลดี ๆ นะ
              </div>
              <hr />
              <div className='row'>
                <div className='col-6'>
                  <button
                    className='btn btn-block pointer'
                    onClick={props.toggle}
                  >
                    ยกเลิก
                  </button>
                </div>
                <div className='col-6'>
                  <button
                    onClick={props.post}
                    className='btn btn-success btn-block pointer'
                  >
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
                    className='btn btn-block pointer'
                    onClick={props.toggle}
                  >
                    ยกเลิก
                  </button>
                </div>
                <div className='col-6'>
                  <button
                    className='btn btn-warning btn-block pointer' onClick={() => Router.push('/accept-camper/confirm')}
                  >
                    ยืนยันการสละสิทธิ์
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
      comeByYourself: '',
      file: null,
      shirtSize: '',
      place: '',
      valid: {
        comeByYourself: 0,
        file: 0,
        shirtSize: 0
      },
      isShow: false,
      isShow2: false

    }

    _setField = (key, value) => {
      this.setState({
        [key]: value
      })
    }

    _changeFile = (e) => {
      const { valid } = this.state
      const file = e.target.files[0]
      if (!file || file.size > 2097152) {
        valid.file = -1
        alert('ขนาดไฟล์เกิน 2 MB')
      } else if ('image/png, image/jpeg, application/pdf'.split(', ').indexOf(file.type) < 0) {
        valid.file = -1
        alert('อนุญาตเฉพาะนามสกุล .png .jpeg .pdf')
      } else {
        valid.file = 0
      }
      this.setState({
        file,
        valid
      })
    }

    _onSubmit = (e) => {
      e.preventDefault()
      const { file } = this.state
      if (!file || file.size > 2097152) {
        alert('ขนาดไฟล์เกิน 2 MB')
      } else {
        this.toggle()
      }
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

    post = () => {
      const { comeByYourself, file, shirtSize, place } = this.state
      // console.log(comeByYourself, file, shirtSize, place)
    }

    render () {
      const shirtSize = [
        {
          val: 's',
          text: 'S รอบอก 34 นิ้ว, ความยาว 26 นิ้ว'
        },
        {
          val: 'm',
          text: 'M รอบอก 36 นิ้ว, ความยาว 26.5 นิ้ว'
        },
        {
          val: 'f',
          text: 'F รอบอก 38 นิ้ว, ความยาว 27 นิ้ว'
        },
        {
          val: 'l',
          text: 'L รอบอก 40 นิ้ว, ความยาว 28 นิ้ว'
        },
        {
          val: 'xl',
          text: 'XL รอบอก 42 นิ้ว, ความยาว 29 นิ้ว'
        },
        {
          val: '2xl',
          text: '2XL รอบอก 44 นิ้ว, ความยาว 30 นิ้ว'
        },
        {
          val: '3xl',
          text: '3XL รอบอก 48 นิ้ว, ความยาว 31 นิ้ว'
        }
      ]
      const { valid } = this.state
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-12 col-md-8'>
                <div className='box-shadow bg-light rounded my-4 p-3'>
                  <div>
                    <h1 className='text-center'>ยืนยันสิทธิ์</h1>
                    <hr />
                    <form
                      method={`POST`}
                      onSubmit={this._onSubmit}
                    >
                      <BlockValidate
                        valid={valid.comeByYourself}
                      >
                        <Label>น้องสะดวกเดินทางมามหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรีอย่างไร</Label>
                        <div className='form-check'>
                          <RadioContainer>
                            <input
                              id='comeBy-y-input'
                              type='radio'
                              name='comeByYourself'
                              value='y'
                              onChange={(e) => this._setField('comeByYourself', e.target.value)}
                              required
                            />
                            <CheckRadio top={`7px`} />
                            <label
                              className='form-check-label lead pl-5'
                              htmlFor='comeBy-y-input'
                            >
                              เดินทางมาเอง
                            </label>
                          </RadioContainer>
                        </div>
                        <div className='form-check'>
                          <RadioContainer>
                            <input
                              id='comeBy-n-input'
                              type='radio'
                              name='comeByYourself'
                              value='n'
                              onChange={(e) => this._setField('comeByYourself', e.target.value)}
                            />
                            <CheckRadio top={`7px`} />
                            <label
                              className='form-check-label lead pl-5'
                              htmlFor='comeBy-n-input'
                            >
                              ให้พี่ยักษ์ และลิงไปรับที่จุดต่าง ๆ
                            </label>
                          </RadioContainer>
                        </div>
                        <div className='form-group'>
                          <StyledSelect
                            name='where'
                            className={`form-control p-1`}
                            required
                            disabled={this.state.comeByYourself !== 'n'}
                            onChange={(e) => this._setField('shirtSize', e.target.value)}
                          >
                            <option value=''>โปรดเลือกสถานที่ ที่จะให้ไปรับ</option>
                            <option value='หัวลำโพง'>หัวลำโพง</option>
                            <option value='หมอชิต'>หมอชิต</option>
                            <option value='อนุเสาวรีย์ชัยสมรภูมิ'>อนุเสาวรีย์ชัยสมรภูมิ</option>
                            <option value='สายใต้ใหม่'>สายใต้ใหม่</option>
                          </StyledSelect>
                        </div>
                      </BlockValidate>
                      <BlockValidate
                        valid={valid.shirtSize}
                      >
                        <Label>เลือกไซส์เสื้อที่เจ้าต้องการ</Label>
                        <div className='form-group'>
                          <StyledSelect
                            name='sizeShirt'
                            className={`form-control p-1`}
                            required
                            // onChange={(e) => this._setField('shirtSize', e.target.value)}
                          >
                            <option value=''>โปรดเลือกไซส์เสื้อ</option>
                            {
                              shirtSize.map((data, i) => (
                                <option key={i} value={data.val}>{data.text}</option>
                              ))
                            }
                          </StyledSelect>
                        </div>
                      </BlockValidate>
                      <BlockValidate
                        valid={valid.file}
                      >
                        <Label>อัพโหลดสลิปจ่ายเงิน</Label>
                        <div className='form-group'>
                          <input
                            className=''
                            type='file'
                            required
                            onChange={this._changeFile}
                            accept='image/png, image/jpeg, application/pdf'
                          />
                        </div>
                        <small>รับเฉพาะไฟล์ .png, .jpeg, .pdf ขนาดไม่เกิน 2MB</small>
                      </BlockValidate>
                      
                      <hr />
                      <div className='row mt-3'>
                        <div className='col-8 text-center'>
                          <button
                            type='submit'
                            className='btn btn-outline-primary btn-block pointer'
                          >OK</button>
                        </div>
                        <div className='col-4 pointer text-center'>
                          <button
                            type='button'
                            className='btn btn-outline-danger btn-block pointer'
                            onClick={this.toggle2}
                          >สละสิทธิ</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal Show={this.state.isShow} toggle={this.toggle} {...this.state} post={this.post} />
          <Modal2 Show2={this.state.isShow2} toggle={this.toggle2} {...this.state} />
        </BackgroundContainer>
      )
    }
}
