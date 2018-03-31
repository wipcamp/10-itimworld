import React from 'react'
import styled from 'styled-components'
import Upload from './Upload'
import { RadioContainer, CheckRadio, Label, StyledSelect, StyledTextArea } from '../Core/Input'
import Modal from './Modal'

const BackgroundContainer = styled.div`
  background-image: url('/static/img/background.png');
  background-size: cover;
  min-height: 100vh;

  .box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .1);
  }

  button {
    cursor: pointer;
  }
`

const CircleStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background: ${props => props.status ? '#78E6D0' : 'lightgray'};


`

const shirtSize = [
  {v: 's', t: '32'},
  {v: 'm', t: '36'},
  {v: 'f', t: '40'},
  {v: 'l', t: '44'},
  {v: 'xl', t: '48'},
  {v: '2xl', t: '52'}
]

const Status = styled.div`
  /* background: pink; */
  color: ${props => props.status && '#000'};
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  background: ${props => props.status ? '#78E6D0' : '#DF6760'};
  margin: 2px;
  transition: all .3s;
`

const Instruction = (props) => (
  <div className='mb-2 text-white bg-secondary p-2 ' style={{minHeight: '130px'}}>
    ต้องทำอะไรบ้าง<br />
    <Status status={props.comeByYouself !== ''}>มาเองหรือป่าว</Status><br />
    {
      props.comeByYouself === 'n' && (
        <div>
          <Status status={props.place !== ''}>กรอกสถานที่</Status>
        </div>
      )
    }
    <Status status={props.shirtSize !== ''}>กรอกไซส์เสื้อ</Status><br />
    <Status status={props.file !== null}>อัพโหลดสลิป</Status>
  </div>
)

class MainConfirm extends React.Component {
  state = {
    comeByYouself: '',
    place: '',
    shirtSize: '',
    file: null,
    showModal: false,
    err: false
  }

  _setField = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  _setFile = (files) => {
    this.setState({
      file: files[0],
      err: false
    })
  }

  _onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.file) {
      this.setState({
        err: true
      })
    } else {
      this.setState({
        showModal: true
      })
    }
  }

  render () {
    return (
      <BackgroundContainer>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8'>
              <div className='box-shadow my-4 p-3 bg-light rounded'>
                <h1 className='text-center'>ยืนยันสิทธิ</h1>
                <div className='row'>
                  <div className='col-12'>
                    <Instruction {...this.props} {...this.state} />
                  </div>
                </div>
                <form
                  onSubmit={this._onSubmit}
                >
                  <div className='row'>
                    <div className='col-12 col-md-6'>
                      <Label>ให้ไปรับไหม</Label>
                      <RadioContainer
                        className='form-check col-12 form-group'
                      >
                        <input
                          name={`comeByYouself`}
                          value='y'
                          type='radio'
                          id={`come-y-option`}
                          onChange={(e) => this._setField('comeByYouself', e.target.value)}
                          checked={this.state.comeByYouself === 'y'}
                          required
                        />
                        <CheckRadio />
                        <Label htmlFor={`come-y-option`}>มาเอง</Label>
                      </RadioContainer>
                      <RadioContainer
                        className='form-check col-12 form-group'
                      >
                        <input
                          name={`comeByYouself`}
                          value='n'
                          type='radio'
                          id={`come-n-option`}
                          onChange={(e) => this._setField('comeByYouself', e.target.value)}
                          checked={this.state.comeByYouself === 'n'}
                        />
                        <CheckRadio />
                        <Label htmlFor={`come-n-option`}>มารับหน่อย</Label>
                      </RadioContainer>
                      <div className='form-group col-11' style={{ minHeight: '38px' }}>
                        {
                          this.state.comeByYouself === 'n' && (
                            <StyledSelect
                              className={`form-control p-1 ml-4`}
                              required
                              onChange={(e) => this._setField('place', e.target.value)}
                            >
                              <option value='' >{`โปรดเลือกสถานที่ ที่จะให้ไปรับ`}</option>
                              <option value={'อนุสาวรีย์'}>อนุสาวรีย์</option>
                              <option value={'หัวลำโพง'}>หัวลำโพง</option>
                              <option value={'หมอชิต'}>หมอชิต</option>
                            </StyledSelect>
                          )
                        }
                      </div>
                      <Label>เลือกไซส์เสื้อ</Label>
                      <div className='row'>
                        <div className='col-12 form-group'>
                          <StyledSelect
                            className={`form-control p-1`}
                            required
                            onChange={(e) => this._setField('shirtSize', e.target.value)}
                          >
                            <option value='' >{`โปรดเลือกไซส์เสื้อ`}</option>
                            <option value={'s'}>S (รอบเอว 32) (รอบอก xx)</option>
                            <option value={'m'}>M</option>
                            <option value={'l'}>L</option>
                          </StyledSelect>

                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-md-6'>
                      <Upload
                        err={this.state.err}
                        file={this.state.file}
                        onDrop={this._setFile}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <button type='button' className='btn btn-lg btn-block btn-secondar'>สละสิทธิ</button>
                    </div>
                    <div className='col-6'>
                      <button type='submit' className='btn btn-lg btn-block btn-success'>บันทึก</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.showModal}
          setField={this._setField}
        >
          ทดสอบ
        </Modal>
      </BackgroundContainer>
    )
  }
}

export default MainConfirm
