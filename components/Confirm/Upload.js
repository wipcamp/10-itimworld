import React from 'react'
import styled, { keyframes } from 'styled-components'
import D from 'react-dropzone'

const loadingIcon = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Dropzone = styled(D)`
  min-height: 150px;
  background-color: #bbb;
  position: relative;
  transition: all .3s;
  ${props => props.err && `
    box-shadow: 0 0 7px red;
  `}

  cursor: pointer;
`

const AbsoluteContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.5);
  padding: 10px;
  /* border: 3px dashed skyblue; */
  top: 0;
  left: 0;

  display: ${props => props.isActive ? 'block' : 'none'};
`
const StyledThumnail = styled.div`
  height: 100%;
  padding-bottom: 20px;
  

  img, embed {
    overflow: hidden;
    height: 100%;
    max-width: 100%;
  }
`

const Thumnail = ({ preview, type }) => (
  <StyledThumnail>
    {
      type === 'application/pdf' && (
        <embed
          src={preview}
          scrolling='no'
        />
      )
    }
    {
      (type === 'image/png' || type === 'image/jpeg') && (
        <img
          className={`img-fluid`}
          src={preview}
          alt={`thumnail`}
        />
      )
    }
  </StyledThumnail>
)

class UploadComponent extends React.Component {
  state = {
    isActive: false
  }
  render () {
    console.log('file', this.props.file)
    const { file } = this.props
    return (
      <div>
        <Dropzone
          className='rounded'
          onDrop={this.props.onDrop}
          err={this.props.err}
        >
          <AbsoluteContainer
            isActive={this.state.isActive || file !== 'undefined'}
            className='rounded'
          >
            {
              file && (
                <Thumnail type={file.type} preview={file.preview}/>
              )
            }
          </AbsoluteContainer>
        </Dropzone>
        <div className={`mt-1 row ${file && 'justify-content-end'}`}>
          {
            this.props.err && (
              <div className='col-8'>
                <span className='pl-1 d-inline-block '>ขนาดไฟล์เกินกรุณาอัพโหลดไฟล์ใหม่</span>
              </div>
            )
          }
          {
            file && (
              <div className='col-4'>
                <button
                  className='btn btn-sm btn-danger float-right'
                  onClick={() => this.props.onDrop([null])}
                >
                  ลบไฟล์
                </button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default UploadComponent
