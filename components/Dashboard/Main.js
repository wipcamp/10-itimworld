import React from 'react'
import styled, { keyframes } from 'styled-components'
import { compose, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { actions as DashboardActions } from '../../store/reducers/dashboard'
import Link from 'next/link'
import moment from 'moment'

import cookie from '../../utils/cookie'
import api from '../../utils/api'
import Header from '../Core/Header/Main'
import Alert from '../Core/Alert'
import checkRegisterStep from '../../utils/checkRegisterStep'
import getToken from '../../utils/getToken'
import { closeUploadDocument } from '../../schedule.json'

const BackgroundContainer = styled.div`
  background: #29241B url('/static/img/bg.png') center top;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  background-attachment: fixed;
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
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
  cursor:pointer;

  ${props => (props.isApprove === -3 || props.isApprove === -2) && `
    cursor: no-drop;
  `}

  ${props => Number.isInteger(props.countAnswered)
    ? props.countAnswered === 6 ? `
        background-image: url(${props.img.substring(0, `${props.img.length}` - 4)}yes.png);
      ` : `
        background-image: url(${props.img});
      `
    : props => !props.filePath ? (
      props.isApprove === -3 ? `
        background-image: url(${props.img.substring(0, `${props.img.length}` - 4)}-closed.png);
      ` : `
        background-image: url(${props.img});
      `) : props.isApprove === 1 ? `
        background-image: url(${props.img.substring(0, `${props.img.length}` - 4)}yes.png);
      ` : props.isApprove === 0 ? `
        background-image: url(${props.img.substring(0, `${props.img.length}` - 4)}no.png);
      ` : props.isApprove === -3 ? `
        background-image: url(${props.img.substring(0, `${props.img.length}` - 4)}-closed.png);
      ` : `background-image: url(${props.img.substring(0, `${props.img.length}` - 4)}pending.png);`
}

  ${props => props.closed && `
    cursor: default;
    background-image: url('/static/img/card3-closed.png');
  `}
  
  height: 290px;
  width: 248px;
  transition: all .5s;
  margin: 0 auto;
  border-radius: 10px;

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 232px;
    width: 200px;
  }

  @media (max-width: 575.98px) {
    ${props => props.link ? '' : 'margin-top: 20px;'}
    height: 236px;
    width: 201px;
  }

  &:hover {
    transform: scale(1.010);
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
  }

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
    margin: 0px auto;
    display: flex;
    justify-content: center;
    height: 100%;

    background-size: cover;
    ${`/*background-image: url(${props => props.img});*/`}
    border-radius: 15px;
    transition: all .5s;

    & label {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }    
  }

  & > label {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    /* cursor: pointer; */

    ${props => props.countAnswered === 0 && `
      filter: grayscale(100%) !important;
    `}
    

    align-items: center;
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
  margin-top: 50px;
  display: flex;
  align-items: center;
  padding-bottom: 40px;
`

const Card = props => {
  const end = moment(`${closeUploadDocument} GMT+7`, 'DD MMM YYYY hh:mm:ss')
  const isClosed = moment().isAfter(end)
  const { outerClass, link, name, dashboard: { files }, setDragActive, onDropFile, answered, initialValues: { user_id: userId } } = props
  return (
    <div className={`${outerClass} mx-auto`}>
      {
        link ? (
          isClosed ? (
            <CardUpload
              closed={answered !== 6}
              countAnswered={answered}
              {...props}
            />
          ) : (
            <Link prefetch href='/question'>
              <CardUpload
                countAnswered={answered}
                {...props}
              />
            </Link>
          )
        ) : (
          <CardUpload
            {...props}
            {...files[name]}
            approve={files[name].isApprove}
          >
            <Dropzone
              className='dropzone'
              style={{position: 'relative'}}
              accept={'image/png, image/jpeg, application/pdf'}
              onDragEnter={() => setDragActive({field: name, dropActive: true})}
              onDragLeave={() => setDragActive({field: name, dropActive: false})}
              onDrop={(files) => onDropFile(name, files, userId)}
              disabled={[1, -2, -3].includes(files[name].isApprove)}
            >
              <label
                title={files[name].saving ? '' : props.title}
                htmlFor={`${name}-file-input`}
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
      {name === '1' && <DownloadLink empty />}
      {name === 'transcription_record' && <TranscriptComponent>รองรับเฉพาะไฟล์นามสกุล .png .jpeg .pdf</TranscriptComponent>}
      {name === 'parental_authorization' && <Download />}

      <Aligner>
        {
          files[name] && files[name].isApprove === 0 &&
          <ReasonApprove className='reason_approve' dangerouslySetInnerHTML={{__html: files[name].approveReason}} />
        }
      </Aligner>
    </div>
  )
}

const Aligner = styled.div`
  @media (min-width: 768px) {
    min-height: 100px;
  }

`

const ReasonApprove = styled.div`
  color: #fff;
  border-radius: 10px;
  padding: 5px 10px;
  background: rgba(234, 12, 12, 0.5);
  display: inline-block;
  min-width: 90%;
  max-width: 90%;
  margin: 10px 0;
  transition: all 1s;
`

const DetailTranscript = styled.div`
  color: #fff;
  font-size: 16px;
  padding-top: 10px;
  height: 50px;
`

const TranscriptComponent = () => (
  <DetailTranscript>
    รองรับเฉพาะไฟล์นามสกุล{` `}
    <DownloadLink inline target='_blank' href='https://en.wikipedia.org/wiki/JPEG'>.jpeg</DownloadLink>{` `}
    <DownloadLink inline target='_blank' href='https://en.wikipedia.org/wiki/Portable_Network_Graphics'>.png</DownloadLink>{` `}
    <DownloadLink inline target='_blank' href='https://en.wikipedia.org/wiki/Portable_Document_Format'>.pdf</DownloadLink>{` `}
    ไม่เกิน 2 MB
  </DetailTranscript>
)

const DownloadLink = styled.a`
  color: #fff;
  text-decoration: underline;
  font-size: 16px;
  padding-top: 10px;
  height: 50px;
  text-align: center;
  width: auto;

  ${props => !props.inline && `
    display: block;
  `}

  &:link {
    color: #FFF;
  }

  &:hover {
    color: #fff;
    text-decoration: none;
  }

  @media (min-width: 0px) and (max-width: 767px) {
    ${props => props.empty && `
    height: 20px;
    `}
  }
`

const Download = props => {
  return (
    <DownloadLink href='/static/files/parent_authorization.pdf' target='_blank'>
      ดาวน์โหลดเอกสาร
    </DownloadLink>
  )
}

const cardData = [
  {
    name: '1',
    outerClass: 'col-12 col-md-4 pr-md-0',
    margin: '0 0 auto',
    img: '/static/img/card3.png',
    content: 'ตอบคำถาม <br/>',
    link: true,
    title: 'ไปหน้าตอบคำถาม'
  },
  {
    name: 'transcription_record',
    outerClass: 'col-12 col-md-4 px-md-0',
    margin: 'auto 0',
    img: '/static/img/card1.png',
    content: 'อัพโหลดใบ ปพ.1',
    isError: true,
    title: 'คลิก เพื่ออัพโหลดเอกสาร'
  },
  {
    name: 'parental_authorization',
    outerClass: 'col-12 col-md-4 pl-md-0',
    margin: 'auto 0 0',
    img: '/static/img/card2.png',
    content: 'อัพโหลดใบเอกสาร<br />ขออนุญาตผู้ปกครอง',
    isUpload: true,
    title: 'คลิก เพื่ออัพโหลดเอกสาร'
  }
]

const StyledProgressBar = styled.div.attrs({
  className: 'row justify-content-center mt-3'
})`
  transition: all 1.5s ease-in-out;
  max-height: 0;
  
  .card {
    opacity: 0;
    transition: all 1.5s;
    font-size: 120%;
  }

  ${props => props.data &&
            props.data.answered === 6 &&
            props.data.parentApprove === 1 &&
            props.data.transcriptApprove === 1 && `
    max-height: inherit;

    .card {
      opacity: 1;
    }          
  `}
`

const ProgressBar = (props) => {
  const { answered,
    dashboard: {
      files: {
        parental_authorization: { isApprove: parentApprove },
        transcription_record: { isApprove: transcriptApprove }
      }
    }
  } = props
  return (
    <StyledProgressBar data={{answered, parentApprove, transcriptApprove}}>
      <div className='col-md-8 col-12'>
        <div className='card'>
          <div className='card-body text-center'>
            {
              answered === 6 &&
              parentApprove === 1 &&
              transcriptApprove === 1 && (
                <span dangerouslySetInnerHTML={{ __html: `
                การสมัครของน้องเสร็จเรียบร้อยทุกขั้นตอนแล้ว<br /> รอประกาศผลวันที่ 31 มีนาคม พ.ศ.2561 ที่เว็บไซต์ <a href='https://wip.camp'>wip.camp</a> นะครับ
                ` }} />
              )
            }
          </div>
        </div>
      </div>
    </StyledProgressBar>
  )
}

const MainUpload = props => (
  <div>
    <BackgroundContainer>
      <Header />
      <div className='container'>
        <ProgressBar {...props} />
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

const getFilePath = (arr) => {
  if (arr.length === 0) {
    return ''
  } else if (arr.length > 1) {
    let data = arr.reduce((prev, cur) => moment(prev.created_at).isAfter(moment(cur.created_at)) ? prev : cur)
    return data.path
  } else {
    return arr[0].path
  }
}

const getApprove = (arr) => {
  if (arr.length === 0) {
    const end = moment(`${closeUploadDocument} GMT+7`, 'DD MMM YYYY hh:mm:ss')
    if (moment().isAfter(end)) return { isApprove: -3 }
    return { isApprove: -1 }
  } else if (arr.find(data => data.is_approve === 1)) {
    return { isApprove: 1 }
  }
  const lastDoc = arr[arr.length - 1]
  const end = moment(`${closeUploadDocument} GMT+7`, 'DD MMM YYYY hh:mm:ss')
  if (moment().isAfter(end)) return { isApprove: -3 }
  return {
    isApprove: lastDoc.is_approve,
    approveReason: lastDoc.approve_reason || 'กรุณาติดต่อพี่วิปโป้ ได้ที่<a href="https://www.facebook.com/wipcamp" target="_blank">แฟนเพจ</a>เพื่อสอบถามปัญหา'
  }
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
    async componentDidMount () {
      const { user_id: userId } = this.props.initialValues
      let {token} = cookie({req: false})
      const { data } = await api.get(`/registrants/${userId}`, {Authorization: `Bearer ${token}`})

      const { documents } = data[0]
      this.props.initDashboard({
        transcript: {
          ...getApprove(documents.filter(file => file.type_id === 3)),
          filePath: getFilePath(documents.filter(file => file.type_id === 3))
        },
        parent: {
          ...getApprove(documents.filter(file => file.type_id === 2)),
          filePath: getFilePath(documents.filter(file => file.type_id === 2))
        }
      })
      this.props.setAnswered(data[0].eval_answers.length)
    }
  })
)(MainUpload)
