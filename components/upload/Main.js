import React from 'react'
import styled, { keyframes } from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import { connect } from 'react-redux'
import Link from 'next/link'

import Header from './header'

const BackgroundContainer = styled.div`
  background: #B8D0EC;
  min-height: 100vh;
  height: auto;
  background-image: url('/static/img/bg2-01.png');
  background-size: cover;
  background-attachment: fixed;


  @media screen and (min-width: 576px) {
    background-image: url('/static/img/bg-d2.png');
    background-position-x: 50%;
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

const CardUpload = styled.div`
  font-family: 'pridi-regularr';
  font-size: 28px;
  color: #B8D0EC;
  user-select: none;
  position: relative;

  & > input[type=file] {
    position: absolute;
    z-index: -1;
    width: 10px;
    
    &:focus + label {
      text-shadow: 0 0 5px #000;
      
    }
  }

  & .loading {
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
      /* #232323;  */
      border-bottom: 8px solid #fff;
      /* #232323; */
      border-right: 8px solid rgba(255,255,255,0); 
      border-left: 8px solid rgba(255,255,255,0); 
      border-radius: 50%;
      animation: ${loadingIcon} 1s linear infinite;
    }

    & .waiting {
      /* opacity: .3; */
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      height: 100%;
      width: 100%;
      z-index: 10;
      width: 290px;

      @media only screen and (min-width: 768px) and (max-width: 991px) {
        width: 210px;
      }

      @media(min-width: 992px) {
        margin: 0 ${props => props.margin};
      }
    }

  }



  & > label {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    width: 290px;
    height: 230px;
    cursor: pointer;

    align-items: center;
    background-size: cover;
    background-image: url(${props => props.img});
    border-radius: 15px;
    transition: all .5s;

    ${props => props.link && `
      flex-direction: column;
    `}

    ${props => props.uploaded && `
      color: #76ff03;
    `}
    ${props => props.error && `
      color: #E57373;
    `}

    &:hover {
      transform: scale(1.005);
      box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      
    }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      width: 210px;
      height: 168px;
    }

    @media(min-width: 992px) {
      margin: 10px ${props => props.margin};
    }

    & > span {
      display: block;
    }
  }
`

const CustomRow = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding-bottom: 40px;
`

const showNumOfAsnwered = (data) => {
  switch (data) {
    case 0:
      return `<span style='color: red'>0 / 6</span>`
    case 6:
      return `<span style='color: green'>6 / 6</span>`
    default:
      return `<span style='color: orange'>${data} / 6</span>`
  }
}

const Card = props => {
  const { outerClass, content, link, name, dashboard: { files } } = props
  return (
    <div className={`${outerClass} mx-auto`}>
      {
        link ? (
          <Link prefetch href='/'>
            <CardUpload
              {...props}
            >
              <label
                dangerouslySetInnerHTML={{ __html: `${content} ${showNumOfAsnwered(3)}` }}
              />
            </CardUpload>
          </Link>
        ) : (
          <CardUpload
            {...props}
            {...files[name]}
            title={files[name].saving ? '' : props.title}
          >
            <input type='file' id={`${name}-file-input`} />
            <label
              htmlFor={`${name}-file-input`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className='loading'>
              <div className={`waiting `} >
                <div className='waitanim' />
              </div>
            </div>
          </CardUpload>
        )
      }
    </div>
  )
}

const cardData = [
  {
    name: '1',
    outerClass: 'col-12 col-md-4 pr-md-0',
    margin: '0 0 auto',
    img: '/static/img/upload-card-1.png',
    content: 'ตอบคำถาม <br/>',
    link: true,
    title: 'ไปหน้าตอบคำถาม'
  },
  {
    name: 'transcript',
    outerClass: 'col-12 col-md-4 px-md-0',
    margin: 'auto 0',
    img: '/static/img/upload-card-2.png',
    content: 'อัพโหลดใบ ปพ.1',
    isError: true,
    title: 'คลิก เพื่ออัพโหลดเอกสาร'
  },
  {
    name: 'allowByParent',
    outerClass: 'col-12 col-md-4 pl-md-0',
    margin: 'auto 0 0',
    img: '/static/img/upload-card-1.png',
    content: 'อัพโหลดใบเอกสาร<br />ขออนุญาตผู้ปกครอง',
    isUpload: true,
    title: 'คลิก เพื่ออัพโหลดเอกสาร'

  }
]

const Alert = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  transition: transform 0.7s linear;
  
  & button {
    outline: none;
    cursor: pointer;
  }

  ${props => props.show ? `
    transform: translateY(0);  
  ` : `
    transform: translateY(-100px);
  `}

  @media (min-width: 576px) {
    max-width: 540px;
    margin: 0 -15px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px){
    max-width: 960px; 
  }

  @media (min-width: 1200px){
    max-width: 1140px; 
  }
`

const MainUpload = props => (
  <div>
    <BackgroundContainer>
      <button onClick={props.toggleNofi}>{props.showNofi ? 'hide ' : 'show '}nofication</button>
      <Header img={`https://cdn-images-1.medium.com/max/870/1*QVdC5tpOzBrJtc6M28F7XQ.jpeg`} />
      <div className='container'>
        <Alert className={`row justify-content-center `} show={props.showNofi}>
          <div className='col-12 col-md-7'>
            <div className='alert alert-danger' role='alert'>
              <i className='fas fa-exclamation-triangle' />{' '}
                Warning and alert here! {props.showNofi ? 'true' : 'false'}
              <button
                type='button'
                className='close'
                onClick={props.closeNofi}
              >
                <span>&times;</span>
              </button>
            </div>
          </div>
        </Alert>
        <CustomRow className='row text-center'>
          {
            cardData.map((data, index) => (
              <Card
                key={index}
                {...props}
                {...data}

              />
            ))
          }
        </CustomRow>
      </div>
    </BackgroundContainer>
  </div>
)

export default compose(
  connect(
    state => ({
      dashboard: state.dashboard
    })
  ),
  withStateHandlers(
    ({ initialValue = false }) => ({
      showNofi: initialValue
    }),
    {
      toggleNofi: ({ showNofi }) => () => ({
        showNofi: !showNofi
      }),
      closeNofi: () => () => ({
        showNofi: false
      })
    }
  )
)(MainUpload)
