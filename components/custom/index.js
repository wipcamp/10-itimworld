import React from 'react'
import styled from 'styled-components'

const Sec = styled.div`
  height: 250px;
  width: 900px;
  background-color: none;
  overflow : hidden;
  border: 10px solid black;
  @media (min-width: 320px) {
    width: 300px;
    height: 100px;
    border: 4px solid black;
  }
  @media (min-width: 720px) {
    width: 600px;
    height: 200px;
  }
  @media (min-width: 1024px) {
    width: 900px;
    height: 250px;
    border: 10px solid black;
  }
  
`

const Text = styled.p`
  @font-face {
    font-family: 'Pridi';
    src: url('/static/fonts/Pridi-Light.ttf');
  }
  font-family: 'Pridi';
  color: white;
  font-size: 2em;
 @media (max-width: 1024px) {
   font-size: .72em;
 }
`

const ImgY = styled.img`
  width: 120%;
  margin-top: -4vh;
  @media (min-width: 720px) {
    margin-top: -35%;

  }
  @media (min-width: 1024px) {
    margin-top: -30%;
    width: 100%;
  }
`

const BoxY = styled.div`
  background-color: #5D985C;
  width: 100%;
  padding: 1em;
  vertical-align: middle;
  text-align:center;
  height: auto;
  max-height: 70%;
  @media (max-width:1024px) {
    padding: .4em 1em;
  }
`
const SelectorY = styled.div`
  border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid #5D985C;
`
const SelectorL = styled.div`
  border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #FCB933;
`
const BoxL = styled.div`
  background-color: #FCB933;
  width: 100%;
  padding: 1em;
  vertical-align: middle;
  text-align:center;
  height: auto;
  max-height: 70%;
  @media (max-width:1024px) {
    padding: .4em 1em;
  }
`

const CustomTextL = styled(Text)`
  @media(max-width: 1024px) {
    font-size: .65em;
  }
`

const ImgL = styled.img`
  width: 140%;
  float: left;
  margin-top: -5%;
  @media(min-width:320px){
    margin-left: -20%;
  }
  @media(min-width:720px){
    width: 130%;
    margin-top: -10%;
    margin-left: -10%;
  }
  @media(min-width:1024px){
    width: 110%;
    margin-left: 0%;
  }
`
const Div = styled.div`
  width: 100%;
  background-color: #ffffcc;
  padding : 10px;
  padding-top : 0;
  padding-bottom: 0;
  margin-top: 20px;
  border: 10px solid black;
  border-top : none;
  @media(min-width:320px){
    border: 8px solid black;
  }
`

export default class Custom extends React.Component {
  state = {}
  render () {
    return (
      <div className='container d-flex justify-content-center'>
        <div className='row d-flex justify-content-center'>
          <Div className='rounded'>
            <Sec id='Top' className='row'>
              <div className='col-7 d-flex align-items-center justify-content-center'>
                <BoxY className='rounded'><Text>สวัสดีเจ้าลิง เจ้ารู้ไหมว่าวันนี้มีอะไร? ทำไมคนข้างนอกเยอะนัก</Text></BoxY>
                <SelectorY />
              </div>
              <div className='col-5'>
                <ImgY src='/static/img/todfire.png' />
              </div>
            </Sec>
            <Sec other className='row'>
              <div className='col-5'>
                <ImgL src='/static/img/hanufire.png' />
              </div>
              <div className='col-7 d-flex align-items-center justify-content-center'>
                <SelectorL />
                <BoxL className='rounded'><Text>วันนี้เป็นวันประกาศผลค่าย Wip Camp ครั้งที่ 10 ไงล่ะ</Text></BoxL>
              </div>
            </Sec>
            <Sec className='row'>
              <div className='col-7 d-flex align-items-center justify-content-center'>
                <BoxY className='rounded'><Text>หึ! วันนี้แล้วสินะ งั้นเจ้าหนูที่หลงทางอยู่ตรงนั้นก็คงเป็นหนึ่งในผู้สมัครล่ะสิ</Text></BoxY>
                <SelectorY />
              </div>
              <div className='col-5'>
                <ImgY src='/static/img/todfire.png' />
              </div>
            </Sec>
            <Sec other className='row'>
              <div className='col-5'>
                <ImgL src='/static/img/hanufire.png' />
              </div>
              <div className='col-7 d-flex align-items-center justify-content-center'>
                <SelectorL />
                <BoxL className='rounded'><Text>อา... ใช่ แต่ข้างในมันมืดมากเลยนะ แต่เจ้าหนูไม่มีอะไรพกติดตัวมาสักนิด</Text></BoxL>
              </div>
            </Sec>
            <Sec className='row'>
              <div className='col-7 d-flex align-items-center justify-content-center'>
                <BoxY className='rounded'><Text>อืม... เจ้า! เจ้านั่นแหละ! มารับคบเพลิงของพวกข้าไป เก็บมันไว้ดี ๆ ล่ะ!</Text></BoxY>
                <SelectorY />
              </div>
              <div className='col-5'>
                <ImgY src='/static/img/todfire.png' />
              </div>
            </Sec>
            <Sec id='Bottom' other className='row'>
              <div className='col-5'>
                <ImgL src='/static/img/hanufire.png' />
              </div>
              <div className='col-7 d-flex align-items-center justify-content-center'>
                <SelectorL />
                <BoxL className='rounded'><CustomTextL>รับของข้าไปด้วยสิ อ๋อ ส่วนทางที่ถูกต้องน่ะ เจ้าต้องกดกล่องดวงใจ แล้วสิ่งนั้นจะนำทางเจ้าไปเอง</CustomTextL></BoxL>
              </div>
            </Sec>
          </Div>
        </div>
      </div>
    )
  }
}
