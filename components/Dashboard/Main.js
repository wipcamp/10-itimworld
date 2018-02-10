import React from 'react'
import styled, { keyframes } from 'styled-components'
import { compose, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { actions as DashboardActions } from '../../store/reducers/dashboard'
import Link from 'next/link'

import api from '../../utils/api'
import Header from '../Core/Header/Main'
import Alert from '../Core/Alert'
import checkRegisterStep from '../../utils/checkRegisterStep'
import getToken from '../../utils/getToken'

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

const bounceUp = keyframes`
  0%, 100% {
    top: 0;
  }
  60% {
    top: -10px;
  }
`

const CardUpload = styled.div`
  font-family: 'pridi-regularr';
  font-size: 28px;
  color: #B8D0EC;
  user-select: none;
  position: relative;

  & input[type=file] {
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

  & .dropzone {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    width: 290px;
    height: 230px;
    cursor: pointer;

    background-size: cover;
    background-image: url(${props => props.img});
    border-radius: 15px;
    transition: all .5s;

    ${props => !props.filePath && `
      filter: grayscale(50%) !important;
    `}

    & label {
      cursor: pointer;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

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
  }

  & > label {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    width: 290px;
    height: 230px;
    cursor: pointer;
    /* filter: blur(2px) !important; */

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

const AbsoluteContainer = styled.div`
  width: 100%;
  z-index: 1;
  border-radius: 15px;
`

const DropActive = styled.div`
  border-radius: 15px;
  background: pink;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  border: 3px solid skyblue;
  align-items: center;
  flex-direction: column;
`

const DropActiveIcon = styled.div`
  position: relative;
  animation: ${bounceUp} 1s infinite;
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
  const { outerClass, content, link, name, dashboard: { files }, setDragActive, onDropFile, answered, initialValues: { user_id: userId } } = props
  return (
    <div className={`${outerClass} mx-auto`}>
      {
        link ? (
          <Link prefetch href='/question'>
            <CardUpload
              {...props}
            >
              <label
                dangerouslySetInnerHTML={{ __html: `${content} ${showNumOfAsnwered(answered)}` }}
              />
            </CardUpload>
          </Link>
        ) : (
          <CardUpload
            {...props}
            {...files[name]}
          >
            <Dropzone
              className='dropzone'
              style={{position: 'relative'}}
              accept={'image/png, image/jpeg, application/pdf'}
              onDragEnter={() => setDragActive({field: name, dropActive: true})}
              onDragLeave={() => setDragActive({field: name, dropActive: false})}
              onDrop={(files) => onDropFile(name, files, userId)}
            >
              <label
                title={files[name].saving ? '' : props.title}
                htmlFor={`${name}-file-input`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <AbsoluteContainer>
                {
                  files[name].dropzoneActive && (
                    <DropActive>
                      <DropActiveIcon>
                        <i className='fas fa-cloud-upload-alt text-white fa-2x' />
                      </DropActiveIcon>
                      <small>วางเพื่ออัพโหลดไฟล์ทันที ทันใด</small>
                    </DropActive>
                  )
                }
              </AbsoluteContainer>
            </Dropzone>

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
    name: 'transcription_record',
    outerClass: 'col-12 col-md-4 px-md-0',
    margin: 'auto 0',
    img: '/static/img/upload-card-2.png',
    content: 'อัพโหลดใบ ปพ.1',
    isError: true,
    title: 'คลิก เพื่ออัพโหลดเอกสาร'
  },
  {
    name: 'parental_authorization',
    outerClass: 'col-12 col-md-4 pl-md-0',
    margin: 'auto 0 0',
    img: '/static/img/upload-card-1.png',
    content: 'อัพโหลดใบเอกสาร<br />ขออนุญาตผู้ปกครอง',
    isUpload: true,
    title: 'คลิก เพื่ออัพโหลดเอกสาร'
  }
]

const MainUpload = props => {
  return (
    <div>
      <BackgroundContainer>
        <Header img={`https://cdn-images-1.medium.com/max/870/1*QVdC5tpOzBrJtc6M28F7XQ.jpeg`} />
        <div className='container'>
          <Alert {...props} {...props.dashboard} />
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
}

export default compose(
  withState('answered', 'setAnswered', 0),
  connect(
    state => ({
      dashboard: state.dashboard
    }),
    { ...DashboardActions }
  ),
  getToken(),
  checkRegisterStep('/dashboard'),
  lifecycle({
    async componentWillMount () {
      const { user_id: userId } = this.props.initialValues
      const { data } = await api.get(`/registrants/${userId}`)
      this.props.setAnswered(data[0].eval_answers.length)
    }
  })
)(MainUpload)
