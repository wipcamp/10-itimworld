import React from 'react'
import styled from 'styled-components'

import Header from './header'

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
      margin: 40px ${props => props.margin};
    }
  }
`

const Card = ({ img, name, margin, content, outerClass }) => (
  <div className={`${outerClass} mx-auto`}>
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
    margin: 'auto 0',
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

const Progress = styled.div`

`

const ProgressContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 0px) {
    bottom: 0px;
    position: fixed;
    & ${Progress} {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      margin: 0;
      width: 100%;
    }
  }
`

const MainUpload = props => (
  <div>
    <BackgroundContainer>
      <Header img={`https://pbs.twimg.com/profile_images/829362291237801985/mvlVSd7J.jpg`} />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 mt-3 mt-md-5 col-md-8'>
            <div className='alert alert-warning' role='alert'>
              Warning and alert here!
            </div>
          </div>
        </div>
        <div className='row text-center mb-5'>
          {
            cardData.map((data, index) => (
              <Card
                key={index}
                name={data.name}
                margin={data.margin}
                img={data.img}
                outerclass={data.outerClass}
                content={data.content}
              />
            ))
          }
        </div>
      </div>
      <ProgressContainer>
        <div className='col-md-7 col-12 px-0'>
          <Progress className='alert alert-light' role='alert'>
            Progress here
          </Progress>
        </div>
      </ProgressContainer>
    </BackgroundContainer>
  </div>
)

export default MainUpload
