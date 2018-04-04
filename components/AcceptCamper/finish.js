/* global FormData */
import React from 'react'
import { compose } from 'recompose'
import styled, { keyframes } from 'styled-components'

import Alert from '../Core/Alert'
import checkUser from './checkUser'
import { Label } from '../Core/Input'
import { ModalContainer } from './Main'

import cookie from '../../utils/cookie'
import api from '../../utils/api'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : calc(100vh - 59px);
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
  left: 0;
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

const Modal = (props) => (
  <ModalContainer isShow={props.Show}>
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-10'>
          <div className='mt-4 card'>
            <div className='card-body'>
              <h1 className='text-center'>ยืนยันการอัพโหลดสลิป</h1>
              <hr />
              <div>
                
                กรุณาตรวจสอบให้แน่ใจก่อนว่า
                <ul>
                  <li className='text-danger'><b>หลักฐานการโอนเงิน</b> ชัดเจน ไม่เบลอ มีข้อมูลสำคัญครบถ้วน เช่น ชื่อบัญชี, จำนวนเงิน</li>
                </ul>
                หากเจ้ามั่นใจว่า ถูกต้อง ครบถ้วน แล้ว จงกดยืนยันเพื่อรายงานตัวของเจ้า !
              </div>
              <hr />
              <div className='row'>
                <div className='col-6'>
                  <button
                    className='btn btn-block pointer btn-outline-secondary'
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

class UploadFile extends React.Component {
  render () {
    return (
      <form
        method={`POST`}
        onSubmit={this.props.onSubmit}
      >
        <h3>แก้ไขสลิป</h3>
        <hr />
        <div className='text-left'>
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
          <div className='mb-2'>
            <b><u>เหตุผลที่สลิปจ่ายเงินของน้องถูกปฏิเสธ:</u></b> {this.props.slip.reason}          
          </div>
          <div style={{border: '2px solid #FFAC2A', padding: '5px', marginBottom: '10px'}}>
            <div className={`form-group mb-0 p-2 ${this.props.fileError && 'bg-danger'}`} style={{transition: 'all .3s'}}>
              <input
                className={`${this.props.fileError && 'text-white'}`}
                type='file'
                required
                onChange={this.props.changeFile}
                accept='image/png, image/jpeg, application/pdf'
              />
            </div>
            <div className='text-left'>
              <b>หมายเหตุ </b>
              <ul>
                <li>
                  รับเฉพาะไฟล์ .png, .jpeg, .pdf ขนาดไม่เกิน 2MB
                </li>
                <li>
                  <b className='text-danger'>หากอัพโหลดไม่ได้</b> ให้ลอง<u>เปลี่ยน</u> <b>อุปกรณ์ที่ใช้</b> (เช่น คอมพิวเตอร์, tablet) หรือลอง<u>เปลี่ยน</u> <b>Web Browser ที่ใช้</b> (เช่น Google Chrome, Firefox)
                </li>
                <li>
                  หากแก้ไขตามวิธีข้างต้นแล้วไม่ได้ให้ติดต่อทางแฟนเพจ <a href='https://www.facebook.com/wipcamp'><b>WIP Camp</b></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <button className='btn btn-primary btn-block pointer'>
              อัพโหลดสลิป
            </button>
          </div>
        </div>
      </form>
    )
  }
}

class Finish extends React.Component {
    state = {
      uploadRejected: false,
      saving: false,
      file: null,
      error: false,
      showAlert: false,
      alertMess: '',
      showModal: false,
      fileError: false
    }

    postFile = () => {
      this.setState({
        saving: true
      })
      const { token } = cookie({req: false})
      const { file } = this.state
      if (file) {
        const body = new FormData()
        body.append('file', file)
        body.append('fileType', 'bank_payment_slip')
        body.append('userId', this.props.initialValues.user_id)
        api.post(`/uploads`, body, {Authorization: `Bearer ${token}`})
          .then(res => {
            this.setState({
              saving: false,
              uploadRejected: false,
              showModal: false
            })

            this.alert({
              error: false,
              message: 'อัพโหลดไฟล์เรียบร้อย'
            })
          })
          .catch(err => {
            this.setState({
              saving: false,
              showModal: false
            })

            this.alert({
              error: true,
              message: `แย่แล้วพบปัญหา: ${err}`
            })
          })
      } else {
        this.setState({
          fileError: true,
          saving: false
        })
        this.alert({
          error: true,
          message: 'ไม่พบไฟล์'
        })
      }
    }

    toggleModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }))
    }

    changeFile = (e) => {
      const file = e.target.files[0]
      if (!file) {
        this.setState({
          fileError: true
        })
        this.alert({
          error: true,
          message: 'ไม่พบไฟล์'
        })
      } else if (file.size > 2097152) {
        this.setState({
          fileError: true
        })
        this.alert({
          error: true,
          message: 'ขนาดไฟล์เกิน 2 MB โปรดเลือกไฟล์อื่น'
        })
      } else if ('image/png, image/jpeg, application/pdf'.split(', ').indexOf(file.type) < 0) {
        this.setState({
          fileError: true
        })
        this.alert({
          error: true,
          message: 'อนุญาตเฉพาะไฟล์นามสกุล .png .jpeg .pdf'
        })
      } else {
        this.setState({
          fileError: false
        })
      }
      this.setState({
        file
      })
    }

    onSubmit = (e) => {
      e.preventDefault()
      const { file } = this.state
      if (!file) {
        this.setState({
          fileError: true
        })
        this.alert({
          error: true,
          message: 'โปรดเพิ่มไฟล์ก่อนทำการอัพโหลด'
        })
      } else if (file.size > 2097152) {
        this.setState({
          fileError: true
        })
        this.alert({
          error: true,
          message: 'ขนาดไฟล์เกิน 2 MB โปรดเลือกไฟล์อื่น'
        })
      } else if ('image/png, image/jpeg, application/pdf'.split(', ').indexOf(file.type) < 0) {
        this.setState({
          fileError: true
        })
        this.alert({
          error: true,
          message: 'อนุญาตเฉพาะไฟล์นามสกุล .png .jpeg .pdf'
        })
      } else {
        this.toggleModal()
      }
    }

    hideAlert = () => {
      this.setState({
        showAlert: false
      })
    }

    alert = ({ error, message }) => {
      this.setState({
        showAlert: true,
        error,
        alertMess: message
      })
    }

    componentWillMount () {
      this.setState({
        uploadRejected: this.props.uploadRejected
      })
    }

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <Alert error={this.state.error} showDialog={this.state.showAlert} message={this.state.alertMess} hideDialog={this.hideAlert} />
            <div className='row justify-content-center'>
              <div className='col-12 col-md-8'>
                <div className='position-relative box-shadow bg-light my-4 p-3 rounded text-center'>
                  {
                    this.state.uploadRejected ? (
                      <UploadFile
                        {...this.props}
                        onSubmit={this.onSubmit}
                        changeFile={this.changeFile}
                        alert={this.alert}
                        fileError={this.state.fileError}
                        saving={this.state.saving}
                        file={this.state.file}
                      />
                    ) : (
                      <div>
                        <h3>ยืนยันสิทธิ์เรียบร้อย</h3>
                        <hr />
                        <p className='text-left'>
                          ยินดีต้อนรับน้องเอ๋ย ต่อไปนี้เจ้าจักถือว่าเป็นน้องค่าย <b>WIP Camp #10</b> อย่างเป็นทางการ <br />
                          พวกพี่วานร และ ยักษายินดีเป็นอย่างยิ่งที่จะได้พบพวกเจ้า <br />
                          <b>ค่ายจะเริ่มวันที่ 30 พ.ค. 2561 - 3 มิ.ย. 2561</b> <br />
                          แล้วเจอกันนะเหล่าทหารเอก แสนกล้าหาญ ! <br />
                          <u><b>หมายเหตุ</b></u> หากหลักฐานการโอนเงินมีปัญหาจะมีการติดต่อไปภายหลัง
                        </p>
                        <hr />
                        <div className='row'>
                          <div className='col-12'>
                            <a
                              href='https://www.facebook.com/groups/184594058826988/'
                              target='_blank'
                              className='pointer btn btn-outline-primary btn-block'
                            >
                              เข้าร่วมโต้วาจากันที่กลุ่ม Facebook เร็ว!
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <Modal
            Show={this.state.showModal}
            toggle={this.toggleModal}
            post={this.postFile}
            loading={this.state.saving}
          />
        </BackgroundContainer>
      )
    }
}

export default compose(
  checkUser('/accept-camper/finish')
)(Finish)
