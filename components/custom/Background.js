import React from 'react'
import styled from 'styled-components'
import Check from './Checkname'

const Bg = styled.body`
    height: 100vh;
    width:100vw;
    
`
const BgBottom = styled.img`
    position: absolute;
    width: 100vw;
    z-index:2;
    bottom: 0;
    left:0;
    @media(min-width:320px){
      width: 200vw;
      margin-left:-50%;
    }
    @media(min-width:576px){
      width: 150vw;
      margin-left:-25%;
    }
    @media(min-width:768px){
      width: 120vw;
      margin-left:-10%;
    }
    @media(min-width:1024px){
      width: 100vw;
      margin-left:0%;
    }
`
const BgLeft = styled.img`
    position: absolute;
    height: 100vh;
    z-index:1;
    bottom:0;
    left:-1vw;
    @media(max-width:576px){
      display:none;
    }
    @media(max-width:768px){

    }
`
const BgRight = styled.img `
    position: absolute;
    height: 100vh;
    z-index:1;
    bottom:0;
    right:-1vw;
    @media(max-width:576px){
      display:none;
    }
    @media(max-width:768px){
    }
`
const Button = styled.button`
    cursor:pointer;
`
const BoxL = styled.div`
  width: 30%;
  min-height: 5%;
  background-color: #fcb933;
  box-shadow: 0 2px 2px 0 #fff, 0 4px 10px 0 #fff ;
  position: absolute; 
  z-index: 2;
  margin-top: 23%;
  margin-left: 55%;
  bottom:10vh;
  right:5vw;
  `
const SelectorL = styled.div`
  border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #FCB933;
`

const Span = styled.span`
@font-face {
  font-family: 'Pridi';
  src: url('/static/fonts/Pridi-Light.ttf');
  }
  font-family: 'Pridi';
  font-size: 4vw;
  color: white;
  @media(min-width:500px){
    font-size: 18px;
  }
`

export default class Background extends React.Component {
  render() {
    return(
    <Bg>
        <BgLeft src="../../static/img/Bgleft.png"/>
        <BgRight src="../../static/img/BgRight.png"/>
        <BgBottom src="../../static/img/open.png"/>
        <BoxL className="rounded text-center pt-1"><Span>เนื่องจากที่แห่งนี้นั้นไร้แสงส่องเข้ามาถึง เจ้าจงใช้คบไฟที่ได้รับมาส่องดูผลสมัครด้วยตนเองเสีย</Span></BoxL>            
          <div className="d-flex justify-content-center align-items-center">
          <Check/>
          </div>   
    </Bg>

    )
  }
} 
