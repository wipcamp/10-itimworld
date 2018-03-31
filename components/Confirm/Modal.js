import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 999;
  width: 100%;
  min-height: 100vh;
  display: ${props => !props.show && 'none'};
  .box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .1);
  }
`

const AbsoluteContainer = styled.div`
  background: rgba(0,0,0,0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  color: white;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Modal extends React.Component {
  render () {
    return (
      <ModalContainer
        show={this.props.show}
      >
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8'>
              <div className='position-relative my-4 p-3 bg-light box-shadow rounded'>
                <h2 className='text-center'>ยืนยัน</h2>
                <hr />
                {this.props.children}
                <hr />
                <div className='row'>
                  <div className='col-6'>
                    <button
                      onClick={() => this.props.setField('showModal', false)}
                      className='btn btn-secondary btn-block'
                    >
                      ยกเลิก
                    </button>
                  </div>
                  <div className='col-6'>
                    <button
                      onClick={() => this.props.setField('showModal', false)}
                      className='btn btn-success btn-block'
                    >ยืนยัน</button>
                  </div>
                </div>
                <AbsoluteContainer className='rounded'>
                  loading
                </AbsoluteContainer>
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    )
  }
}

export default Modal
