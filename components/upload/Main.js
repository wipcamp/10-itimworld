import React from 'react'
import styled from 'styled-components'

import Newheader from './header'

const BackgroundContainer = styled.div`
  background: #B8D0EC;
  min-height: 100vh;
  height: auto;
`

const CardUpload = styled.div`
  font-family: 'pridi-regularr';
  font-size: 28px;
  color: #B8D0EC;

  & > input[type=file] {
    position: absolute;
    z-index: -1;
    width: 10px;
    
    &:focus + label {
      text-shadow: 0 0 10px rgba(81,255,255,1);
      
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

    @media only screen and (min-width: 768px) and (max-width: 991px) {
      width: 210px;
      height: 168px;
    }

    @media(min-width: 992px) {
      margin-top: 100px;
      margin: 100px ${props => props.margin};
    }
  }
`

const Card = ({ img, name, margin, content, outerClass }) => (
  <div className={outerClass}>
    <CardUpload img={img} margin={margin}>
      <input type='file' id={`${name}-file-input`} />
      <label
        htmlFor={`${name}-file-input`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </CardUpload>
  </div>
)

const cardData = [
  {
    name: '1',
    outerClass: 'col-12 col-md-4 pr-md-0',
    margin: '0 0 auto',
    img: '/static/img/upload-card-1.png',
    content: 'ตอบคำถาม'
  },
  {
    name: '2',
    outerClass: 'col-12 col-md-4 px-md-0',
    margin: 'auto 0' ,
    img: '/static/img/upload-card-2.png',
    content: 'อัพโหลดใบ ปพ.1'
  },
  {
    name: '3',
    outerClass: 'col-12 col-md-4 pl-md-0',
    margin: 'auto 0 0',
    img: '/static/img/upload-card-1.png',
    content: 'อัพโหลดใบเอกสาร<br />ขออนุญาตผู้ปกครอง'
  }
]

const MainUpload = props => (
  <div>
    <BackgroundContainer>
      <Newheader img={`https://pbs.twimg.com/profile_images/829362291237801985/mvlVSd7J.jpg`} />
      <UploadList {...props} />
    </BackgroundContainer>
  </div>
)

const UploadList = () => (
  <div className='container'>
    <div className='row text-center'>
      {
        cardData.map((data, index) => (
          <Card
            key={index}
            name={data.name}
            margin={data.margin}
            img={data.img}
            outerClass={data.outerClass}
            content={data.content}
          />
        ))
      }
    </div>
  </div>
)

export default MainUpload
