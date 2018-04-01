import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import campers from './campers.json'
// campers.push({wipId: 100010})

const H = styled.h1`
font-size:3em;
text-align: center;
@font-face {
  font-family: 'Pridi';
  src: url('/static/fonts/Pridi-Light.ttf');
}
font-family: 'Pridi';
padding-top: 1%;
@media(min-width:320px){
  font-size:1.5em;
  padding-top: 30%;
}
@media(min-width:576px){
  font-size:1.5em;
  padding-top: 25%;
}
@media(min-width:768px){
  font-size:2em;
}
@media(min-width:1024px){
  font-size:3em;
  padding-top: 1%;
}
color: #0D0D0D;
`
const P = styled.p`
font-size:2vw;
text-align: center;
@font-face {
font-family: 'Pridi';
src: url('/static/fonts/Pridi-Light.ttf');
}
font-family: 'Pridi';
@media(min-width:320px){
font-size:1.5em;
}
@media(min-width:576px){
font-size:1.5em;
}
@media(min-width:768px){
font-size:1.5em;
}
@media(min-width:1024px){
font-size:2em;
}
`
const Button = styled.a`
cursor:pointer;
text-align: center;
  &:hover {
    color: white !important;
  }
@font-face {
font-family: 'Pridi';
src: url('/static/fonts/Pridi-Light.ttf');
}
font-family: 'Pridi';
`
export default class CheckName extends React.Component {
  state = {
    loading: true,
    isPasssed: false
  }
  async componentDidMount () {
    await this.setState({
      loading: true
    })
    const id = this.props.initialValues.user_id
    let data = campers.filter(data => data.wipId === id)
    if (data.length > 0) {
      this.setState({
        isPasssed: true,
        loading: false
      })
    }
    this.setState({
      loading: false
    })
  }

  render () {
    if (this.state.loading) {
      return <div>
        loading ...
      </div>
    }
    if (this.state.isPasssed) {
      return <div className='text-center mt-2'>
        <H>ขอแสดงความยินดีด้วย!</H>
        <P>คุณได้เข้าร่วมกองทัพกับเรา</P>
        <Link href='/accept-camper'>
          <a className='btn btn-outline-success text-center'>ยืนยันสิทธิ์</a>
        </Link>
      </div>
    }
    return (
      <div className='text-center mt-2'>
        <H>เสียใจด้วยนะ...</H>
        <P>ฮึบเข้าไว้! ครั้งหน้าลองใหม่!</P>
        <Link href='https://wip.camp'>
          <a className='btn btn-outline-warning text-center'>กลับหน้าหลัก</a>
        </Link>
      </div>
    )
  }
}
