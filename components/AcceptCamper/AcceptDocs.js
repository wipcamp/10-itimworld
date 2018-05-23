
import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import cookie from '../../utils/cookie'
import checkUser from './checkUser'
import axios from 'axios'
import env from '../../utils/env'

const BackgroundContainer = styled.div`
  background-image: url('/static/img/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  /* align-items: center; */
  font-size: 1.5em;
  text-align: center;
  color: #000;

  .box-shadow {
    min-height: 150px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .1),
                0 8px 8px rgba(0, 0, 0, .1), 
                0 16px 16px rgba(0, 0, 0, .1), 
                0 32px 32px rgba(0, 0, 0, .15);
  }
`

class AcceptDocs extends React.Component {
  state = {
    blob: null
  }
  downloadDocs = async () => {
    let { token } = cookie({req: false})
    let docs = await axios.request({
      url: `${env.API_URL}/campers/${this.props.camper.user_id}/docs`,
      method: 'GET',
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` }
    })
    let readDocs = await new window.FileReader()
    await readDocs.readAsDataURL(docs.data)
    readDocs.onload = (e) => {
      this.setState({
        blob: window.URL.createObjectURL(docs.data)
      })
    }
  }

  openBlob = () => {
    window && window.open(this.state.blob)
  }

  componentDidMount = async () => {
    this.downloadDocs()
  }

  render () {
    return (
      <BackgroundContainer className='container-fluid'>
        <div className='mb-4 row d-flex justify-content-center align-items-center flex-column'>
          <div className='mt-5 box-shadow col-6 p-4 pt-5 rounded card d-flex justify-content-center align-items-center'>
            <h3><b>เอกสารยืนยันการมีสิทธิ์เข้าค่าย<br />WIP Camp #10</b></h3>
            <div className='text-danger mt-3 text-left'>
              <b>หมายเหตุ</b>
              <ol>
                <li>เอกสารสามารถใช้<b> <u>ยืนยันกับโรงเรียนได้</u> </b>ว่าเดินทางมาเข้าค่าย WIP Camp #10</li>
                <li>กรุณาใช้ <b>Google Chrome ในคอมพิวเตอร์หรือโน๊ตบุ๊ค</b> สำหรับการ Download เอกสาร</li>
                <li>กรุณาปิด <b><u>Ad Block</u></b> ก่อน Download เอกสาร</li>
              </ol>
            </div>
            <br />
            <a
              href={this.state.blob}
              className={`btn btn-lg text-white ${this.state.blob ? 'btn-success' : 'btn-secondary'}`}
              disabled={this.state.blob != null}>
              {this.state.blob ? 'Download เอกสาร' : 'กรุณารอสักครู่' }
            </a><br />
              หากเจ้ามีข้อสงสัยสามารถติดต่อได้ที่ <br />
            <a href='https://www.facebook.com/wipcamp' target='_blank'>Facebook WIP Camp</a>
            <div className='mt-4 mb-0'><a className='btn btn-primary' href='https://wip.camp'>ย้อนกลับไปหน้าหลัก</a></div>
          </div>
        </div>
      </BackgroundContainer>
    )
  }
}

export default compose(
  checkUser('/accept-camper')
)(AcceptDocs)
