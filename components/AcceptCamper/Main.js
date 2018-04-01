/* global FormData */
import React from 'react'
import styled, { keyframes } from 'styled-components'
import Router from 'next/router'
import { compose } from 'recompose'

import { RadioContainer, CheckRadio, Label, StyledSelect } from '../Core/Input'
import api from '../../utils/api'
import cookie from '../../utils/cookie'
import checkUser from './checkUser'

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

const loadingIcon = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

const Loading = styled.div`
position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: none;
    justify-content: center;
    align-items: center;

    ${props => props.saving && `
      display: flex;
      cursor: progress;
    `}

    & .waitanim {
      width: 80px;
      height: 80px;
      opacity: 1;
      border-top: 8px solid #fff;
      border-bottom: 8px solid #fff;
      border-right: 8px solid rgba(255,255,255,0); 
      border-left: 8px solid rgba(255,255,255,0); 
      border-radius: 50%;
      animation: ${loadingIcon} 1s linear infinite;
    }

    & .waiting {
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.2);
      height: 100%;
      width: 100%;
      z-index: 10;
    }
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
        <div className='col-12 col-md-8'>
          <div className='mt-4 card'>
            <div className='card-body'>
              <h1 className='text-center'>ยืนยันสิทธิ์</h1>
              <hr />
              <div>
                กรุณาตรวจสอบให้แน่ใจก่อนว่า
                <ul>
                  <li className='text-danger'><b>หลักฐานการโอนเงิน</b> ชัดเจน ไม่เบลอ มีข้อมูลสำคัญครบถ้วน เช่น ชื่อบัญชี, จำนวนเงิน</li>
                  <li><b>ไซต์เสื้อ</b> ที่ใส่ ถูกต้องตามขนาดกายหยาบของเจ้านะน้องเอ๋ย</li>
                  <li><b>หากบ้านอยู่ไกล และต้องการให้พวกข้าไปรับ</b> จงตรวจทานสถานที่ให้ดี</li>
                </ul>
                หากเจ้ามั่นใจว่า ถูกต้อง ครบถ้วน แล้ว จงกดยืนยันเพื่อรายงานตัวของเจ้า !
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
            <Loading saving={props.loading}>
              <div className={`waiting `} >
                <div className='waitanim' />
              </div>
            </Loading>
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
        <div className='col-12 col-md-8'>
          <div className='mt-4 card'>
            <div className='card-body'>
              <h1 className='text-center'>คำเตือน</h1>
              <hr />
              <div>
                <blockquote className='blockquote' style={{fontSize: '1.2em'}}>
                  หากเจ้ายืนยันที่จะสละสิทธิ์ พวกพี่ ๆ จะเสียใจเป็นอย่างมาก <br />
                  แต่พวกพี่ ๆ ยอมรับในการตัดสินใจของน้อง ๆ เสมอ <br />
                  เพลานี้เป็นเวลาที่จักให้น้องคิดให้ดี ๆ ถี่ถ้วน
                  หากเปลี่ยนใจ ให้กด <b>"ยกเลิก"</b> เถิด <br />
                  <b className='text-danger'>เพราะถ้าหากน้องยืนยันที่จะสละสิทธิ์แล้ว น้องไม่สามารถกลับมายืนยันได้อีก</b> <br />
                  หากน้องคิดดีแล้ว จงกดปุ่ม "ยืนยันการสละสิทธิ์" เสีย
                  <footer className='blockquote-footer'>พี่วานร และ ยักษา</footer>
                </blockquote>
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
                    className='btn btn-danger btn-block pointer' onClick={() => Router.push('/accept-camper/confirm')}
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

class index extends React.Component {
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
      isShow2: false,
      loading: false
    }

    _setField = (key, value) => {
      this.setState({
        [key]: value
      })
    }

    _changeFile = (e) => {
      const { valid } = this.state
      const file = e.target.files[0]
      if (!file ) {
        valid.file = -1
        alert('ไม่พบไฟล์')
      } else if (file.size > 2097152) {
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
      if (!file) {
        alert('ไม่พบไฟล์')
      } else if (file.size > 2097152) {
        alert('ขนาดไฟล์เกิน 2 MB')
      } else if ('image/png, image/jpeg, application/pdf'.split(', ').indexOf(file.type) < 0) {
        alert('อนุญาตเฉพาะนามสกุล .png .jpeg .pdf')
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

    post = async () => {
      const { comeByYourself, file, shirtSize, place } = this.state
      this.setState({
        loading: true
      })
      const { token } = cookie({req: false})
      const body = new FormData()
      body.append('comeByYourself', comeByYourself)
      body.append('place', place || 'no')
      body.append('shirtSize', shirtSize)
      body.append('file', file)
      body.append('userId', this.props.initialValues.user_id)
      body.append('fileType', 'bank_payment_slip')

      api.post(`/confirm-campers`, body, {Authorization: `Bearer ${token}`})
        .then(res => {
          this.setState({
            loading: false
          })
          Router.push('/accept-camper/finish')
        })
        .catch(err => {
          this.setState({
            loading: false
          })
          alert(`พบปัญหา: ${err}`)
        })
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
                            onChange={(e) => this._setField('shirtSize', e.target.value)}
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
                        <Label>อัพโหลดสลิปจ่ายเงิน</Label> <br />
                        <div className='mx-auto my-0 text-center'>
                          <b className='text-danger'>* ต้องแสดงหลักฐานการโอนเงิน จำนวน 450 บาท ไปที่บัญชี *</b>
                        </div>
                        <div className='card mb-3 text-center text-dark'>
                          <div style={{fontSize: '1em'}} className='card-body'>
                            <img style={{width: '25%'}} src='/static/img/scb.jpg' alt='scb' /> <br />
                            <b>ธนาคารไทยพาณิชย์</b> <br /> เลขที่บัญชี <b>237-222168-5</b> <br />
                            <b>ชื่อบัญชี นาย ฉันทวัฒน์ ประดิษฐ <br /> และ/หรือ นางสาว ณัฏฐณัฐ วิเมลืองตระกูล</b> <br />
                            <b>สาขามหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</b>
                          </div>
                        </div>
                        <div className='form-group mb-0'>
                          <input
                            className=''
                            type='file'
                            required
                            onChange={this._changeFile}
                            accept='image/png, image/jpeg, application/pdf'
                          />
                        </div>
                        รับเฉพาะไฟล์ .png, .jpeg, .pdf ขนาดไม่เกิน 2MB
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
                            className='btn btn-danger btn-block pointer'
                            onClick={this.toggle2}
                          >สละสิทธิ์</button>
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

export default compose(
  checkUser('/accept-camper')
)(index)
