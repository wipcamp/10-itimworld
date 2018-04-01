import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import checkUser from './checkUser'

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
const Box = styled.div`
    background-color : white;
    padding : 2em;
    border-radius : 10px;
    font-size:1.2em;
`

class Finish extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-12 col-md-8'>
                <div className='box-shadow bg-light my-4 p-3 rounded text-center'>
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
              </div>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}

export default compose(
  checkUser('/accept-camper/finish')
)(Finish)
